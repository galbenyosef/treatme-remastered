import express from 'express';
import passport from 'passport'
import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import path from 'path'
import { UserModel } from "../users/user_model";
import { TranslationModel } from '../translations/translations_model';
import { SpecialityModel } from '../specialities/speciality_model';
import { HMOModel } from '../hmos/hmos_model';
import { DegreeModel } from '../degrees/degrees_model';
import { TitleModel } from '../titles/titles_model';
import url from 'url'
import { LanguageModel } from '../languages/languages_model';
import  mongoose from 'mongoose'
import { LocalesModel } from '../locales/locales_model';
import { config } from '../../config';
import { tokenForUser } from '../login/login_service';
import { decode } from 'jwt-simple';

const router = express.Router();


const getMultiLocaledValue = (array,localeId) => {

  let retval = []

  if (array && array.length){
    let filtered = array.filter(val => 
      val.localeId ==(localeId)
    )
    if (filtered && filtered.length && filtered[0].value && filtered[0].value.length){
      retval = filtered[0].value.map(val => {
        const locale = val.locales && val.locales.length && val.locales.find(_locale => _locale.localeId ==(localeId))
        return {
          id: val._id,
          value: locale && locale.value || '',
          new: val.new
        }
      })
    }
  }
  return retval
}

const userToClient = (user,localeId) => {

  const firstname = user.firstname && user.firstname.length && user.firstname.find(locale => locale.localeId ==(localeId))
  const lastname = user.lastname && user.lastname.length && user.lastname.find(locale => locale.localeId ==(localeId))
  const description = user.description && user.description.length && user.description.find(locale => locale.localeId ==(localeId))
  const about = user.about && user.about.length && user.about.find(locale => locale.localeId ==(localeId))
  const locations = user.locations && user.locations.length && user.locations.find(locale => locale.localeId ==(localeId))
  const _certifications = user.certifications && user.certifications.length && user.certifications.find(locale => locale.localeId ==(localeId))
  const certifications = _certifications && _certifications.value && _certifications.value.map(cer => {
    const degreeVal = cer.degree.locales && cer.degree.locales.length && cer.degree.locales.find(locale => locale.localeId ==(localeId))
    return {
      id:cer._id,
      institute: cer.institute,
      degreeName: cer.degreeName,
      end: cer.end,
      comment: cer.comment,
      degree:{id:cer.degree._id ,value:degreeVal.value || ''}}
  })
  const title = getMultiLocaledValue(user.title,localeId)
  const mainSpeciality = getMultiLocaledValue(user.mainSpeciality,localeId)
  const specialities = getMultiLocaledValue(user.specialities,localeId)
  const hmos = getMultiLocaledValue(user.hmos,localeId)
  const vcard = user.vcard && user.vcard.length && user.vcard.find(locale => locale.localeId ==(localeId))
  const languages = (user.languages && user.languages.length && user.languages
    .map(language => 
      {
        return{
          id:language.language.id,
          value:language.language.name,
          level:language.level
        } 
      }
    ))

  return {
    ...user.toObject(),
    firstname: firstname && firstname.value || '',
    lastname: lastname && lastname.value || '',
    description: description && description.value || '',
    locations: locations && locations.value || [],
    about: about && about.value || '',
    title: title.length && title[0] || {},
    mainSpeciality: mainSpeciality.length && mainSpeciality[0] || {},
    specialities,
    hmos,
    vcard:vcard && vcard.value && vcard.value[0] || {},
    certifications: certifications || [],
    languages: languages || [],
  }
}

const getUserByUsername = async (username,localeId) => {

  const user = (
    await
    UserModel.
    findOne({username}).
    select('-inactive -deleted -forgotpassMailSent -password').
    populate({ path: 'title.value',  select: ['locales']}).
    populate({ path: 'mainSpeciality.value', select: ['locales'] }).
    populate({ path: 'specialities.value' , select: ['locales','parent_id','new'] }).
    populate({ path: 'hmos.value' , select: ['locales'] }).
    populate('languages.language').
    populate('certifications.value.degree')
  )
  return userToClient(user,localeId)

}

const getUserById = async (userId,localeId) => {

  const user = (
    await
    UserModel.
    findById(userId).
    select('-inactive -deleted -forgotpassMailSent -password').
    populate({ path: 'title.value',  select: ['locales']}).
    populate({ path: 'mainSpeciality.value', select: ['locales'] }).
    populate({ path: 'specialities.value' , select: ['locales','parent_id','new'] }).
    populate({ path: 'hmos.value' , select: ['locales'] }).
    populate('languages.language').
    populate({ path:'certifications.value.degree' , select: ['locales']})
  )
  return userToClient(user,localeId)

}


const getMainSpecialities = async (localeId,userId) => {

  const mainSpecialities = (
    await
    SpecialityModel.
    find( { $or:[{parent_id:null,new:false},{parent_id:null,by:userId}] } )
  )

  let retval = mainSpecialities && mainSpecialities.length && mainSpecialities.map(spec => {
    const specValue = spec.locales && spec.locales.length && spec.locales.find(locale => locale.localeId == (localeId))
    return {id: spec._id, value: specValue && specValue.value || ''}
  }).filter(spec => spec.value) || []


  return retval

}

const getTitles = async (localeId,userId) => {

  const titles = (
    await
    TitleModel.
    find( {$or:[{new:false},{by:userId}]} )
  )

  let retval = titles && titles.length && titles.map(title => {
    const titleValue = title.locales && title.locales.length && title.locales.find(locale => locale.localeId ==(localeId))
    return {id: title._id, value: titleValue && titleValue.value || ''}
  }).filter(title => title.value) || []

  return retval

}

const getHMOs = async (localeId,userId) => {

  const hmos = (
    await
    HMOModel.
    find( {$or:[{new:false},{by:userId}]} )
  )

  let retval = hmos && hmos.length && hmos.map(hmo => {
    const hmoValue = hmo.locales && hmo.locales.length && hmo.locales.find(locale => locale.localeId ==(localeId))
    return {id: hmo._id, value: hmoValue && hmoValue.value || ''}
  }).filter(hmo => hmo.value) || []

  return retval

}

const getDegrees = async (localeId,userId) => {

  const degrees = (
    await
    DegreeModel.
    find( {$or:[{new:false},{by:userId}]} )
  )

  let retval = degrees && degrees.length && degrees.map(degree => {
    const degreeValue = degree.locales && degree.locales.length && degree.locales.find(locale => locale.localeId ==(localeId))
    return {id: degree._id, value: degreeValue && degreeValue.value || ''}
  }).filter(deg => deg.value) || []

  return retval

}

const getLanguages = async () => {

  const languages = (
    await
    LanguageModel.
    find({})
  )

  let retval = languages && languages.length && languages.map(lang => {
    return {id: lang._id, value: lang.name || ''}
  })

  return retval

}

const getLoginPageData = async (localeId) => {

 

}

const getRegistrationPageData = async (localeId) => {

  const mainSpecialities = await getMainSpecialities(localeId,null)

  return {mainSpecialities}

}

const getViewPageData = async (localeId,username) => {

  const user = await getUserByUsername(username,localeId)
  const specialities = await getSpecialitiesByParent(user.mainSpeciality.id,localeId,user._id)
  return {user,specialities}

}


const unflattenList = arr => {
  var tree = [],
      mappedArr = {},
      arrElem,
      mappedElem;

  // First map the nodes of the array to an object -> create a hash table.
  for(var i = 0, len = arr.length; i < len; i++) {
    arrElem = arr[i];
    mappedArr[arrElem.id] = arrElem;
    mappedArr[arrElem.id].children = [];
  }


  for (var id in mappedArr) {
    if (mappedArr.hasOwnProperty(id)) {
      mappedElem = mappedArr[id];
      // If the element is not at the root level, add it to its parent array of children.
      if (mappedElem.parent_id) {
        mappedArr[mappedElem['parent_id']] && mappedArr[mappedElem['parent_id']].children.push(mappedElem);
      }
      // If the element is at the root level, add it to first level elements array.
      else {
        tree.push(mappedElem);
      }
    }
  }
  return tree;
}

const getSpecialitiesTreeByParent = async (parent_id, localeId ,userId) => {

  let list = await SpecialityModel.find( {$or:[{new:false},{by:userId}]} )
  let unflattened = unflattenList(list.map( spec => { 
      const specValue = spec.locales.length && spec.locales.find(loc => loc.localeId ==(localeId))
      return {
        id:spec._id,
        new:spec.new,
        parent_id:spec.parent_id,
        text:specValue && specValue.value || '',
      }
  }))
  
  let parent = unflattened.find(obj => obj.id.equals(parent_id))

  /*  function getLeafNodes(obj){
    if(obj.children.length){
        obj.children.forEach(function(child){getLeafNodes(child)});
    } else{
        obj.isLeaf = true
        delete obj.children
    }
  }

  getLeafNodes(parent) */
  
  return [parent] || []
}

const getSpecialitiesByParent = async (parent_id, localeId ,userId) => {

  let list = await SpecialityModel.find( {$or:[{new:false},{by:userId}]} )
  let flattened = list.map( spec => { 
      const specValue = spec.locales.length && spec.locales.find(loc => loc.localeId ==(localeId))
      return {
        id:spec._id,
        parent_id:spec.parent_id,
        value:specValue && specValue.value || '',
        new:spec.new
      }
  })
  return flattened || []
}

const getEditPageData = async (localeId,userId) => {

  const user = await getUserById(userId,localeId)
  const mainSpecialityId = user.mainSpeciality && user.mainSpeciality.id
  const specialities = mainSpecialityId ? await getSpecialitiesByParent(mainSpecialityId,localeId,userId) : []
  const specialitiesTree = mainSpecialityId ? await getSpecialitiesTreeByParent(mainSpecialityId,localeId,userId) : []
  const mainSpecialities = await getMainSpecialities(localeId,userId)
  const titles = await getTitles(localeId,userId)
  const languages = await getLanguages()
  const hmos = await getHMOs(localeId,userId)
  const degrees = await getDegrees(localeId,userId)
  return {user,mainSpecialities,specialities,titles,languages,hmos,degrees,specialitiesTree}

}

const getPage = async (req, res, next) => {

  const promise = new Promise(async (resolve,reject) => {
    const {localeId,username} = req.query
    const {user} = req
    const page = url.parse(req.url).pathname
    let data = null
  
    try {
      switch(page){
  
        case '/login':{
          data = await getLoginPageData(localeId)
          break;
        }
        case '/register':{
          data = await getRegistrationPageData(localeId)
          break;
        }
        case '/view':{
          if (username){
            data = await getViewPageData(localeId,username)
            break;
          }
        }
        case '/edit':{
          if (user.id){
            data = await getEditPageData(localeId,user.id)
            break;
          }
        }
        default:{
          break;
        }
      }
      if (!data){
        reject('No data found')
      }
      resolve(data)
    }
    catch(err){
      console.log(err)
      reject(err)
    }
  })

  promise.then( data => res.status(200).send(data)).catch( err => {
    console.log(err)
    res.status(403).send(err)
  })
  
}

const update = async (req, res, next) => {

  const promise = new Promise(async (resolve,reject) => {
    if (Object.keys(req.body) === 1){
      await UserModel.findByIdAndUpdate(req.user.id,req.body)
      resolve()
    }


    else {
      const {localeId} = req.query

      let user = null
      if (!localeId){
        reject(`Unabled to recognize request locale`)
      }

      if (req.user && req.user.id)
        user = await UserModel.findById(req.user.id).
        select('-inactive -deleted -forgotpassMailSent -password').
        populate({ path: 'title.value',  select: ['locales']}).
        populate({ path: 'mainSpeciality.value', select: ['locales'] }).
        populate({ path: 'specialities.value' , select: ['locales','parent_id'] }).
        populate({ path: 'hmos.value' , select: ['locales'] }).
        populate('languages.language').
        populate('locations.localeId').
        populate('certifications.localeId')

      if (user){
        const data = req.body
        user.searchable = data.searchable
        user.active = data.active
        //unauthorized user update fields
        //user.inactive
        //user.deleted
        //user.verified
        //user.valid
        //user.forgotpassMailSent
        //user._id
        //user.username
        //user.email
        //user.password
        user.authorized = data.authorized
        user.gender = data.gender
        user.mobile = data.mobile
        user.vcard = Object.assign({},user.vcard,data.vcard)
        
        user.buttons = null
        user.buttons = JSON.parse(JSON.stringify(data.buttons))

        let firstnameLocaleExists = user.firstname.findIndex(loc => loc.localeId ==(localeId))
        if (firstnameLocaleExists > -1){
          if (data.firstname){
            user.firstname[firstnameLocaleExists].value = data.firstname
            user.firstname[firstnameLocaleExists].localeId = localeId
          }
          else{
            user.firstname.splice(firstnameLocaleExists,1)
          }
        }
        else{
          if (data.firstname){
            user.firstname.push({localeId,value:data.firstname})
          }
        }

        let lastnameLocaleExists = user.lastname.findIndex(loc => loc.localeId ==(localeId))
        if (lastnameLocaleExists > -1){
          if (data.lastname){
            user.lastname[lastnameLocaleExists].value = data.lastname
            user.lastname[lastnameLocaleExists].localeId = localeId
          }
          else{
            user.lastname.splice(lastnameLocaleExists,1)
          }
        }
        else{
          if (data.lastname){
            user.lastname.push({localeId,value:data.lastname})
          }
        }

        let descriptionLocaleExists = user.description.findIndex(loc => loc.localeId ==(localeId))
        if (descriptionLocaleExists > -1){
          if (data.description){
            user.description[descriptionLocaleExists].value = data.description
            user.description[descriptionLocaleExists].localeId = localeId
          }
          else{
            user.description.splice(descriptionLocaleExists,1)
          }
        }
        else{
          if (data.description){
            user.description.push({localeId,value:data.description})
          }
        }

        let aboutLocaleExists = user.about.findIndex(loc => loc.localeId ==(localeId))
        if (aboutLocaleExists > -1){
          if (data.about){
            user.about[aboutLocaleExists].value = data.about
            user.about[aboutLocaleExists].localeId = localeId
          }
          else{
            user.about.splice(aboutLocaleExists,1)
          }
        }
        else{
          if (data.about){
            user.about.push({localeId,value:data.about})
          }
        }

        if (data.mainSpeciality.id && !mongoose.Types.ObjectId.isValid(data.mainSpeciality.id)){
          const newSpecialityObject = {
            locales: [{localeId,value:data.mainSpeciality.value}],
            by: req.user.id,
            new:true
          }
          const newSpeciality = await new SpecialityModel(newSpecialityObject).save()
          let mainSpeciality = user.mainSpeciality.filter(loc => !loc.localeId ==(localeId))
          mainSpeciality.push({localeId,value:[newSpeciality._id]})
          user.mainSpeciality = mainSpeciality
        }
        else if (data.mainSpeciality.id && mongoose.Types.ObjectId.isValid(data.mainSpeciality.id)){
          let mainSpeciality = user.mainSpeciality.filter(loc => !loc.localeId ==(localeId))
          mainSpeciality.push({localeId,value:[data.mainSpeciality.id]})
          user.mainSpeciality = mainSpeciality
        }
        else {
          user.mainSpeciality = user.mainSpeciality.filter(loc => !loc.localeId ==(localeId))
        }

        if (data.title.id && !mongoose.Types.ObjectId.isValid(data.title.id)){
          const newTitleObject = {
            locales: [{localeId,value:data.title.value}],
            by: req.user.id,
            new:true,
          }
          const newTitle = await new TitleModel(newTitleObject).save()
          let title = user.title.filter(loc => !loc.localeId ==(localeId))
          title.push({localeId,value:[newTitle._id]})
          user.title = title
        }
        else if (data.title.id && mongoose.Types.ObjectId.isValid(data.title.id)){
          let title = user.title.filter(loc => !loc.localeId ==(localeId))
          title.push({localeId,value:[data.title.id]})
          user.title = title
        }
        else {
          user.title = user.title.filter(loc => !loc.localeId ==(localeId))
        }

        if (data.vcard){
          let vcard = user.vcard.filter(loc => loc.localeId && !loc.localeId ==(localeId))
          vcard.push({localeId,value:data.vcard})
          user.vcard = vcard
        }
        else {
          user.vcard = user.vcard.filter(loc => !loc.localeId ==(localeId))
        }

        
        if (data.specialities.length){

          let specialities = []
          for (let i = 0; i <data.specialities.length ; i++){
            if (data.specialities[i].new){
              const exists = await SpecialityModel.findById(data.specialities[i].id)
              if (exists){
                let localeIndex = exists.locales.findIndex(locale => locale.localeId ==(localeId))
                if (localeIndex > -1){
                  exists.locales[localeIndex].value = data.specialities[i].value
                  await exists.save()
                  specialities.push(exists)
                }
              }
              else{
                const newSpecialityObject = {
                  _id: data.specialities[i].id,
                  locales: [{localeId,value:data.specialities[i].value}],
                  parent_id:data.specialities[i].parent_id,
                  by: req.user.id,
                  new:true
                }
                const newSpeciality = await new SpecialityModel(newSpecialityObject).save()
                specialities.push(newSpeciality._id)
             }
            }
            else if (data.specialities[i].id && mongoose.Types.ObjectId.isValid(data.specialities[i].id)){
              specialities.push(data.specialities[i].id)
            }
          }
          let _specialities = user.specialities.filter(loc => !loc.localeId ==(localeId))
          _specialities.push({localeId,value:specialities})
          user.specialities = _specialities
        }
        else {
          user.specialities = user.specialities.filter(loc => !loc.localeId ==(localeId))
        }

        if (data.locations.length){
          let locationsVal = []
          for (let i = 0; i <data.locations.length ; i++){
            locationsVal.push(data.locations[i])
          }

          const localeExists = user.locations.findIndex(loc => loc.localeId ==(localeId))

          if (localeExists > -1) {
            user.locations[localeExists].value = locationsVal
          }
          else {
            user.locations.push({localeId,value:locationsVal})
          }
        }
        else {
          const localeExists = user.locations.findIndex(loc => loc.localeId ==(localeId))
          if (localeExists > -1) {
            delete user.locations[localeExists]
          }
        }

        if (data.certifications.length){
          let certificationsVal = []
          for (let i = 0; i <data.certifications.length ; i++){
            if (data.certifications[i].degree && data.certifications[i].degree.id && !mongoose.Types.ObjectId.isValid(data.certifications[i].degree.id)){
              const newDegreeObject = {
                locales: [{localeId,value:data.certifications[i].degree.value}],
                by: req.user.id,
                new:true,
              }
              const newDegree = await new DegreeModel(newDegreeObject).save()
              let newCertification = {...data.certifications[i],degree:newDegree._id}
              certificationsVal.push(newCertification)
            }
            else if (data.certifications[i].degree && data.certifications[i].degree.id && mongoose.Types.ObjectId.isValid(data.certifications[i].degree.id)){
              let newCertification = {...data.certifications[i],degree:data.certifications[i].degree.id}
              certificationsVal.push(newCertification)
            }
          }

          const localeExists = user.certifications.findIndex(cer => cer.localeId ==(localeId))

          if (localeExists > -1) {
            user.certifications[localeExists].value = certificationsVal
          }
          else {
            user.certifications.push({localeId,value:certificationsVal})
          }
        }
        else {
          const localeExists = user.certifications.findIndex(cer => cer.localeId ==(localeId))
          if (localeExists > -1) {
            delete user.certifications[localeExists]
          }
        }

        if (data.languages.length){
          const languages = data.languages.map(obj => {
            return {
              language:obj.id,
              level:obj.level,
            }
          })
          user.languages = languages
        }
        else{
          user.languages = []
        }

        if (data.hmos.length){
          let hmos = []

          for (let i = 0; i <data.hmos.length ; i++){
            if (data.hmos[i].id && !mongoose.Types.ObjectId.isValid(data.hmos[i].id)){
              const newHMOObject = {
                locales: [{localeId,value:data.hmos[i].value}],
                by: req.user.id,
                new:true
              }
              const newHMO = await new HMOModel(newHMOObject).save()
              hmos.push(newHMO._id)
            }
            else if (data.hmos[i].id && mongoose.Types.ObjectId.isValid(data.hmos[i].id)){
              hmos.push(data.hmos[i].id)
            }
          }

          let _hmos = user.hmos.filter(loc => !loc.localeId ==(localeId))
          _hmos.push({localeId,value:hmos})
          user.hmos = _hmos
        }
        else {
          user.hmos = user.hmos.filter(loc => !loc.localeId ==(localeId))
        }

        if (data.images){

          let images = new Array(data.images.length)
          for (let i=0; i< data.images.length;i++){
            if (!isNaN(data.images[i])){
              images[i] = user.images[data.images[i]]
            }
            else{
              images[i] = data.images[i]
            }
          }
          user.images = images
        }
        else {
          user.images = []
        }

        await user.save() ? resolve() : reject()
      }
    }
  })


  promise.then( data => res.status(200).send(data)).catch( err => {
    console.log(err)
    res.status(403).send(err)
  })

}


const getSpecialities = async (req,res,next) => {

  const promise = new Promise(async (resolve,reject) => {
    const mainSpecialityId = req.query.parentId
    const localeId = req.query.localeId
    if (mainSpecialityId){
      const specialitiesTree = mainSpecialityId ? await getSpecialitiesTreeByParent(mainSpecialityId,localeId,req.user.id) : []
      const specialities = mainSpecialityId ? await getSpecialitiesByParent(mainSpecialityId,localeId,req.user.id) : []
      resolve({specialities,specialitiesTree})
    }
    else {
      resolve([])
    }
  })

  promise.then( data => res.status(200).send(data)).catch( err => {
    res.status(403).send(err)})

}

const getLocales = async (req,res,next) => {

  const promise = new Promise(async (resolve,reject) => {

    try{
      const locales = await LocalesModel.find({})
      resolve(locales)
    }
    catch(err){
      reject(err)
    }
  })

  promise.then( data => res.status(200).send(data)).catch( err => res.status(403).send(err))

}

const getTranslations = async (req,res,next) => {

  const {localeId} = req.query

  const promise = new Promise(async (resolve,reject) => {

    try{
      const translations = await TranslationModel.find({})
      let strings = translations.map(string => {
        let stringValue = string.locales && string.locales.find(_locale => _locale.localeId ==(localeId))
        return {
          source:string.source,
          value:stringValue && stringValue.value || ''
        }
      })
      resolve(strings)
    }
    catch(err){
      reject(err)
    }
  })

  promise.then( data => res.status(200).send(data)).catch( err => res.status(403).send(err))

}

const incForgotPassMail = async (user) => {
  user.forgotpassMailSent = user.forgotpassMailSent+1

  if (await user.save()){
    return true
  }

  return false
}

const smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  port: 465,
  secure: true,
  auth: {
    user: 'treatme.mailer@gmail.com',
    pass: 'treatme123'
  }
})


let handlebarsOptions = {
  viewEngine: {
    extName: '.hbs',
    partialsDir: path.resolve('./src/api/mailViews'),
  },
  viewPath: path.resolve('./src/api/mailViews'),
  extName: '.hbs'
}

smtpTransport.use('compile', hbs(handlebarsOptions))


const sendForgotPassMail = async (user) => {

  let mailData = {
    to: user.email,
    from: 'Treatme Administration',
    template: 'forgot-password',
    subject: `Password recovery for ${user.username}`,
    context: {
        resetPasswordLink: `${config.client}/login?username=${user.username}&&token=${tokenForUser(user._id)}`,
    }
  }

  if (await smtpTransport.sendMail(mailData)){
    return true
  }

  return false
}


const forgotPassword = async (req,res,next) => {

  const username = req.query.username

  const promise = new Promise( async (resolve,reject) => {
    const isMail = (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(username)
    
    let user = null

    if (isMail){
      user = await UserModel.findOne({ email: username })
    }
    else {
      user = await UserModel.findOne({ username })
    }

    if (user && user.forgotpassMailSent < 999){
      try {
        const mailSent = await sendForgotPassMail(user)
        if (mailSent){
          if (await incForgotPassMail(user)){
            resolve()
          }
        }
      }
      catch(err){
        console.log(err)
        reject(err)
      }
    }
    else {
      reject('Maximum Requests Reached.')
    }
  })

  promise.then( () => res.status(200).send()).catch( err => res.status(403).send(err))

}

const verify = async (req,res,next) => {

  const {token} = req.query

  const promise =  new Promise( async (resolve,reject) => {
    if (token){
      const userId = decode(token,config.secret)._id
      const user = await UserModel.findById(userId)

      if (user && !user.verified){
        user.verified = true
        await user.save()
        resolve()
      }
      reject('Already verified')
    }
    reject('Invalid token')
  })
  
  promise.then( () => res.status(200).send()).catch( err => {
    console.log(err)
    res.status(403).send(err)})
}



const contact = async (req,res,next) => {

  const {email,username} = req.user
  const {message} = req.body

  const promise =  new Promise( async (resolve,reject) => {
    
    let data = {
      to: 'treatme.mailer@gmail.com',
      from: 'treatme.mailer@gmail.com',
      template: `contactus`,
      subject: `${username} has opened support ticket`,
      context: {
          message
      }
    }

    smtpTransport.sendMail(data)
    .then( resolve() )
    .catch(err => reject(err))    

  })

  promise.then( () => res.status(200).send()).catch( err => {
    console.log(err)
    res.status(403).send(err)})
}

  

router.get('/login',getPage)
router.post('/forgotPassword',forgotPassword)
router.get('/register',getPage)
router.post('/verify',verify)
router.post('/contact',passport.authenticate('jwt',{session: false}),contact)
router.get('/view',getPage)
router.get('/edit',passport.authenticate('jwt',{session: false}),getPage)
router.put('/update',passport.authenticate('jwt',{session: false}),update)
router.get('/specialities',passport.authenticate('jwt',{session: false}),getSpecialities)
router.get('/locales',getLocales)
router.get('/translations',getTranslations)


export { router as dataRouter, smtpTransport }


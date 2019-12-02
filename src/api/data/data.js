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

/* const userToClient = (user,localeId) => {

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
} */

const getUserByUsername = async (username) => {

  const user = await UserModel.
    findOne({username}).
    select('-inactive -deleted -forgotpassMailSent -password')
  
  return user
}

const getUserById = async (userId) => {

  const user = await UserModel.aggregate([
    {
      $match:{
        _id:mongoose.Types.ObjectId(userId)
      }
    },
    {
      $lookup:{
        from: 'specialities',
        localField:'mainSpeciality',
        foreignField: '_id',
        as: 'mainSpeciality'
      }
    },
    {
      $unwind: '$mainSpeciality'
    },
    {
      $project:{
        inactive:false,
        deleted:false,
        forgotpassMailSent:false,
        password:false
      }
    },
    {
      $addFields: {
        'mainSpeciality.label': `$mainSpeciality.name`,
        'mainSpeciality.value': `$mainSpeciality._id`,
      }
    }
  ])
  return user.length && user[0] || []
}


const getMainSpecialities = async (userId) => {

  const mainSpecialities = await SpecialityModel.aggregate([
    {
      $match:{
        parent_id:null,
        createdBy:{$in:[userId,null]}
      }
    },
    {
      $addFields: {
        'label': `$name`,
        'value': `$_id`,
      }
    }
  ])
  console.log(mainSpecialities)
  return mainSpecialities

}

const getTitles = async (userId) => {

  const titles = await TitleModel.aggregate([
    {
      $match:{
        parent_id:null,
        createdBy:{$in:[userId,null]}
      }
    },
    {
      $addFields: {
        'label': `$name`,
        'value': `$_id`,
      }
    }
  ])

  return titles

}

const getHMOs = async (userId) => {

  const hmos = await HMOModel.find({createdBy:{$in:[null,userId]}})

  return hmos

}

const getDegrees = async (userId) => {

  const degrees = await DegreeModel.find({createdBy:{$in:[null,userId]}})

  return degrees

}

const getLanguages = async () => {

  const languages = await LanguageModel.find({})

  return languages

}

const getLoginPageData = async () => {

 

}

const getRegistrationPageData = async () => {

  const mainSpecialities = await getMainSpecialities()

  return {mainSpecialities}

}

const getViewPageData = async (username) => {

  const user = await getUserByUsername(username)
  const specialities = await getSpecialitiesByParent(user.mainSpeciality.id,user._id)
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

const getSpecialitiesTreeByParent = async (parent_id, userId) => {

  let list = await SpecialityModel.find({createdBy:{$in:[null,userId]}})

  let unflattened = unflattenList(list.map( spec => { 
      return {
        id:spec._id,
        new:spec.new,
        parent_id:spec.parent_id,
        text:spec.text,
      }
  }))
  
  let parent = unflattened.find(obj => obj.id.equals(parent_id))
  
  return [parent]
}

const getSpecialitiesByParent = async (parent_id, userId) => {

  let list = await SpecialityModel.find({createdBy:{$in:[null,userId]}})
  let flattened = list.map( spec => { 
    return {
        id:spec._id,
        parent_id:spec.parent_id,
        value:spec.text,
        new:spec.new
      }
  })
  return flattened
}

const getEditPageData = async (userId) => {

  const user = await getUserById(userId)
  const mainSpecialityId = user.mainSpeciality
  const specialities = mainSpecialityId ? await getSpecialitiesByParent(mainSpecialityId,userId) : []
  const specialitiesTree = mainSpecialityId ? await getSpecialitiesTreeByParent(mainSpecialityId,userId) : []
  const mainSpecialities = await getMainSpecialities(userId)
  const titles = await getTitles(userId)
  const languages = await getLanguages()
  const hmos = await getHMOs(userId)
  const degrees = await getDegrees(userId)
  return {user,mainSpecialities,specialities,titles,languages,hmos,degrees,specialitiesTree}

}

const getPage = async (req, res, next) => {

  const promise = new Promise(async (resolve,reject) => {
    const {username} = req.query
    const {user} = req
    const page = url.parse(req.url).pathname
    let data = null
  
    try {
      switch(page){
  
        case '/login':{
          data = await getLoginPageData()
          break;
        }
        case '/register':{
          data = await getRegistrationPageData()
          break;
        }
        case '/view':{
          if (username){
            data = await getViewPageData(username)
            break;
          }
        }
        case '/edit':{
          if (user.id){
            console.log(user.id)
            data = await getEditPageData(user.id)
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

      let user = null

      if (req.user && req.user.id)
        user = await UserModel.findById(req.user.id).
        select('-inactive -deleted -forgotpassMailSent -password')
      console.log(user)
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

        user.firstname = data.firstname

        user.lastname = data.lastname

        user.description = data.description

        user.about = data.about

        if (!data.mainSpeciality._id){
          const newSpecialityObject = {
            name: data.mainSpeciality.name,
            createdBy: req.user.id,
          }
          const newSpeciality = await SpecialityModel.create(newSpecialityObject)
          user.mainSpeciality = newSpeciality._id
        }
        else if (data.mainSpeciality.id){
          user.mainSpeciality = mainSpeciality._id
        }

        if (!data.title._id){
          const newTitleObject = {
            name: data.mainSpeciality.name,
            createdBy: req.user.id,
          }
          const newTitle = await TitleModel.create(newTitleObject)
          user.title = newTitle._id
        }
        else if (data.title._id){
          user.title = data.title._id
        }
/* 
        if (data.vcard){
          let vcard = user.vcard.filter(loc => loc.localeId && !loc.localeId ==(localeId))
          vcard.push({localeId,value:data.vcard})
          user.vcard = vcard
        }
        else {
          user.vcard = user.vcard.filter(loc => !loc.localeId ==(localeId))
        } */

        let specialities = []

        for (let i = 0; i <data.specialities.length ; i++){
          if (data.specialities[i]._id)
            specialities.push(data.specialities[i].id)
          else {
            const newSpecialityObject = {
              name: data.specialities[i].name,
              parent_id:data.specialities[i].parent_id,
              createdBy: req.user.id,
            }
            const newSpeciality = await SpecialityModel.create(newSpecialityObject)
            specialities.push(newSpeciality._id)
          }
        }

/*         user.specialities = _specialities
 */
        user.locations = data.locations

        user.certifications = data.certifications

/*         user.languages = languages
 */

        let hmos = []

        for (let i = 0; i <data.hmos.length ; i++){
          if (data.hmos[i]._id){
            hmos.push(data.hmos[i]._id)
          }
          else {
            const newHMOObject = {
              name: data.hmois[i].name,
              by: req.user.id,
            }
            const newHMO = await HMOModel.create(newHMOObject)
            hmos.push(newHMO._id)
          }
        }
        user.hmos = hmos

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
    if (mainSpecialityId){
      const specialitiesTree = mainSpecialityId ? await getSpecialitiesTreeByParent(mainSpecialityId,req.user.id) : []
      const specialities = mainSpecialityId ? await getSpecialitiesByParent(mainSpecialityId,req.user.id) : []
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

  const promise = new Promise(async (resolve,reject) => {

    try{
      const translations = await TranslationModel.find({})

      resolve(translations)
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


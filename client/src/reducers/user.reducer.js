import vCard from 'vcards-js'
import { emptyLocation } from '../components/Locations/EmptyLocation';
import { emptyDayHours } from '../components/Locations/EmptyDayHours';
import { emptyCertification } from '../components/Certifications/EmptyCertification';
import { LocaledObject } from '../components/Utilities/localedObject';


const SocialButton = () => {return {data: [], checked:false}}

const socialButtons = {

    call: SocialButton(),
    facebook: SocialButton(),
    gmail: SocialButton(),
    googleplus: SocialButton(),
    instagram: SocialButton(),
    linkedin: SocialButton(),
    messenger: SocialButton(),
    pinterest: SocialButton(),
    sms: SocialButton(),
    snapchat: SocialButton(),
    skype: SocialButton(),
    telegram: SocialButton(),
    twitter: SocialButton(),
    whatsapp: SocialButton(),
    website: SocialButton(),
    waze: SocialButton(),
    youtube: SocialButton(),

}

const initState =  {

    firstname: '',
    lastname: '',
    username: '',
    email: '',
    mobile: '',
    mainSpeciality: '',

    title: '',
    description: '',
    gender: '',

    images: [],
    imagesHistory: [],
    specialities: [],
    languages: [],
    locations: [],
    certifications: [],
    hmos:[],
    buttons: socialButtons,
    about: '',
    vcard: vCard(),
    authorized: [],

    active: Boolean,
    verified: Boolean,
    deleted: Boolean,
    searchable: Boolean,

};

export function user(state = initState, action) {
  switch (action.type){
    case('SET USER'):{
        const {user} = action
        user.imagesHistory = user.images
        return (Object.assign({},state,user))
    }
    case ('RESET IMAGES HISTORY'):{
        return {...state,imagesHistory:state.images}
    }
    case('CHANGE LOCALED'):{
        const { name,language,value } = action
        let newVal = {...state[name]}
        newVal[language] = value
        return (Object.assign({},state,{ [name]: newVal }))
    }
    case ('MEDIA_ADD'):{
        const {media} = action
        const {images : oldImages} = state
        let images = [...oldImages]
        images.push(media)
        return {...state,images}
    }
    case ('MEDIA_REMOVE'):{
        const {mediaIndex} = action
        const {images : oldImages} = state
        let images = [...oldImages]
        images.splice(mediaIndex-1,1)
        return {...state,images}
    }
    case ('MEDIA_REPLACE'):{
        const {mediaSource,mediaTarget} = action
        const {images : oldImages} = state
        let images = [...oldImages]
        let temp = images[mediaSource-1]
        images[mediaSource-1] = images[mediaTarget-1]
        images[mediaTarget-1] = temp
        return {...state,images}
    }
    case ('SPECIALITY_ADD'):{
        const {speciality} = action
        const {specialities : oldSpecialities} = state
        let specialities = [...oldSpecialities]
        specialities.push(speciality)
        return {...state,specialities}
    }
    case ('SPECIALITY_REMOVE'):{
        const {id} = action
        const {specialities : oldSpecialities} = state
        let specialities = [...oldSpecialities]
        const specialityIndex = specialities.findIndex(spec => spec.id === id)
        if (specialityIndex > -1){
            specialities.splice(specialityIndex,1)
        }
        return {...state,specialities}
    }
    case ('SET SPECIALITY'):{
        const {speciality} = action
        const {specialities : oldSpecialities} = state
        let specialities = [...oldSpecialities]
        const specialityIndex = specialities.findIndex(spec => spec.id === speciality.id)
        if (specialityIndex > -1){
            specialities.splice(specialityIndex,1)
        }
        else {
            specialities.push(speciality)
        }
        return {...state,specialities}
    }
    case ('SET_MAIN_SPECIALITY'):{
        const {mainSpeciality} = action
        return {...state,mainSpeciality}
    }
    case ('SET_TITLE'):{
        const {title} = action
        return {...state,title}
    }
    case ('SET_GENDER'):{
        const {gender} = action
        return {...state,gender}
    }
    case ('SET_FIRSTNAME'):{
        const {firstname} = action
        return {...state,firstname}
    }
    case ('SET_LASTNAME'):{
        const {lastname} = action
        return {...state,lastname}
    }
    case ('SET_DESCRIPTION'):{
        const {description} = action
        return {...state,description}
    }
    case ('SET_DEGREE'):{
        const {degree,index} = action
        const {certifications : oldCertifications} = state
        let certifications = [...oldCertifications]
        certifications[index].degree = degree
        return {...state,certifications}
    }
    case ('TOGGLE_LANGUAGE'):{
        const {language} = action
        const {languages : oldLanguages} = state
        let languages = [...oldLanguages]
        const languageIndex = languages.findIndex(lang => lang.id === language.id)
        if (languageIndex > -1){
            languages.splice(languageIndex,1)
        }
        else {
            languages.push({...language,level:'basic'})
        }
        return {...state,languages}
    }
    case ('TOGGLE_HMO'):{
        const {hmo} = action
        const {hmos : oldHMOs} = state
        let hmos = [...oldHMOs]
        const hmoIndex = hmos.findIndex(_hmo => _hmo.value === hmo.value)
        if (hmoIndex > -1){
            hmos.splice(hmoIndex,1)
        }
        else {
            hmos.push(hmo)
        }
        return {...state,hmos}
    }
    case ('ADD_LOCATION'):{
        const location = emptyLocation()
        const {locations : oldLocations} = state
        let locations = [...oldLocations]
        locations.push(location)
        return {...state,locations}
    }
    case ('REMOVE_LOCATION'):{
        const {index} = action
        const {locations : oldLocations} = state
        let locations = [...oldLocations]
        locations.splice(index,1)
        return {...state,locations}
    }
    case ('CHANGE_LOCATION_PROP'):{
        const {index,target} = action
        const {name,value} = target
        if (!isNaN(value) && value < 0)
            value = 0
        const {locations : oldLocations} = state
        let locations = [...oldLocations]
        locations[index][name] = value
        return {...state,locations}
    }
    case ('ADD_DAILY_OPERATION'):{
        const { locationIdx,dayIdx } = action
        const {locations : oldLocations} = state
        let locations = [...oldLocations]
        let daily_operations = locations[locationIdx].daily_operations;
        daily_operations[dayIdx].push(emptyDayHours());
        return {...state,locations}
    }
    case ('REMOVE_DAILY_OPERATION'):{
        const {locationIdx,dayIdx,hourIdx} = action
        const {locations : oldLocations} = state
        let locations = [...oldLocations]
        let daily_operations = locations[locationIdx].daily_operations;
        daily_operations[dayIdx].splice(hourIdx,1);
        return {...state,locations}
    }
    case ('CHANGE_DAILY_OPERATION'):{
        const {locationIdx,dayIdx,hourIdx,time,from,to} = action
        const {locations : oldLocations} = state
        let locations = [...oldLocations]
        let daily_operations = locations[locationIdx].daily_operations;
        let datedTime = new Date(0,0,0,time.split(':')[0],time.split(':')[1],0,0)
        from && (daily_operations[dayIdx][hourIdx]['from'] = datedTime)
        to && (daily_operations[dayIdx][hourIdx]['to'] = datedTime)
        return {...state,locations}
    }
    case ('ADD_CERTIFICATION'):{
        const { certifications:oldCertifications } = state
        let certifications = [...oldCertifications]
        certifications.push(emptyCertification())
        return {...state,certifications}
    }
    case ('CHANGE_CERTIFICATION'):{
        const {index,name,value} = action
        const { certifications:oldCertifications } = state
        let certifications = [...oldCertifications]
        certifications[index][name] = value
        return {...state,certifications}
    }
    case ('REMOVE_CERTIFICATION'):{
        const {index} = action
        const { certifications:oldCertifications } = state
        let certifications = [...oldCertifications]
        certifications.splice(index,1)
        return {...state,certifications}
    }
    case ('CHANGE_ABOUT'):{
        const {value} = action
        return {...state,about:value}
    }
    case ('ADD_AUTHORIZED'):{
        const {email} = action
        const { authorized:oldAuthorized } = state
        let authorized = [...oldAuthorized]
        if (!authorized.includes(email))
            authorized.push(email)
        return {...state,authorized}
    }
    case ('CHANGE_AUTHORIZED'):{
        const {index,value} = action
        const { authorized:oldAuthorized } = state
        let authorized = [...oldAuthorized]
        authorized[index] = value
        return {...state,authorized}
    }
    case ('REMOVE_AUTHORIZED'):{
        const {index} = action
        const { authorized:oldAuthorized } = state
        let authorized = [...oldAuthorized]
            authorized.splice(index,1)
        return {...state,authorized}
    }
    case ('TOGGLE_SEARCHABLE'):{
        const {searchable:oldSearchable} = state
        const searchable = !oldSearchable
        return {...state,searchable}
    }
    case ('TOGGLE_ACTIVE'):{
        const {active:oldActive} = state
        const active = !oldActive
        return {...state,active}
    }
    case ('TOGGLE_LANGUAGE_SPEAKING'):{
        const {id} = action
        const {languages:oldLanguages} = state
        let languages = [...oldLanguages]
        const exists = languages.findIndex(lang => lang.id === id)
        if (exists > -1){
            languages[exists].speaking = !languages[exists].speaking
        }
        return {...state,languages}
    }
    case ('TOGGLE_LANGUAGE_READING'):{
        const {id} = action
        const {languages:oldLanguages} = state
        let languages = [...oldLanguages]
        const exists = languages.findIndex(lang => lang.id === id)
        if (exists > -1){
            languages[exists].reading = !languages[exists].reading
        }
        return {...state,languages}
    }
    case ('CHANGE_LANGUAGE_LEVEL'):{
        const {languageId,level} = action
        const {languages:oldLanguages} = state
        let languages = [...oldLanguages]
        const exists = languages.findIndex(lang => lang.id === languageId)
        if (exists > -1){
            languages[exists].level = level
        }
        return {...state,languages}
    }
    case ('TOGGLE_LANGUAGE_WRITING'):{
        const {id} = action
        const {languages:oldLanguages} = state
        let languages = [...oldLanguages]
        const exists = languages.findIndex(lang => lang.id === id)
        if (exists > -1){
            languages[exists].writing = !languages[exists].writing
        }
        return {...state,languages}
    }



    case('SET BUTTONS'):{
        const {buttons} = action
        return (Object.assign({},state,{buttons}))
    }
    case('SET VCARD'):{
        const {vcard} = action
        return (Object.assign({},state,{vcard}))
    }

    default:
      return state
  }
}
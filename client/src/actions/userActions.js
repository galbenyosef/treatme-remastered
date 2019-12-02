import { PROGRESS_SHOW,PROGRESS_HIDE } from "./constants";
import { 
  contactSupport as _contactSupport,
  update as _update,
  getSpecialities as _getSpecialities,
  getLocales as _getLocales,

} from "../services/user.service";

export const contactSupport = message => dispatch => {

  dispatch({type:PROGRESS_SHOW})

  _contactSupport(message)
  .then(response => dispatch({type:'INIT TITLES',titles:response.data}))
  .catch( err =>
    dispatch({type:'FAIL',message:err.response.data.message})
  )
  .then( 
    () => dispatch({type:PROGRESS_HIDE}) 
  )

}

export const update = (data,localeId) => dispatch => {

  dispatch({type:PROGRESS_SHOW})

  const {imagesHistory,images} = data
  const imagesOptimized = []

  for (let i=0; i<images.length;i++){

      let alreadyIn = imagesHistory.findIndex(image => image === images[i])
      if (alreadyIn > -1){
          imagesOptimized.push(alreadyIn)
      }
      else{
          imagesOptimized.push(images[i])
      }
  }

  _update({...data,images:imagesOptimized},localeId)
  .then(response => {
    dispatch({type:'RESET IMAGES HISTORY'})
    window.open(`${window.origin}/card/${data.username}`)
  })
  .catch( err =>
    dispatch({type:'FAIL',message:err.response.data.message})
  )
  .then( 
    () => dispatch({type:PROGRESS_HIDE}) 
  )

}

/* export const uploadImage = (image) => dispatch => {

  dispatch({type:PROGRESS_SHOW})

  _updateUser(username,data)
  .then(response => {})
  .catch( err =>
    dispatch({type:'FAIL',message:err.response.data.message})
  )
  .then( 
    () => dispatch({type:PROGRESS_HIDE}) 
  )

} */

export const addMedia = media => dispatch => {

  dispatch({type:'MEDIA_ADD',media})

}

export const removeMedia = mediaIndex => dispatch => {

  dispatch({type:'MEDIA_REMOVE',mediaIndex})

}

export const replaceMedia = (mediaSource,mediaTarget) => dispatch => {

  dispatch({type:'MEDIA_REPLACE',mediaSource,mediaTarget})

}

export const addSpeciality = speciality => dispatch => {

  dispatch({type:'SPECIALITY_ADD',speciality})

}

export const removeSpeciality = id => dispatch => {

  dispatch({type:'SPECIALITY_REMOVE',id})

}

export const setSpeciality = speciality => dispatch => {

  dispatch({type:'SET SPECIALITY',speciality})
/*   if (speciality.new){
    dispatch({type:'ADD_DATA_SPECIALITIESTREE',speciality})  
  } */

}

export const resetImagesHistory = () => dispatch => {

  dispatch({type:'RESET IMAGES HISTORY'})

}

export const setTitle = title => dispatch => {

  dispatch({type:'SET_TITLE',title})

}

export const setDegree = (index,degree) => dispatch => {

  dispatch({type:'SET_DEGREE',index,degree})

}

export const setMainSpeciality = mainSpeciality => dispatch => {

  dispatch({type:'SET_MAIN_SPECIALITY',mainSpeciality})

}

export const setMainSpecialityRegistration = mainSpeciality => dispatch => {

  dispatch({type:'SET_MAIN_SPECIALITY_REGISTRATION',mainSpeciality})

}

export const setDataMainSpecialities = mainSpecialities => dispatch => {

  dispatch({type:'SET_DATA_MAINSPECIALITIES',mainSpecialities})

}

export const setGender = gender => dispatch => {

  dispatch({type:'SET_GENDER',gender})

}

export const setFirstname = firstname => dispatch => {

  dispatch({type:'SET_FIRSTNAME',firstname})

}

export const setLastname = lastname => dispatch => {

  dispatch({type:'SET_LASTNAME',lastname})

}

export const setDescription = description => dispatch => {

  dispatch({type:'SET_DESCRIPTION',description})

}

export const toggleLanguage = language => dispatch => {

  dispatch({type:'TOGGLE_LANGUAGE',language})

}

export const addLocation = () => dispatch => {

  dispatch({type:'ADD_LOCATION'})

}

export const removeLocation = index => dispatch => {

  dispatch({type:'REMOVE_LOCATION',index})

}

export const changeLocationProp = (index,target) => dispatch => {

  dispatch({type:'CHANGE_LOCATION_PROP',index,target})

}

export const addDailyOperation = (locationIdx,dayIdx) => dispatch => {

  dispatch({type:'ADD_DAILY_OPERATION',locationIdx,dayIdx})

}

export const removeDailyOperation = (locationIdx,dayIdx,hourIdx) => dispatch => {

  dispatch({type:'REMOVE_DAILY_OPERATION',locationIdx,dayIdx,hourIdx})

}

export const changeDailyOperation = (locationIdx,dayIdx,hourIdx,time,from,to) => dispatch => {

  dispatch({type:'CHANGE_DAILY_OPERATION',locationIdx,dayIdx,hourIdx,time,from,to})

}

export const addCertification = () => dispatch => {

  dispatch({type:'ADD_CERTIFICATION'})

}

export const changeCertification = (index,name,value) => dispatch => {

  dispatch({type:'CHANGE_CERTIFICATION',index,name,value})

}

export const removeCertification = index => dispatch => {

  dispatch({type:'REMOVE_CERTIFICATION',index})

}

export const changeAbout = value => dispatch => {

  dispatch({type:'CHANGE_ABOUT',value})

}

export const addAuthorized = email => dispatch => {

  dispatch({type:'ADD_AUTHORIZED',email})
}

export const changeAuthorized = (index,value) => dispatch => {

  dispatch({type:'CHANGE_AUTHORIZED',index,value})

}

export const removeAuthorized = index => dispatch => {

  dispatch({type:'REMOVE_AUTHORIZED',index})

}

export const toggleSearchable = () => dispatch => {

  dispatch({type:'TOGGLE_SEARCHABLE'})

}

export const toggleHMO = hmo => dispatch => {

  dispatch({type:'TOGGLE_HMO',hmo})

}

export const toggleActive = () => dispatch => {

  dispatch({type:'TOGGLE_ACTIVE'})

}

export const toggleLanguageSpeaking = id => dispatch => {

  dispatch({type:'TOGGLE_LANGUAGE_SPEAKING',id})

}

export const changeLanguageLevel = (languageId,level) => dispatch => {

  dispatch({type:'CHANGE_LANGUAGE_LEVEL',languageId,level})

}

export const toggleLanguageReading = id => dispatch => {

  dispatch({type:'TOGGLE_LANGUAGE_READING',id})

}

export const toggleLanguageWriting = id => dispatch =>  {

  dispatch({type:'TOGGLE_LANGUAGE_WRITING',id})

}

export const deleteAccount = () => dispatch => {

  dispatch({type:PROGRESS_SHOW})
  _update({deleted:true})
  .then(response => {
    console.log(response)
    /* window.open(`${window.origin}/card/${loggedInUsername}`) */
  })
  .catch( err =>
    dispatch({type:'FAIL',message:err.response.data.message})
  )
  .then( 
    () => dispatch({type:PROGRESS_HIDE}) 
  )

}


import { 
  getLoginPageData as _getLoginPageData,
  getRegisterPageData as _getRegisterPageData,
  getViewPageData as _getViewPageData,
  getEditPageData as _getEditPageData,
} from "../services/user.service";

import { 
  PROGRESS_SHOW,
  PROGRESS_HIDE,
  LOCALES_SET
} from "./constants";

/* export const getLoginPageData = (locale) => dispatch => {

  dispatch({type:PROGRESS_SHOW})

  _getLoginPageData(locale)
  .then(response => {
    const {translations} = response.data
    dispatch({type:LOCALES_SET,translations})
  })
  .catch( err =>
    console.log(err)
  )
  .then( 
    () => dispatch({type:PROGRESS_HIDE}) 
  )
  
} */
export const getRegisterPageData = () => dispatch => {

  dispatch({type:PROGRESS_SHOW})

  _getRegisterPageData()
  .then(response => {
    const {mainSpecialities} = response.data
    console.log(mainSpecialities)
    dispatch({type:'SET_DATA_MAINSPECIALITIES',mainSpecialities})
  })
  .catch( err =>
    console.log(err)
  )
  .then( 
    () => dispatch({type:PROGRESS_HIDE}) 
  )
  
}

export const getViewPageData = (localeId,username) => dispatch => {

  dispatch({type:PROGRESS_SHOW})

  _getViewPageData(localeId,username)
  .then(response => {
    const {user,specialities} = response.data
    dispatch({type:'SET USER',user})
    dispatch({type:'SET_VIEW_DATA_SPECIALITIES',specialities})
  })
  .catch( err =>
    console.log(err)
  )
  .then( 
    () => dispatch({type:PROGRESS_HIDE}) 
  )
  
}

export const getEditPageData = (localeId) => dispatch => {

  dispatch({type:PROGRESS_SHOW})

  _getEditPageData(localeId)
  .then(response => {
    const {user,mainSpecialities,specialities,specialitiesTree,titles,languages,hmos,degrees} = response.data
    dispatch({type:'SET USER',user})  
    dispatch({type:'SET_DATA_SPECIALITIES',specialities:specialities || []})
    dispatch({type:'SET_DATA_SPECIALITIESTREE',specialitiesTree:specialitiesTree || []})
    dispatch({type:'SET_DATA_MAINSPECIALITIES',mainSpecialities:mainSpecialities || []})
    dispatch({type:'SET_DATA_TITLES',titles:titles || []})
    dispatch({type:'SET_DATA_LANGUAGES',languages:languages || []})
    dispatch({type:'SET_DATA_DEGREES',degrees:degrees || []})
    dispatch({type:'SET_DATA_HMOS',hmos:hmos || []})

  })
  .catch( err =>
    console.log(err)
  )
  .then( 
    () => dispatch({type:PROGRESS_HIDE}) 
  )
  
}

/* export const addSpecialityTreeData = speciality => dispatch => {

  dispatch({type:'ADD_DATA_SPECIALITIESTREE',speciality})  
  
} */


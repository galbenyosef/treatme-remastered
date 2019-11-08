import { 
  getLocales as _getLocales,
  getTranslations as _getTranslations,
 } from "../services/user.service";
import LocalizedStrings from "react-localization";
import { getInterfaceLocale } from "../components/Utilities/languageUtils";
import { PROGRESS_SHOW, PROGRESS_HIDE, TOGGLE_LOCALIZATION_BAR } from "./constants";

export const getTranslations = (locale) => dispatch => {

  dispatch({type:PROGRESS_SHOW})

  _getTranslations(locale._id)
  .then( response => {
    const strings = createStrings(response.data,locale)
    dispatch({type:'SET STRINGS',strings})
    dispatch({type:'SET LOCALE',locale})

  })
  .catch( err => {console.log(err);dispatch({type:PROGRESS_HIDE})})     
  .then( () => dispatch({type:PROGRESS_HIDE}) )
}


const createStrings = (translations,locale) => {

  let strings = {}
  let localizedInput = {}
  localizedInput[locale.symbol] = {}
  translations.forEach(string => localizedInput[string.source] = string.value)

  strings = new LocalizedStrings({
    localizedInput
  })

  strings.setLanguage(locale.symbol)
  return strings
}


export const initLocales = () => dispatch => {

  dispatch({type:PROGRESS_SHOW})

  _getLocales()
  .then(response => {
    const locales = response.data
    dispatch({type:'SET LOCALES',locales})
    return locales
  })
  .catch(err => console.log(err))
  .then( (locales) => {
    let locale = null
    const storedLocale = localStorage.getItem('treatmeLocale')
    if ( !storedLocale || (storedLocale && !JSON.parse(storedLocale)._id) ){

      locale = locales.find(loc => loc.symbol === getInterfaceLocale())

      if (!locale){
        dispatch({type:TOGGLE_LOCALIZATION_BAR})
        return
      }
    }
    else {
      locale = JSON.parse(storedLocale)
    }

    if (locale && locale._id && locale.name){

      dispatch({type:'SET LOCALE',locale})
      _getTranslations(locale._id)
      .then( response => {
        const strings = createStrings(response.data,locale)
        dispatch({type:'SET STRINGS',strings})
      })
      .catch( err => console.log(err))     
    }
    dispatch({type:PROGRESS_HIDE})
  })

}
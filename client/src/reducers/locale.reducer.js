import { TOGGLE_LOCALIZATION_BAR } from "../actions/constants";

const userLocale = localStorage.getItem('treatmeLocale')

const initialState = {
  locale:userLocale && JSON.parse(userLocale),
  strings: null,
  locales:[],
  direction:'',
  barOpened:false
}

export function locale(state =  initialState, action) {
    const {type} = action

    switch (type){
      case TOGGLE_LOCALIZATION_BAR: {
          const {barOpened} = state
          return {...state,barOpened:!barOpened}
      }
      case ('SET LOCALES'):{
        const {locales} = action
        return {...state,locales}
      }
      case ('SET STRINGS'):{
        const {strings} = action
        return {...state,strings}
      }
      case ('SET LOCALE'):{
        const {locale} = action
        if (locale){
          localStorage.setItem('treatmeLocale',JSON.stringify(locale))
          return {...state,locale,direction:locale.direction}
        }
      }
      default:
        return state
    }
  }

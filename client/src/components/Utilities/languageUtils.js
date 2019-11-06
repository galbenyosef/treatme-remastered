import { connect } from 'react-redux';
import React from 'react'

const directionProvider = ({direction,children}) => {

  return (
    <div dir={direction}>
      {children}
    </div>
  )

}

const mapStateToProps = state => {
  const {direction} = state.locale
  return {direction}
}

export const fromStrings = (strings,string) => {
  return (strings && strings[string]) || string
}

export const DirectionProvider = connect(mapStateToProps)(directionProvider)


export const getInterfaceLocale = () => {
    const defaultLang = 'en';
    let retval = ''

    if (typeof navigator === 'undefined') {
      retval = defaultLang;
    }
    const nav = navigator; // eslint-disable-line no-undef
    if (nav) {
      if (nav.language) {
        retval = nav.language;
      }
      if (!!nav.languages && !!nav.languages[0]) {
        retval = nav.languages[0];
      }
      if (nav.userLanguage) {
        retval = nav.userLanguage;
      }
      if (nav.browserLanguage) {
        retval = nav.browserLanguage;
      }
    }
    return retval.substring(0,2);
}

export const getLocaleNative = (data,object) => {
  if (!object)
    return

  if(!object._id)
    return

  const objectFound = data.find(obj => obj._id === object._id)

  if (objectFound.native)
    return objectFound.native
}

export const getLocaleSymbol = (data,object) => {
  if (!object)
    return

  if(!object._id)
    return

  const objectFound = data.find(obj => obj._id === object._id)
  if (objectFound.symbol)
    return objectFound.symbol
}

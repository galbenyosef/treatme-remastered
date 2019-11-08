import { TOGGLE_TERMS, REGISTER_CHANGE_FIELD, REGISTER_CHECK_FIELD } from "../actions/constants";

const initialState =  {
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    mobile: '',
    editor: false,
    mainSpeciality: {},
    password: '',
    passwordVerif: '',
    termsDialogOpened:false,
    accepted:false,
}

export function register(state = initialState, action) {
  const {type} = action
  switch (type){
    case TOGGLE_TERMS: {
      return {...state,termsDialogOpened:!state.termsDialogOpened}
    }
    case REGISTER_CHANGE_FIELD: {
      const {name,value} = action
      return {...state,[name]:value}
    }
    case REGISTER_CHECK_FIELD: {
      const {name,checked} = action
      return {...state,[name]:checked}
    }
    case ('SET_MAIN_SPECIALITY_REGISTRATION'):{
      const {mainSpeciality} = action
      return {...state,mainSpeciality}
    }
    default:
      return state
  }
}
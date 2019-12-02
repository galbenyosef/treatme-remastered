import { TOGGLE_TERMS, REGISTER_CHANGE_FIELD, REGISTER_CHECK_FIELD } from "../actions/constants";

const initialState =  {
    username: 'galbenyosef',
    email: 'galbenyosef@gmail.com',
    firstname: {he:'גל'},
    lastname: {he:'בן יוסף'},
    mobile: '0545530229',
    editor: false,
    mainSpeciality: {},
    password: '123123',
    passwordVerif: '123123',
    termsDialogOpened:false,
    accepted:true,
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
      console.log(mainSpeciality)
      return {...state,mainSpeciality}
    }
    default:
      return state
  }
}
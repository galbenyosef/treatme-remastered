import { setUser } from "../actions/loginActions";
import { LOGIN_CHANGE_FIELD, LOGIN_SUCCESSFUL, FORGOTPASS_SHOW, FORGOTPASS_HIDE } from "../actions/constants";

const initialState = {
  username: '',
  password: '',
  showForgotPassword: false,
  multiUserDialog: [],
}

export function login(state =  initialState, action) {
  const {type} = action

  switch (type){
    case LOGIN_CHANGE_FIELD: {
      const {name,value,language} = action
      if (language){
        let object = state[name]
        object[language] = value
        return {...state,[name]:object}
      }
      else{
        return {...state,[name]:value}
      }
    }
    case LOGIN_SUCCESSFUL:{
      const {accounts} = action
      if (accounts.length === 1) {
        let account = accounts[0]
        setUser(account)
        return {...state}
      }
      return {...state,multiUserDialog:accounts}
    }
    case FORGOTPASS_SHOW:{
      const {username} = action
      return {...state,showForgotPassword:true,username}
    }
    case FORGOTPASS_HIDE:{
      return {...state,showForgotPassword:false,username:''}
    }
    default:
      return state
  }
}

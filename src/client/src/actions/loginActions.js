import { 
  login as _login,
  loginWithToken as _loginWithToken,
  forgotPassword as _forgotPassword 
} from "../services/user.service";
import { LOGIN_SUCCESSFUL, FORGOTPASS_SHOW, FORGOTPASS_HIDE, ALERT_FAIL, PROGRESS_HIDE, LOGIN_CHANGE_FIELD, PROGRESS_SHOW, ALERT_SUCCESS } from "./constants";
import { history } from '../config/history';

export const login = (username,password) => dispatch => {

  dispatch({type:PROGRESS_SHOW})

  _login(username,password)
  .then(response => {
    const accounts  = response.data
    if (accounts && accounts.length){
      if (accounts.length === 1){
          let user = accounts[0]
          localStorage.setItem('treatmeUser',JSON.stringify(user))
          history.replace(`/card/${user.username}`)
      }
      else {

      }
    }
/*       dispatch({type:LOGIN_SUCCESSFUL,accounts})
 */  })
  .catch(err => {
    if (err.response && err.response.data && err.response.data.showForgotPass){
      dispatch({type:FORGOTPASS_SHOW,username})
    }
    else {
      dispatch({type:FORGOTPASS_HIDE})
      dispatch({type:ALERT_FAIL,message:(err.response && err.response.data && err.response.data.message) || err})
    }
  })
  .then(
    () => dispatch({type:PROGRESS_HIDE})
  )
}

export const setUser = user  => {
  console.log(user)
  localStorage.setItem('treatmeUser',JSON.stringify(user))
}


export const loginWithToken = (token) => dispatch => {

  dispatch({type:PROGRESS_SHOW})

  loginWithToken(token)
  .then(response => dispatch({type:LOGIN_SUCCESSFUL,accounts:response.data}))
  .catch( err =>
    dispatch({type:ALERT_FAIL,message:err.response.data.message})
  )
  .then( 
    () => dispatch({type:PROGRESS_HIDE})
  )

}

export const forgotPassword = username => dispatch => {

  dispatch({type:PROGRESS_SHOW})

  _forgotPassword(username)
    .then(() => {
      dispatch({type:ALERT_SUCCESS,message:'Mail sent succesfully'})
    })
    .catch(err => {
      dispatch({type:ALERT_FAIL,message:err.response.data.message})
    })
    .then( () => {
      dispatch({type:FORGOTPASS_HIDE})
      dispatch({type:PROGRESS_HIDE})
    } )

}

export const changeFieldValue = (name,value) => dispatch => {

  dispatch({type:LOGIN_CHANGE_FIELD,name,value})

}

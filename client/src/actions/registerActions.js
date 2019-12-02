import { register as _register} from "../services/user.service";
import { history } from "../config/history";
import { PROGRESS_SHOW, PROGRESS_HIDE, TOGGLE_TERMS, REGISTER_CHANGE_FIELD, REGISTER_CHECK_FIELD } from "./constants";

export const register = (user) => dispatch => {

  dispatch({type:PROGRESS_SHOW})

  const {username} = user
  _register(user)
      .then(response => {
          if (response.data){
            localStorage.setItem('treatmeUser',JSON.stringify(response.data))
            history.replace(`/card/${username}/admin`)
          }
      })
      .catch(err => {
          dispatch({type:'ALERT_FAIL',message:err.response.data.message || JSON.stringify(err)})
        }
      )
      .then( () => {
          dispatch({type:PROGRESS_HIDE}) 
        }
      )
}

export const toggleTerms = () => dispatch => {
  dispatch({type:TOGGLE_TERMS})
}

export const handleChange = (name,value) => dispatch => {
  dispatch({type:REGISTER_CHANGE_FIELD,name,value})
}

export const handleCheck = (name,checked) => dispatch => {
  dispatch({type:REGISTER_CHECK_FIELD,name,checked})
}
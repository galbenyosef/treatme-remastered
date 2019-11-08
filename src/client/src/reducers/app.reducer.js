import { ALERT_SUCCESS, ALERT_FAIL, ALERT_CLOSE, PROGRESS_SHOW, PROGRESS_HIDE } from "../actions/constants";


export function alert(state = {message:'',open:false}, action) {
  const {type,message} = action
  switch (type){
    case ALERT_SUCCESS: {
        return {message:message,open:!!message}
    }
    case ALERT_FAIL: {
        return {message:message,open:!!message}
    }
    case ALERT_CLOSE: {
        return {open:false}
    }
    default:
      return state
  }
}

export function progress(state = {message:'',open:false}, action) {
  const {type,message} = action
  switch (type){
    case PROGRESS_SHOW: {
        return {message:message,open:true}
    }
    case PROGRESS_HIDE: {
        return {open:false}
    }
    default:
      return state
  }
}
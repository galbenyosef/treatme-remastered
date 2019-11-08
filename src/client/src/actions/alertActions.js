import { ALERT_SUCCESS, ALERT_FAIL, ALERT_CLOSE } from "./constants";

export const success = message => dispatch => {
  dispatch({type:ALERT_SUCCESS,message});
}

export const fail = message => dispatch => {
  dispatch({type:ALERT_FAIL,message});
}

export const handleCloseAlert = () => dispatch => {
  dispatch({type:ALERT_CLOSE})
}
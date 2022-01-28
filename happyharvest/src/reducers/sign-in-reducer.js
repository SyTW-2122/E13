import { UPDATE_SI_FORM, RESET_SI_FORM, UPDATE_SI_MSG } from '../actions/sign-in-actions'

export default function signInReducer({type, payload}, state = {username : "",
password : "",
msg: ""}) {
  let newState = {};
  switch (type) {
    case UPDATE_SI_FORM:
      newState = {...state};
      if(newState[payload.name] != undefined){
        newState[payload.name] = payload.value;
      }
      return(newState);

    case RESET_SI_FORM: //Si ponemos esto como default...?
      return({
        username : "",
        password : "",
        msg: ""
      });
    
    case UPDATE_SI_MSG:
      newState = {...state};
      newState.msg = payload.msg;
      return(newState);
    
    default:
      return(state);
  }
} 
import { SET_TOKEN } from "../actions/auth-actions";

export default function authReducer({type, payload}, state = {authToken: ""}) {  
  switch (type) {
    case (SET_TOKEN):
        return(payload)
    default:
      return(state);
  }
} 
import { SET_TOKEN } from "../actions/auth-actions";

export default function authReducer(state = {authToken: ""}, {type, payload}) {
  switch (type) {
    case (SET_TOKEN):
        return(payload)
    default:
      return(state);
  }
} 
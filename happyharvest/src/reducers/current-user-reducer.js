import { LOG_OUT, SET_USER } from "../actions/user-actions";

export default function signUpReducer({type, payload}, state = {username : "",
fullname : "",
email : "",
registration : 0,
farmElements : {
  cropSpaces : 0,
  animalSpaces : 0,
  currentCrops : [],
  currentAnimals : [],
},  
inventory : {
  currentCash : 0,
  cropBoost : 0,
  animalBoost : 0,
  products : []
} }) {
  switch (type) {
    case SET_USER:
      return(payload);
    
    case LOG_OUT: 
      return({
        username : "",
        fullname : "",
        email : "",
        registration : 0,
        farmElements : {
          cropSpaces : 0,
          animalSpaces : 0,
          currentCrops : [],
          currentAnimals : [],
        },  
        inventory : {
          currentCash : 0,
          cropBoost : 0,
          animalBoost : 0,
          products : []
        } 
      });
  
    default:
      return(state);
  }
} 
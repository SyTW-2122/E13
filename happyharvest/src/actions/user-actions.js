export const SET_USER = 'currentUser:setUser'; 
export const LOG_OUT = 'currentUser:logOut'; 

export function setUser(user) {
  return ({
    type: SET_USER,
    payload: {
      username : user.username ? user.username : "",
      fullname : user.fullname ? user.fullname : "",
      email : user.email ? user.email : "",
      registration : user.registration ? user.registration : 0,
      farmElements : {
        cropSpaces : user.farmElements.cropSpaces ? user.farmElements.cropSpaces : 0,
        animalSpaces : user.farmElements.animalSpaces ? user.farmElements.animalSpaces : 0,
        currentCrops : user.farmElements.currentCrops ? [...user.farmElements.currentCrops] : [],
        currentAnimals : user.farmElements.currentAnimals ? [...user.farmElements.currentAnimals] : [],
      },  
      inventory : {
        currentCash : user.inventory.currentCash ? user.inventory.currentCash : 0,
        cropBoost : user.inventory.cropBoost ? user.inventory.cropBoost : 0,
        animalBoost : user.inventory.animalBoost ? user.inventory.animalBoost : 0,
        products : user.inventory.products ? [...user.inventory.products] : []
      }
    }
  });
}

export function logOut() {
  return ({
    type: LOG_OUT,
    payload: { }
  });
}
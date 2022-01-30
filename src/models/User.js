const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username : String, 
    fullname : String,
    password : String,
    email : String,
    registration : Number,
    farmElements : {
   	    cropSpaces : Number,
   	    animalSpaces : Number,
   	    currentCrops : Array,
   	    currentAnimals : Array,
    },
    inventory : {
   	    currentCash : Number,
   	    cropBoost : Number,
   	    animalBoost : Number,
   	    products : Array,
        seeds : Array
    }
})

const User = mongoose.model("User", UserSchema);

exports.User = User
exports.UserSchema = UserSchema

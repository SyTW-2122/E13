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
   	    currentCrops : [{ 
            element : String,
            type : String,
            cycleTime : Number, //Número de horas
            lastProduction : Date,
            baseProduction : Number,
            probability : Number,
            product : {
                name : String,
                icon : {
                    src : String,
                    width : Number,
                    height : Number
                },
                sellPrice : Number
            },
            icon : {
                src : String,
                width : Number,
                height : Number
            },
            buyPrice : Number,
            isBoosted : Boolean
        }],
   	    currentAnimals : [{ 
            element : String,
            type : String,
            cycleTime : Number, //Número de horas
            lastProduction : Date,
            baseProduction : Number,
            probability : Number,
            product : {
                name : String,
                icon : {
                    src : String,
                    width : Number,
                    height : Number
                },
                sellPrice : Number
            },
            icon : {
                src : String,
                width : Number,
                height : Number
            },
            buyPrice : Number,
            isBoosted : Boolean
        }],
    },
    inventory : {
   	    currentCash : Number,
   	    cropBoost : Number,
   	    animalBoost : Number,
   	    products : [{
            name : String,
            icon : {
                src : String,
                width : Number,
                height : Number
            },
            sellPrice : Number
        }]
    }
})

const User = mongoose.model("User", UserSchema);

exports.User = User
exports.UserSchema = UserSchema

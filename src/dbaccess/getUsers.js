let userModule = require("../models/User")
let Crops = require("./cropList")

function getUsers(){
    return new Promise((res, rej) => {
        userModule.User.find().then((list) => {
            res(list);
        }).catch((err) => {
            rej(err);
        })
    })
}

function findUserByName(nick) {
    return new Promise((res, rej) => {
        userModule.User.find({username: nick}).then((list) => {
            if(list.length == 0) {
                rej("No user found");
            } else {
                res(list[0]);
            }
        }).catch((err) => {
            rej(err);
        })
    })
}

function returnCleanUser(nick) {
    let aux = {
        "username": "",
        "email": "", 
        "fullname": "",
        "registration": 0,
        "farmElements" : {
            "cropSpaces" : 0,
            "animalSpaces" : 0,
            "currentCrops" : [],
            "currentAnimals" : [],
        },
        "inventory" : {
            "currentCash" : 0,
            "cropBoost" : 0,
            "animalBoost" : 0,
            "products" : [],
            "seeds" : []
        }
    }
    return new Promise((res, rej) => {
        userModule.User.find({username: nick}).then((list) => {
            if(list.length == 0) {
                rej("No user found");
            } else {
                for(let prop in aux) {
                    aux[prop] = list[0][prop]
                }
                res(aux);
            }
        }).catch((err) => {
            rej(err);
        })
    })
}

function validateUser(user, passwd){
    return new Promise((res, rej) => {
        userModule.User.find({username: user}).then((list) => {
            if(list.length == 0) {
                rej("No user found");
            }
            if(list[0].password == passwd) {
                res(true);
            } else {
                res(false);
            }
        }).catch((err) => {
            rej(err);
        })
    })
}

function checkIfValidReg(queryUser, queryEmail) {
    return new Promise((res, rej) => {
        let user
        let email
        try {
            userModule.User.find({username: queryUser}).then((userval) => {
                user = userval;
                userModule.User.find({email: queryEmail}).then((emailval) => {
                    email = emailval;
                    if(user.length > 0){
                        res({
                            type: "res",
                            register: false,
                            validUser: "Ese usuario ya se encuentra registrado"
                        });
                    }
                    if(email.length > 0){
                        res({
                            type: "res",
                            register: false,
                            validEmail: "Ese correo ya se encuentra registrado"
                        });
                    }
                    res({
                        val: true,
                        msg: ""
                    });
                })

            });
        } catch(err) {
            rej(err)
        }
    })
}

function postNewUser(userInfo) {
    let newUser = new userModule.User(userInfo);
    return new Promise((res, rej) => {
        newUser.save().then(() => {
            res("User created");
        }).catch((err) => {
            rej(err);
        })
    })
}

function deleteOneUser(nick) {
    return new Promise((res, rej) => {
        if(!nick) {
            rej("Query field required - 'username'")
        }
        userModule.User.deleteOne({username: nick}).then((deletions) => {
            if(deletions.deletedCount == 0) {
                rej(`User ${nick} does not exist`)
            } else {
                res("User succesfully deleted");
            }
            
        }).catch((err) => {
            rej(err);
        })
    })
}

function addSeeds(nick, name, quantity) {
    return new Promise((res, rej) => {
        userModule.User.find({username: nick}).then((list) => {
            if(list.length == 0) {
                rej("No user found");
            } else {
                let entity = list[0];
                let val = Number(quantity);
                for(let i = 0; i < entity.inventory.seeds.length; i++) {
                    if(entity.inventory.seeds[i][1].type == name) {
                        val += Number(entity.inventory.seeds[i][0])
                        entity.inventory.seeds.splice(i, 1)
                    }
                }
                
                entity.inventory.seeds.push([Number(val), {...Crops[name]}])
                entity.save();
                res("ok")
            }
        }).catch((err) => {
            console.log("\n\n" + err)
            rej(err);
        })
    })
}

function buySeeds(nick, name, quantity) {
    return new Promise((res, rej) => {
        userModule.User.find({username: nick}).then((list) => {
            if(list.length == 0) {
                rej("No user found");
            } else {
                let entity = list[0];
                if(Number(entity.inventory.currentCash) >= Number(Crops[name].buyPrice)*Number(quantity)){
                    let val = Number(quantity);
                    entity.inventory.currentCash = Number(entity.inventory.currentCash) - Number(Crops[name].buyPrice)*Number(quantity);
                    for(let i = 0; i < entity.inventory.seeds.length; i++) {
                        if(entity.inventory.seeds[i][1].type == name) {
                            val += Number(entity.inventory.seeds[i][0])
                            entity.inventory.seeds.splice(i, 1)
                        }
                    }
                    
                    entity.inventory.seeds.push([Number(val), {...Crops[name]}])
                    entity.save();
                    res("OK")
                } else {
                    res("Not enough cash")
                }   
            }
        }).catch((err) => {
            console.log("\n\n" + err)
            rej(err);
        })
    })
}

function growCrops(nick, name) {
    return new Promise((res, rej) => {
        userModule.User.find({username: nick}).then((list) => {
            if(list.length == 0) {
                rej("No user found");
            } else {
                let entity = list[0];
                if(entity.farmElements.currentCrops.length >= entity.farmElements.cropSpaces) {
                    res("The garden is full")
                } else {
                    let found = false;
                    for(let i = 0; i < entity.inventory.seeds.length; i++) {
                        if(entity.inventory.seeds[i][1].type == name) {
                            found = true;
                            let aux = {...entity.inventory.seeds[i][1],
                                lastProduction: new Date().getTime()
                            };
                            entity.farmElements.currentCrops.push(aux);
                            let seedquantity = entity.inventory.seeds[i][0] -= 1;
                            let crop = {...entity.inventory.seeds[i][1]};
                            entity.inventory.seeds.splice(i, 1);
    
                            if(seedquantity > 0){
                                entity.inventory.seeds.push([seedquantity, crop])
                            }
                        }
                    }
    
                    entity.save();
                    if(!found) {
                        res("User has no seeds")
                    }
                    res("OK")
                }
            }
        }).catch((err) => {
            console.log("\n\n" + err)
            rej(err);
        })
    })
}

function harvestCrops(nick, position) {
    pos = Number(position);
    return new Promise((res, rej) => {
        userModule.User.find({username: nick}).then((list) => {
            if(list.length == 0) {
                rej("No user found");
            } else {
                let entity = list[0];
                if(entity.farmElements.currentCrops.length -1 < pos) {
                    res("There is no crop in that position")
                } else {
                    let producedAt = entity.farmElements.currentCrops[pos].lastProduction + (1000*60*60*entity.farmElements.currentCrops[pos].cycleTime);
                    let rightNow = new Date().getTime();
                    if(producedAt <= rightNow) {
                        let product = {...entity.farmElements.currentCrops[pos].product}
                        let previousQuantity = 0;
                        let genQuantity = entity.farmElements.currentCrops[pos].baseProduction;
                        if(Math.random() < entity.farmElements.currentCrops[pos].probability) {
                            genQuantity = genQuantity + Math.round(Math.random()*genQuantity);
                        }
                        entity.farmElements.currentCrops.splice(pos, 1);

                        for(let i = 0; i < entity.inventory.products.length; i++) {
                            if(entity.inventory.products[i][1].name == product.name) {
                                previousQuantity = entity.inventory.products[i][0];
                                entity.inventory.products.splice(i, 1);
                            }
                        }

                        entity.inventory.products.push([genQuantity + previousQuantity, {...product}])
                    } else {
                        res("Crop is not ready to harvest")
                    }
                    entity.save()
                    res("OK")
                }
            }
        }).catch((err) => {
            console.log("\n\n" + err)
            rej(err);
        })
    })
}

function sellProducts(nick, name, quantity) {
    return new Promise((res, rej) => {
        userModule.User.find({username: nick}).then((list) => {
            if(list.length == 0) {
                rej("No user found");
            } else {
                let entity = list[0];

                let val;
                let product = {}
                let found = false;
                for(let i = 0; i < entity.inventory.products.length; i++) {
                    if(entity.inventory.products[i][1].name == name) {
                        if(Number(entity.inventory.products[i][0]) >= Number(quantity)){
                            found = true;
                            val = Number(entity.inventory.products[i][0]) - quantity;
                            product = {...entity.inventory.products[i][1]};
                            entity.inventory.products.splice(i, 1);
                            entity.inventory.currentCash = Number(entity.inventory.currentCash) + Number(product.sellPrice);
                        } else {
                            res("User does not have enought products")
                        }                        
                    }
                }
                
                if(!found) {
                    res("User does not have enought products")
                } else {
                    if(val > 0){
                        entity.inventory.products.push([Number(val), {...product}])
                    }
                    entity.save();
                    res("OK")
                }
            }
        }).catch((err) => {
            console.log("\n\n" + err)
            rej(err);
        })
    })
}

function cleanAll(nick) {
    return new Promise((res, rej) => {
        userModule.User.find({username: nick}).then((list) => {
            if(list.length == 0) {
                rej("No user found");
            } else {
                let entity = list[0];
                entity.farmElements.currentCrops = [];
                entity.inventory.seeds = [];
                entity.inventory.products = [];
                entity.save()
                res("ok")
            }
        }).catch((err) => {
            console.log("\n\n" + err)
            rej(err);
        })
    })
}

exports.getUsers = getUsers
exports.findUserByName = findUserByName
exports.checkIfValidReg = checkIfValidReg
exports.postNewUser = postNewUser
exports.deleteOneUser = deleteOneUser
exports.validateUser = validateUser
exports.returnCleanUser = returnCleanUser
exports.addSeeds = addSeeds
exports.buySeeds = buySeeds
exports.sellProducts = sellProducts
exports.growCrops = growCrops
exports.harvestCrops = harvestCrops
exports.cleanAll = cleanAll
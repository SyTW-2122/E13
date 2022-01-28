let userModule = require("../models/User")

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
                res(list);
            }
        }).catch((err) => {
            rej(err);
        })
    })
}

function checkIfUserReg(nick) {
    return new Promise((res, rej) => {
        userModule.User.find({username: nick}).then((list) => {
            if(list.length == 0) {
                res(true);
            } else {
                res(false);
            }
        }).catch((err) => {
            rej(err);
        })
    })
}

function checkIfEmailReg(nick) {
    return new Promise((res, rej) => {
        userModule.User.find({email: nick}).then((list) => {
            if(list.length == 0) {
                res(true);
            } else {
                res(false);
            }
        }).catch((err) => {
            rej(err);
        })
    })
}

function postNewUser(userInfo) {
    console.log(userInfo)
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
        userModule.User.deleteOne({username: nick}).then(() => {
            res("User deleted");
        }).catch((err) => {
            rej(err);
        })
    })
}

exports.getUsers = getUsers
exports.findUserByName = findUserByName
exports.checkIfUserReg = checkIfUserReg
exports.checkIfEmailReg = checkIfEmailReg
exports.postNewUser = postNewUser
exports.deleteOneUser = deleteOneUser
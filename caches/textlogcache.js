const database = require('../database');

exports.constructor(); {
    exports.cachemap = new Map();
}

exports.addToCache = async(cachekey, cachevalue) => {
    this.cachemap.set(cachekey, [cachevalue])
}

exports.removeFromCache = async(cacheobject) => {
    this.cachemap.delete(cacheobject)
}

exports.updateCache = async(cachekey, value) => {
    if(this.cachemap.get(cachekey) === undefined){
        this.addToCache(cachekey, [value])
    }else {
        this.cachemap.set(cachekey, this.cachemap.get(cachekey).push(value))
    }
}

exports.writeCacheToDatabase = async() => {
    this.cachemap.forEach((value, user)=>{
        value.forEach((message)=>{database.addTextmessage(user, message)})
    })
}

exports.writeCacheofSpecificUser = async(user) => {
    if(this.cachemap.get(cachekey) != undefined){
    this.cachemap.get(user).forEach((message)=>{database.addTextmessage(user, message)})
    this.cachemap.set(user, [])
}
}


this.updateCache("Nowilltolife", "i am cool")
this.writeCacheToDatabase()

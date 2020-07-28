const database = require('../database');

exports.constructor = function() {
    exports.cachemap = new Map();
}

exports.addToCache = async(cachekey, cachevalue) => {
    this.cachemap.set(cachekey, cachevalue)
}

exports.removeFromCache = async(cacheobject) => {
    this.cachemap.delete(cacheobject)
}

exports.updateCache = async(cachekey, value) => {
    if (this.cachemap.get(cachekey) === undefined) {
        this.addToCache(cachekey, value)
    } else {
        this.cachemap.set(cachekey, this.cachemap.get(cachekey) + value)
    }
}

exports.writeCacheToDatabase = async() => {
    this.cachemap.forEach((value, user)=>{
        database.addPlayertime(user, value)
    })
}

exports.writeCacheofSpecificUser = async(user) => {
    if(this.cachemap.get(user) != undefined) {
        database.addPlayertime(user, this.cachemap.get(user))
        this.cachemap.set(user, 0)
    }
}

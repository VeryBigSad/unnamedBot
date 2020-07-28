const database = require('../database');

exports.init = function() {
	exports.cachemap = new Map();
}

exports.addToCache = async(cachekey, cachevalue) => {
    this.cachemap.set(cachekey, [cachevalue])
}

exports.removeFromCache = async(cacheobject) => {
    this.cachemap.delete(cacheobject)
}

exports.updateCache = async(cachekey, value) => {
    if(this.cachemap.get(cachekey) == undefined){
        this.addToCache(cachekey, value)
    } else {
	thing = this.cachemap.get(cachekey)
	thing.push(value)

        this.cachemap.set(cachekey, thing)
    }
}

exports.writeCacheToDatabase = async() => {
    this.cachemap.forEach((value, user)=>{
        value.forEach((message)=>{database.addTextmessage(user, message)})
    })
}

exports.writeCacheofSpecificUser = async(user) => {
    if(this.cachemap.get(user) != undefined) {
    	this.cachemap.get(user).forEach((message)=>{database.addTextmessage(user, message)})
    	this.cachemap.set(user, [])
    }
}


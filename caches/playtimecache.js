exports.init = function() {
	exports.cachemap = new Map();
}

exports.setCacheValue = (user, value) => {
    this.cachemap.set(user, value)
}

exports.getCacheValue = (user) => {
    return this.cachemap.get(user)
}

// <<<<<<< HEAD
// exports.updateCache = async(cachekey, value) => {
//     if (this.cachemap.get(cachekey) === undefined) {
//         this.addToCache(cachekey, value)
//     } else {
//         this.cachemap.set(cachekey, this.cachemap.get(cachekey) + value)
//     }
// }

// exports.writeCacheToDatabase = async() => {
//     this.cachemap.forEach((value, user)=>{
//         database.addPlayertime(user, value)
//     })
// }

// exports.writeCacheofSpecificUser = async(user) => {
//     if(this.cachemap.get(user) != undefined) {
//         database.addPlayertime(user, this.cachemap.get(user))
//         this.cachemap.set(user, 0)
//     }
// }
// =======
exports.addToCacheValue = (user, value)  => {
    if(this.cachemap.has(user)){
    thing = this.cachemap.get(user)
    this.cachemap.set(user, thing+value)
    }else {
        this.cachemap.set(user, value)
    }
}

this.init()
this.addToCacheValue("Nowilltolife", 1)
this.addToCacheValue("Nowilltolife", 1)
console.log(this.cachemap)
// >>>>>>> 3b8ec4a36770e16bc2686101dbdda8f3fe8d9b30

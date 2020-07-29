exports.init = function() {
	exports.cachemap = new Map();
}

exports.setCacheValue = (user, value) => {
    this.cachemap.set(user, value)
    // console.log(this.cachemap)
}

exports.getCacheValue = (user) => {
    return this.cachemap.get(user)
    // console.log(this.cachemap)
}

exports.addToCacheValue = (user, value)  => {
    if (this.cachemap.has(user)) {
	    this.cachemap.set(user, this.cachemap.get(user) + value)
    } else {
        this.cachemap.set(user, value)
    }
    // console.log(this.cachemap)
}



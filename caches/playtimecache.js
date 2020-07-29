exports.init = function() {
	exports.cachemap = new Map();
}

exports.setCacheValue = (user, value) => {
    this.cachemap.set(user, value)
}

exports.getCacheValue = (user) => {
    return this.cachemap.get(user)
}

exports.addToCacheValue = (user, value)  => {
    if (this.cachemap.has(user)) {
        thing = this.cachemap.get(user)
        this.cachemap.set(user, thing+value)
    } else {
        this.cachemap.set(user, value)
    }
}

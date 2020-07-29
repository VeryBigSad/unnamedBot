exports.init = function() {
    exports.cachemap = new Map();
}

exports.setCacheValue = (user, value, time) => {
    this.cachemap.set(user, [new Duo(value, time)])
}

exports.getCacheValue = (user) => {
    return this.cachemap.get(user)
}

exports.addToCacheValue = (user, value, time)  => {
    if (this.cachemap.has(user)) {
        thing = this.cachemap.get(user)
        var duo = new Duo(value, time)
        thing.push(duo)
        this.cachemap.set(user, thing)
    } else {
        this.setCacheValue(user, value, time)
    }
}

class Duo {
    constructor(key, value){
        this.key = key
        this.value = value
    }
}
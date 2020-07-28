const playtime = require('./playtimecache')
const totallogins = require('./totallogincache')
const textlog = require('./textlogcache')
const database = require('../database')

exports.dumpCache = async() => {
    playtime.cachemap.forEach(async(value, user)=>{
        database.setPlaytime(user, value)
    })
    totallogins.cachemap.forEach(async(value, user)=>{
        database.setTotallogins(user, value)
    })
    textlog.cachemap.forEach(async(value, user)=>{
        database.addTextmessage(user, value.key, value.value)
    })
}

exports.dumpDB = async() => {
    textlog.init()
    playtime.init()
    totallogins.init()
    database.userdata.query('SELECT user,playtime FROM userdata', (err, result) => {
        if(err) throw err
       result.forEach((value)=>{playtime.setCacheValue(value.user, value.playtime)})
    })
    database.userdata.query('SELECT user,totallogins FROM userdata', (err, result) => {
        if(err) throw err
        result.forEach((value)=>{totallogins.setCacheValue(value.user, value.totallogins)})
     })
}
const playtime = require('./playtimecache')
const totallogins = require('./totallogincache')
const textlog = require('./textlogcache')
const database = require('../database')

exports.dumpCache = () => {
    playtime.cachemap.forEach(async(value, user)=>{
        database.setPlaytime(user, value)
    })
    totallogins.cachemap.forEach(async(value, user)=>{
        database.setTotallogins(user, value)
    })
    textlog.cachemap.forEach(async(value, user)=>{
        database.addTextmessage(user, value.key, value.value)
    })
    textlog.init()
    console.log('Dumped all data in the cache to database!')
}

exports.dumpDB = () => {
    textlog.init()
    playtime.init()
    totallogins.init()
    database.userdata.query('SELECT user,playtime,totallogins FROM userdata', (err, result) => {
        if(err) throw err
        result.forEach((value)=>{
            playtime.setCacheValue(value.user, value.playtime)
            totallogins.setCacheValue(value.user, value.totallogins)
        })
    })
    console.log('Dumped all data in the database to cache!')
}
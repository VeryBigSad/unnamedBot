const playtime = require('./playtimecache')
const totallogins = require('./totallogincache')
const textlog = require('./textlogcache')
const database = require('../database')

exports.dumpCache = () => {
    time = Date.now()
    console.log('Started Save task.')
    playtime.cachemap.forEach(async(value, user)=>{
        database.setPlaytime(user, value)
    })
    totallogins.cachemap.forEach(async(value, user)=>{
        database.setTotallogins(user, value)
    })
    textlog.cachemap.forEach(async(value, user)=>{
        time = Date.now()
        value.forEach((result)=>{
            database.addTextmessage(user, result.key, result.value)
        })
    })
    textlog.init()
    yes = Math.floor((Date.now()-time))
    console.log('Save task finished in: ' + (isNaN(yes) ? 'instantly' : (yes + 'ms')))
}

exports.dumpDB = () => {
    time = Date.now()
    console.log('Started database sync task.')
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
    yes = Math.floor((Date.now()-time))
    console.log('Database sync task finished in: ' + (isNaN(yes) ? 'instantly' : (yes + 'ms')))
}
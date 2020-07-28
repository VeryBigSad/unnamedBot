const mineflayer = require('mineflayer');
const Discord = require('discord.js');
const client = new Discord.Client();
const database = require('./database.js');
const textlogcache = require('./caches/textlogcache')
const playtimecache = require('./caches/playtimecache')

cachedPlayers = []

String.prototype.replaceAll = function(str1, str2, ignore) {
	return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
}



client.login('NzMwNDI2OTAyNTU2NDQyNzE0.XwXVGw.PYkexY5vzojr-gpdO96eo0PX-Jw');

function timeToTextAgo(time) {
	months = Math.floor(time / 2592000)
	time %= 2592000;
	days = Math.floor(time / 86400)
	time %= 86400;
	hours = Math.floor(time / 3600);
	time %= 3600;
	minutes = Math.floor(time / 60);
	if (days > 0) {
		text += days + ' day'
		days > 1 ? text+='s ':text+=' '
	}
	if (hours > 0) { 
		text += hours + ' hour'
		hours > 1 ? text+='s ':text+=' '
	}
	if (minutes > 0) { 
		text += minutes + ' minute'
		minutes > 1 ? text+='s ':text+=' '
	}
	if (months >= 1) {
		if (months > 1) {
			return months + " month"
		}
		return months + " months"
	}
	if (days >= 1) {
		if (days > 1) {
			return days + " day"
		}
		return days + " days"
	}
	msg = ''
	if (hours == 1) {
		msg += '1 hour'
	} else if (hours > 1) {
		msg += hours + ' hours'
	}
	if (minutes == 1) {
		msg += hours >= 1 ? '1 minute' : ', 1 minute'
	} else if (minutes > 1) {
		msg += hours >= 1 ? minute + ' minute' : minute + ', 1 minute'
	}
	return msg
}

exports.playtime = function(username, args) {
	return new Promise((later)=>{
		if (args.length >= 1) username = args[0];
		database.getPlaytime(username, (time)=>{
			text = ''

			text += username + "'s playtime is "
			days = Math.floor(time / 86400)
			time %= 86400;
			hours = Math.floor(time / 3600);
			time %= 3600;
			minutes = Math.floor(time / 60);
			if(days > 0) {
				text += days + ' day'
				days > 1 ? text+='s ':text+=' '
			}
			if(hours > 0) {
				text += hours + ' hour'
				hours > 1 ? text+='s ':text+=' '
			}
			if(minutes > 0) {
				text += minutes + ' minute'
				minutes > 1 ? text+='s':text+=''
			}
			if (time == 0) {
				later('I have never seen ' + username + ' before!')
				return
			}
			later(text)
		})
		playtimecache.writeCacheofSpecificUser(username)
	})

}

exports.firstmessage = function(username, args) {
	return new Promise((later)=>{
		if (args.length >= 1) username = args[0];
		database.getFirstmessage(username, (message)=>{
			if (message == '') {
				later(username + ' haven\'t said anything yet!')
				return
			}
			later('"' + message + '" -' + username)
		})	

	})
}

exports.lastSeen = function(username, args) {
	return new Proimise((later)=>{
	if (args.length >= 1) username = args[0];
		database.getLastlogin(username, (time)=>{
			if (time == 0) {
				later('I have never seen ' + username + '!')
				return
			}
			later(username + ' was last online ' + timeToTextAgo(time) + ' ago.')
		})
	})
}

exports.quote = function(username, args) {
	return new Promise((later)=>{
		if (args.length >= 1) username = args[0];
		database.getRandomTextmessage(username, (message)=>{
			if (message === null) {
				later(username + ' haven\'t said anything yet!')
				return
			}
			console.log(message)
			later('"' + message + '" -' + username)
		})
		textlogcache.writeCacheofSpecificUser(username)
	})
}

exports.bindDatabaseShit = function(bot) {
	bot.on('login', ()=>{
		for(player in bot.players) {
			database.checkuser(player.username)
		}
	})
	bot.on('login', async() => {
		console.log(`Logged in as ${client.user.tag}!`);
		setInterval(async function() {
			for(player in bot.players) { 
				playtimecache.updateCache(player, 60)
			}
		}, 60000);
	});

	bot.on('playerJoined', async(player) => {
		database.checkuser(player.username);
		var date = Date.now()
		database.getTotalLogins(player.username, (logins) => {
			if (logins == 0) {
				bot.chat(player.username + ' is new! Welcome to poggop.org!')
			}
			database.addTotalLogins(player.username, 1)
		});
		database.setLastlogin(player.username, date)
	})

	bot.on('chat', async(username, message) => {
		textlogcache.updateCache(username, message)
	})

	bot.on('playerLeft', async(player) => {
		playtimecache.writeCacheofSpecificUser(player)
		textlogcache.writeCacheofSpecificUser(player)
	})
}


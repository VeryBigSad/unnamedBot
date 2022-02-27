const bot = require('./bot.js');
const database = require('./database.js');
const commands = require('./commands.js')




exports.playtime = function(username, args) {
	return new Promise((later) => {
		if (commands.checkIfCommandBanned(exports.playtime)) {
			later('')
		}
		if (args.length >= 1) username = args[0];

		let time = playtimecache.getCacheValue(username)
		if (time === 0) {
			later('I have never seen ' + username + ' before!')
			return
		}
		let text = timeToText(time)
		later(text)

	})

}

exports.firstMessage = function(username, args) {
	return new Promise((later)=>{
		if (commands.checkIfCommandBanned(exports.firstmessage)) {
			later('')
		}
		if (args.length >= 1) username = args[0];
		database.getFirstmessage(username, (message)=>{
			if (message === '') {
				later(username + ' haven\'t said anything yet!')
				return
			}
			later('"' + message + '" -' + username)				
		})
	})
}

exports.lastSeen = function(username, args) {
	return new Promise((later)=>{
		if (commands.checkIfCommandBanned(exports.lastSeen)) {
			later('')
		}
		if (args.length >= 1) {
			username = args[0]
		} else {
			later('Please, do ?seen <username>.')
			return;
		}

		database.getLastlogin(username, (time)=>{
			if (time == 0 || time == undefined) {
				later('I have never seen ' + username + '!')
				return;
			}
			players = Object.keys(bot.bot.players);
			for(i = 0; i < players.length; i++) {
				if (players[i].toLowerCase() == username.toLowerCase()) {
					later(username + ' is online right now!')
					return;
				}
			}
			later(username + ' was last online ' + timeToText(Math.floor((Date.now() - time) / 1000)) + ' ago.')
		})
	})
}

exports.firstlogin = function(username, args) {
	return new Promise((later)=>{
		if (commands.checkIfCommandBanned(exports.firstlogin)) {
			later('')
		}
		if (args.length >= 1) username = args[0]

		database.getFirstlogin(username, (time)=>{
			if (time === 0 || time === null) {
				later('I have never seen ' + username + '!')
				return
			}
			later(username + ' joined the server first ' + timeToText(Math.floor((Date.now() - time)/1000)) + ' ago.')
		})
	})
}

exports.quote = function(username, args) {
	return new Promise((later)=>{
		if (commands.checkIfCommandBanned(exports.quote)) {
			later('')
		}
		if (args.length >= 1) username = args[0];
		database.getRandomTextmessage(username, (message)=>{
			if (message === null) {
				later(username + ' hasn\'t said anything yet!')
				return
			}
			later('"' + message + '" -' + username)
		})

	})
}



const mineflayer = require('mineflayer');
const Discord = require('discord.js');
const client = new Discord.Client();
const data = require('./mysql.js');
const textlog = require('./textlog.js')

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
		text = ''
		if (args.length >= 1) {
			username = args[0];
		}

		data.connection.query('SELECT playtime FROM userdata WHERE user = ?', username, (err, result) => {
			if (err) throw err
			if (!result[0]) {
				return "Cannot find " + username + " in the database."
			}
			let time = result[0].playtime
			text += username + "'s playtime is "
			days = Math.floor(time / 86400)
			time %= 86400;
			hours = Math.floor(time / 3600);
			time %= 3600;
			minutes = Math.floor(time / 60);
			if(days > 0){ 
				text += days + ' day'
				days > 1 ? text+='s ':text+=' '
			}
			if(hours > 0){ 
				text += hours + ' hour'
				hours > 1 ? text+='s ':text+=' '
			}
			if(minutes > 0){ 
				text += minutes + ' minute'
				minutes > 1 ? text+='s':text+=''
			}

			later(username + "'s playtime is " + text)
		});
	})

}

exports.firstmessage = function(username, args) {
	return new Promse((later)=>{
		if (args.length >= 1) username = args[0];

		data.connection.query('SELECT firstmessage FROM userdata WHERE user = ?', username, (err, result) => {
			if (err) throw err
			if (!result[0]) {
				later("Cannot find " + username + " in the database.")
				return
			}
			if (result[0].firstmessage == '' || result[0].firstmessage == 0) {
				later(username + " hasn't said anything yet" )
				return
			} 
			later(username + "'s first message was: '" + result[0].firstmessage + "'")
		});
	})
}

exports.lastSeen = function(username, args) {
	return new Proimise((later)=>{
		if (args.length >= 1) username = args[0];
		
		data.connection.query('SELECT lastlogin FROM userdata WHERE user = ?', username, (err, result) => {
			if (err) throw err
			if (!result[0]) {
				later("Cannot find " + username + " in the database.")
				return
			}

			if (result[0].lastlogin < 10) {
				var date = Date.now()
				data.setLastlogin(username, date)
			}

			var date = new Date(result[0].lastlogin);
			var utc = new Date(Date.UTC(new Date(result[0].lastlogin).utc))
			later(username + " was last seen " + timeToTextAgo(Date.now() - result[0].lastlogin) + " ago.")
		 
		 });
	})
}

exports.quote = function(username, args) {
	return new Proimise((later)=>{
		if (args.length >= 1) username = args[0];
		textlog.connection.query('SELECT * FROM _' + username, (err, result) => {
			if (err || !result) {
				later('Cannot find ' + username + ' in the database.')
				return
			}
			count = 0
			for(row in result) {
				count++;
			}

			rand = Math.floor(Math.random() * count);
			quote = result[rand]
			if (!quote) {
				later('That player hasn\'t said anything yet!')
				return;
			}
			later('"' + result[rand].text + '" -' + username)
		});
	}
}

exports.bindDatabaseShit = function(bot) {
	bot.on('login', async() => {
		console.log(`Logged in as ${client.user.tag}!`);
		setInterval(async function() {
			for(player in bot.players) { 
				data.incplayertime(player, 1)
			}
		}, 1000);
	});

	bot.on('chat', (username)=>{
		data.createuser(player.username)
	})

	bot.on('playerJoined', async(player) => {
		data.createuser(player.username)
		var date = Date.now()
		data.setLastlogin(player.username, date)
		data.connection.query('SELECT totallogins FROM userdata WHERE user = ?', player.username, (err, result) => {
			if (err) throw err
			if (!result[0]) {
				setTotalLogins(player.username, 1)
				bot.sendMessage(player.username + ' is new! Welcome to poggop.org!')
			}
			data.setTotalLogins(player.username, result[0].totallogins + 1)
		});
		data.connection.query('SELECT playtime FROM userdata WHERE user = ?', player.username, (err, result) => {if (err) throw err; if (!result[0]) bot.chat(player.username + " is a new player!")})
	})
}


const mineflayer = require('mineflayer');
const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request')
const data = require('./mysql.js');
const textlog = require('./textlog.js')
var testCMD = require('./pog alliance/modules/test');
var helpCMD = require('./pog alliance/modules/help.js');
var pogAUTO = require('./pog alliance/modules/pog.js');
var discordCMD = require('./pog alliance/modules/discord.js');
var tipCMD = require('./pog alliance/modules/tip.js');
cachedPlayers = []

String.prototype.replaceAll = function(str1, str2, ignore) {
	return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
}

bot.on('login', async() => {
		console.log(`Logged in as ${client.user.tag}!`);
		setInterval(async function() {
			for(player in bot.players) { 
				data.incplayertime(player, 1)
			}
		 }, 1000);
	}); 

client.login('NzMwNDI2OTAyNTU2NDQyNzE0.XwXVGw.PYkexY5vzojr-gpdO96eo0PX-Jw');

function playtime(username, args) {
	text = ''
	if (args.length >= 1) {
		username = args[0];
	}

	console.log(user)
	data.connection.query('SELECT playtime FROM userdata WHERE user = ?', user, (err, result) => {
		if (err) throw err
		if (!result[0]) {
			return "Cannot find " + username + " in the database."
			return
		}
		let time = result[0].playtime
		text += user + "'s playtime is "
		days = Math.floor(time / 86400)
		time %= 86400;
		hours = Math.floor(time / 3600);
		time %= 3600;
		minutes = Math.floor(time / 60);
		seconds = time % 60;
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

		bot.chat(text)
	});

}

bot.on('chat', async function(username, message) {
	if ((!message.startsWith('!') || !message.startsWith('?') && message.length > 3)) {
		textlog.addtextmessage(username, message)
	}
	if (username == bot.username) return
	

	var args = message.split(' ')
	var command = args[0]
	if (command.startsWith('!playtime') || command.startsWith('!pt-backup') && username == 'Nowilltolife') {

			text = ''
			if (args.length === 1)user = username;
			if (args.length >= 2) user = args[1];
			console.log(user)
			data.connection.query('SELECT playtime FROM userdata WHERE user = ?', user, (err, result) => {
				if (err) throw err
				if (!result[0]) {
					return "Cannot find " + args[1] + " in the database."
					return
				}
				let time = result[0].playtime
				text += user + "'s playtime is "
				days = Math.floor(time / 86400)
				time %= 86400;
				hours = Math.floor(time / 3600);
				time %= 3600;
				minutes = Math.floor(time / 60);
				seconds = time % 60;
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

				bot.chat(text)
			});
			} else if (command.startsWith('!joins-backup')) {
				 
				if (args.length === 1)user = username;
				if (args.length >= 2) user = args[1];
				data.connection.query('SELECT totallogins FROM userdata WHERE user = ?', user, (err, result) => {
					if (err) throw err
					if (!result[0]) {
						bot.chat("Cannot find " + args[1] + " in the database.")
						return
					}
					bot.chat(user + "'s total logins are " + result[0].totallogins)
				 });
			} else if (command.startsWith('!seen-backup')) {
				 
				if (args.length === 1)user = username;
				if (args.length >= 2) user = args[1];
				data.connection.query('SELECT lastlogin FROM userdata WHERE user = ?', user, (err, result) => {
					if (err) throw err
					if (!result[0]) {
						bot.chat("Cannot find " + args[1] + " in the database.")
						return
					}
					if (result[0].lastlogin < 10) {
						var date = Date.now()
						data.setLastlogin(user, date)
					} 
					var date = new Date(result[0].lastlogin);
					var utc = new Date(Date.UTC(new Date(result[0].lastlogin).utc))
					bot.chat(user + "'s last login was " + new Date(result[0].lastlogin).toUTCString())
				 });
			} else if (command.startsWith('!firstmessage-backup') || command.startsWith('!fm-backup')) {
				 
				if (args.length === 1)user = username;
				if (args.length >= 2) user = args[1];
				data.connection.query('SELECT firstmessage FROM userdata WHERE user = ?', user, (err, result) => {
					if (err) throw err
					if (!result[0]) {
						bot.chat("Cannot find " + args[1] + " in the database.")
						return
					}
					if (result[0].firstmessage == '' || result[0].firstmessage == 0) {
						bot.chat(user + " hasn't said anything yet" )
						return
					} 
					bot.chat(user + "'s first message was: '" + result[0].firstmessage + "'")
				 });
			} else if (command.startsWith('!quote') || command.startsWith('!qt')) {
				if (args.length === 1)user = username;
				if (args.length >= 2) user = args[1];
				textlog.connection.query('SELECT * FROM _'+user, (err, result) => {
					if (err) throw err
					if (!result) {
						bot.chat('Cannot find ' + user + ' in the database.')
						return
					}
					count = 0
					for(row in result) {
						count++;
					}
					rand = Math.floor((Math.random() * count) + 1);
					if (!result[rand]) {
						bot.chat('That user hasnt said anything yet')
						return;
					}
					bot.chat("'" + result[rand].text + "' -" + user)
				 });
			}
	});

bot.on('playerJoined', async(player) => {
	data.createuser(player.username)
	var date = Date.now()
	 data.setLastlogin(player.username, date)
	 data.connection.query('SELECT totallogins FROM userdata WHERE user = ?', player.username, (err, result) => {
		if (err) throw err
		if (!result[0]) setTotalLogins(player.username, 1)
	 data.setTotalLogins(player.username, result[0].totallogins + 1)
	 });
	 data.connection.query('SELECT playtime FROM userdata WHERE user = ?', player.username, (err, result) => {if (err) throw err; if (!result[0]) bot.chat( player.username + " is a new player")})
})


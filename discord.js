const Discord = require('discord.js');
const bot = require('./bot.js');
const client = new Discord.Client();
const cache = require('./caches/cachemanager.js')
const database = require('./database.js')
const dbCommands = require('./databaseCommands.js')
const ingame_channel_webhook = new Discord.WebhookClient('732684871914487888', 'oQ77KSVLsMCwbHnq-UlH5eYaUkteuYfghWXCxi74qqSAn6sisCnPG3V0bJvIu6fLTAkS');
// const ingamechat =;

// this.sendMessage = exports.sendMessage
// this.sendMessage = exports.sendMessage;

exports.sendMessage = function(text) {
	if (client.channels.cache.get('732683858885214272') === undefined) {
		client.channels.fetch('732683858885214272')
	} else {
		client.channels.cache.get('732683858885214272').send(text)
	}
	
}

sendMessage = exports.sendMessage

exports.bindDiscord = function(bot) {
	bot.on('message', function(jsonMsg) {
		message = String(jsonMsg);
		lastTimeMessage = Date.now();
		username = message.slice(0, message.indexOf(':'));
		text = message.slice(message.indexOf(':') + 2);


		time = new Date();
		if (message.includes('@')) {
			sendMessage('\`There was a message here, but it wasn\'t sent because it contained "@"\`');
		} else {
			message = message.replace(new RegExp('discord.gg/'.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'), 'gi'), '(discord link)');
			if (message == 'From ' + bot.username + ': connection test' || message == 'To ' + bot.username + ': connection test') {
				return
			}
			if (message !== undefined) {
				sendMessage(message);				
			}
		}
	})
}



client.on('message', msg => {
	if (msg.author.bot || msg.channel.name != 'ingame-chat') return;

	// TODO: check if the user is not banned

	if (msg.content.startsWith('!')) {
		// a command
		setTimeout(()=>{discordCommandHandler(msg.content.slice(1))}, 0)
		return
	}


	if (msg.content.includes('§')) {
		sendMessage('This message contains restricted symbol (§)')
	} else if (msg.content.includes('\n')) {
		sendMessage('You can\'t send multi-line messages!')
	} else if (msg.content.length >= 255) { 
		sendMessage('This message is too long!')
	} else {
		if (msg.content.startsWith('!raw')) {
			if (msg.member.roles.cache.some(r => r.name === 'bot developer') || msg.member.roles.cache.some(r => r.name === 'trusted')) {
				bot.sendMessage(msg.content.slice(4).replace(/^\s+|\s+$/g, ''));
			} else {
				sendMessage('You don\'t have enough perms to do that!');
			}
		} else if (msg.content.startsWith('!players')) {
			players = bot.getPlayers();
			playersStr = '';
			size = 0;
			keys = Object.keys(players);
			for (i = 0; i < keys.length; i++) {
				size += 1;
				playersStr += players[keys[i]].username + ', ';
			}
			msg = 'There are ' + size + ' players online, list of them: ' + playersStr;
			sendMessage(msg.slice(0, msg.length - 3));
		} else if(msg.content.startsWith('!save')) {
			if(msg.member.roles.cache.some(r => r.name === 'bot developer')){
				msg.channel.send('Attempted manual save')
				cache.dumpCache()
				msg.channel.send('Send save request this takes around 10 seconds to save')
			}else {
				msg.channel.send('You don\'t have enough perms to do that!');
			}
		} else if(msg.content.startsWith('!usercount')) {
				if(msg.member.roles.cache.some(r => r.name === 'bot developer')){
					database.userdata.query('SELECT * FROM userdata', (err, result)=> {
						count = 0
						for(row in result)
							count++
						msg.channel.send('The database has currently ' + count + ' registered users')	
					})
				}else {
					msg.channel.send('You don\'t have enough perms to do that!');
				}	
		} else {
			bot.sendMessage('[' + (msg.member.roles.cache.has('731327156453507074') ? 'MEMBER' : (msg.member.roles.cache.has('732573982909530113') ? 'COOL' : (msg.member.roles.cache.has('739459055638282253') ? 'RETIRED' : 'NON'))) + '] ' + ' [' + msg.author.username + '] ' + msg.content);		
		}
	}

});


function discordCommandHandler(command) {
	args = command.split(" ")
	command = args[0]
	args = args.slice(1)
	if (args.length <= 0) {
		sendMessage('Specify the username!')
		return
	}
	username = args[0]

	if (command == 'fact') {
		return commands.randomFact();
	} else if (command == 'help') {
		"You can see all the discord commands in #commands!"
	} else if (command == 'pt' || command == 'playtime') {
		dbCommands.playtime(username, []).then((msg)=>{sendMessage(msg)})
		return null;
	} else if (command == 'qt' || command == 'quote') {
		dbCommands.quote(username, []).then((msg)=>{sendMessage(msg)})
		return null;
	} else if (command == 'seen') {
		dbCommands.lastSeen(username, []).then((msg)=>{sendMessage(msg)})
		return null;
	} else if (command == 'fm' || command == 'firstmessage') {
		dbCommands.firstmessage(username, []).then((msg)=>{sendMessage(msg)})
		return null;
	} else if (command == 'firstlogin' || command == 'joindate' ||command == 'jd') {
		dbCommands.firstlogin(username, []).then((msg)=>{sendMessage(msg)})
		return null;
	}

}


client.login('NzMyNjgxNDY4MjE1ODIwMzQ5.Xw4Jvw.JskD45xytRaX7lDpSehZWaguOXA');


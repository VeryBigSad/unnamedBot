const Discord = require('discord.js');
const bot = require('./bot.js');
const client = new Discord.Client();
const cache = require('./caches/cachemanager')
const database = require('./database')
const ingamechat = new Discord.WebhookClient('732684871914487888', 'oQ77KSVLsMCwbHnq-UlH5eYaUkteuYfghWXCxi74qqSAn6sisCnPG3V0bJvIu6fLTAkS');

exports.sendMessage = function(text) {
	if (!text.match(/UnnamedGroup:\ \[[a-zA-Z0-9]{3,40}\]\ {0,}/g)) {

	}
	ingamechat.send(String(text));
}

var lastMessage = ''
exports.bindDiscord = function(bot) {
	bot.on('message', function(jsonMsg) {
		message = String(jsonMsg);
		lastTimeMessage = Date.now();
		username = message.slice(0, message.indexOf(':'));
		text = message.slice(message.indexOf(':') + 2);


		time = new Date();
		if (message.includes('@')) {
			exports.sendMessage('\`There was a message here, but it wasn\'t sent because it contained "@"\`');
		} else {
			message = message.replace(new RegExp('discord.gg/'.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'), 'gi'), '(discord link)');
			if (message == 'From ' + bot.username + ': connection test' || message == 'To ' + bot.username + ': connection test') {
				return
			}
			exports.sendMessage(message);
		}
	})
}
client.on('message', msg => {
	if (msg.author.bot || msg.channel.name != 'ingame-chat') {
		return;
	}

	if (msg.content.includes('§')) {
		ingamechat.send('This message contains restricted symbol (§)')
	} else if (msg.content.includes('\n')) {
		ingamechat.send('You can\'t send multi-line messages!')
	} else if (msg.content.length >= 255) { 
		ingamechat.send('This message is too long!')
	} else {
		if (msg.content.startsWith('!raw')) {
			if (msg.member.roles.cache.has('731327156453507074')) {
				bot.sendMessage(msg.content.slice(4).replace(/^\s+|\s+$/g, ''));
				lastMessage = msg.content;
			} else {
				ingamechat.send('You don\'t have enough perms to do that!');
			}
		} else if (msg.content.startsWith('!players')) {
			players = bot.getPlayers();
			console.log(typeof(players));
			playersStr = '';
			size = 0;
			keys = Object.keys(players);
			console.log(keys);
			console.log(players);
			for (i = 0; i < keys.length; i++) {
				size += 1;
				playersStr += players[keys[i]].username + ', ';
			}
			msg = 'There are ' + size + ' players online, list of them: ' + playersStr;
			ingamechat.send(msg.slice(0, msg.length - 3));
		}else if(msg.content.startsWith('!save')) {
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
			bot.sendMessage('[' + (msg.member.roles.cache.has('731327156453507074') ? 'MEMBER' : (msg.member.roles.cache.has('732573982909530113') ? 'COOL' : 'NON')) + '] ' + ' [' + msg.author.username + '] ' + msg.content);		
			lastMessage = msg.content;
		}
	}

});


client.login('NzMyNjgxNDY4MjE1ODIwMzQ5.Xw4Jvw.JskD45xytRaX7lDpSehZWaguOXA');


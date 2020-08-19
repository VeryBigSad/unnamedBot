const Discord = require('discord.js');
const bot = require('./bot.js');
const client = new Discord.Client();
const cache = require('./caches/cachemanager.js')
const database = require('./database.js')
// also import string.prototype.replaceAll()
const dbCommands = require('./databaseCommands.js')

const ingame_channel_webhook = new Discord.WebhookClient('732684871914487888', 'oQ77KSVLsMCwbHnq-UlH5eYaUkteuYfghWXCxi74qqSAn6sisCnPG3V0bJvIu6fLTAkS');

// const ingamechat =;

// this.sendMessage = exports.sendMessage
// this.sendMessage = exports.sendMessage;

exports.sendMessage = function(text) {
	if (text === null) {
		return
	}

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
		message = message.replace(new RegExp('@', 'gi'), '("at" symbol)')
		message = message.replace(new RegExp('discord.gg/'.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'), 'gi'), '(discord link)');
		// if (message == 'From ' + bot.username + ': connection test' || message == 'To ' + bot.username + ': connection test') {
		// 	return
		// }
		if (message !== undefined) {
			new_msg = ''
			for (i = 0; i < message.length; i++) {
				if (message[i] == '_' || message[i] == '*' || message[i] == '`' || message[i] == '~' || message[i] == '>') {
					new_msg += '\\'
				}
				new_msg += message[i]
			}
			sendMessage(new_msg);			
		}
	})
}



client.on('message', msg => {
	if (msg.author.bot || msg.channel.name != 'ingame-chat') return;

	// TODO: check if the user is not banned

	if (msg.content.startsWith('?')) {
		// command
		setTimeout(()=>{sendMessage(discordCommandHandler(msg.member, msg.content.slice(1)))}, 0)
		return
	}


	if (msg.content.includes('§')) {
		sendMessage('This message contains restricted symbol (§)')
		return
	}
	msg_content_with_mentions = parseMentionsInMessage(msg.content)
	bot.sendMessage('[' + (msg.member.roles.cache.has('731327156453507074') ? 'MEMBER' : (msg.member.roles.cache.has('732573982909530113') ? 'COOL' : (msg.member.roles.cache.has('739459055638282253') ? 'RETIRED' : (msg.member.roles.cache.has('737988985158107146') ? 'BOT DEV' : 'NON')))) + '] ' + ' [' + msg.author.username + '] ' + msg_content_with_mentions);
});

function parseMentionsInMessage(message) {

	// const matches = mention.match(/^<@!?(\d+)>$/g)
	// console.log(matches)
	// matches.replaceAll(mention=>{
	// 	replace
	// })

	//TODO: from "hello <@2348579283450237>" it should return "hello @Username"
	return message
}


function discordCommandHandler(sender, command) {
	args = command.split(" ")
	command = args[0]
	args = args.slice(1)


	if (command == 'fact') {
		return commands.randomFact();
	} else if (command == 'help') {
		return "You can see all the discord commands in " + client.channels.cache.get('745387988204388412').toString() + "!"
	} else if (command == 'players' || command == 'pl') {
		players = bot.getPlayers();
		playersStr = '';
		size = 0;
		keys = Object.keys(players);
		for (i = 0; i < keys.length; i++) {
			size += 1;
			playersStr += players[keys[i]].username + ', ';
		}
		msg = 'There are ' + size + ' players online: ' + playersStr;
		return msg.slice(0, msg.length - 2);
	} else if (command == 'raw') {
		// should be exact
		if (hasPerms(sender, ['bot developer', 'Trusted'])) {
			return msg.content.slice(4).replace(/^\s+|\s+$/g, '')
		} else {
			return "You don't have enough perms to execute ?" + command + "!"
		}
	} else if (command == 'save') {
		if (hasPerms(sender, ['bot developer'])) {
			sendMessage('Started saving..')
			cache.dumpCache()
			sendMessage('Done!')
			return null
		} else {
			return "You don't have enough perms to execute ?" + command + "!"
		}
	} else if (command == 'usercount') {
		if (hasPerms(sender, ['bot developer'])) {
			database.userdata.query('SELECT * FROM userdata', (err, result)=> {
				count = 0
				for(row in result)
					count++
				sendMessage('The database has currently ' + count + ' registered users')	
			})
			return null
		} else {
			return "You don't have enough perms to execute ?" + command + "!"
		}
	}

	// here go commands with arguments
	if (args.length == 0) {
		return "There is no such command as ?" + command + "! If there is, try doing ?" + command + " <player>."
	}

	username = args[0]
	if (command == 'pt' || command == 'playtime') {
		dbCommands.playtime(username, [username]).then((msg)=>{sendMessage(msg)})
		return null
	} else if (command == 'qt' || command == 'quote') {
		dbCommands.quote(username, [username]).then((msg)=>{sendMessage(msg)})
		return null
	} else if (command == 'seen') {
		dbCommands.lastSeen(username, [username]).then((msg)=>{sendMessage(msg)})
		return null
	} else if (command == 'fm' || command == 'firstmessage') {
		dbCommands.firstmessage(username, [username]).then((msg)=>{sendMessage(msg)})
		return null
	} else if (command == 'firstlogin' || command == 'joindate' ||command == 'jd') {
		dbCommands.firstlogin(username, [username]).then((msg)=>{sendMessage(msg)})
		return null
	} else if (command == 'ping') {
		sendMessage(commands.pingCommand(username, [username]))
		return null
	}

}

// returns if you have any of these permissions
function hasPerms(member, good_roles) {
	return member.roles.cache.some(r => good_roles.cotains(r.name))
}

client.login('NzMyNjgxNDY4MjE1ODIwMzQ5.Xw4Jvw.JskD45xytRaX7lDpSehZWaguOXA');


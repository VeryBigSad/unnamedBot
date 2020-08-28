const commands = require('./commands.js')
const database = require('./database.js')
const textlog = require('./caches/textlogcache.js')
const dbCommands = require('./databaseCommands.js')

nwordcounter = {};
whispers = {};

exports.commandHandler = function(username, message) {
	return new Promise((resolve => {
		message = message.slice(1).split(' ');
		let command = message[0].toLowerCase();
		message.shift()
		let args = message;


		if (command === 'h' || command === 'help') {
			resolve(commands.helpCommand(username, args));
		} else if (command === 'report' || command === 'wdr' || command === 'chatreport') {
			resolve(commands.reportCommand(username, args));
		} else if (command === 'ping') {
			resolve(commands.pingCommand(username, args))
		} else if (command === 'discord' || command === 'd') {
			resolve(commands.discordCommand(username, args));
		} else if (command === 'nwordcount') {
			resolve("Command currently disabled")
		} else if (command === 'fact') {
			commands.randomFact().then(msg=>{resolve(msg)})
			return null;
		} else if (command === 'help') {
			resolve(commands.helpCommand())
		} else if (command === 'pt' || command === 'playtime') {
			dbCommands.playtime(username, args).then((msg)=>{resolve(msg)})
			return null;
		} else if (command === 'qt' || command === 'quote') {
			dbCommands.quote(username, args).then((msg)=>{resolve(msg)})
			return null;
		} else if (command === 'seen') {
			dbCommands.lastSeen(username, args).then((msg)=>{resolve(msg)})
			return null;
		} else if (command === 'fm' || command === 'firstmessage') {
			dbCommands.firstmessage(username, args).then((msg)=>{resolve(msg)})
			return null;
		} else if (command === 'firstlogin' || command === 'joindate' ||command === 'jd') {
			dbCommands.firstlogin(username, args).then((msg)=>{resolve(msg)})
			return null;
		} else if (command === 'neko') {
			commands.nekoCommand(username, args).then((msg)=>{resolve(msg)})
		}

		return null;
	}))

};


exports.messageHandler = function(username, message) {
	if ((!message.startsWith('!') || !message.startsWith('?') && message.length > 3)) {
		database.getFirstmessage(username, (message2)=>{
			if (message2 === '' || message2 === null || message2 === undefined || message2 === "0" || message2 === 0) {
				database.setFirstmessage(username, message.replace(/[^\x00-\x7F]/g, ""))
			}
		})
		textlog.addToCacheValue(username, message.replace(/[^\x00-\x7F]/g, ""), Date.now())
	}

};

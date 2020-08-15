const commands = require('./commands.js');
const fs = require('fs');
const database = require('./database.js');
const textlog = require('./caches/textlogcache.js')
const bot = require('./bot.js');
const dbCommands = require('./databaseCommands.js');
const config = require('./config.json')

nwordcounter = {};
whispers = {};

exports.commandHandler = function(username, message) {
	if (message == config.prefix) {
		return null;
	}
	message = message.slice(1).split(' ');
	command = message[0].toLowerCase();
	args = message.shift();
	args = message;


	if (command == 'h' || command == 'help') {
		return commands.helpCommand(username, args);
	} else if (command == 'report' || command == 'wdr' || command == 'chatreport') {
		return commands.reportCommand(username, args);
	} else if(command == 'ping') {
		return commands.pingCommand(username, args)	
	} else if (command == 'discord' || command == 'd') {
		return commands.discordCommand(username, args);
	} else if (command == 'nwordcount') {
		return "Command currently disabled"
	} else if (command == 'fact') {
		return commands.randomFact();
	} else if (command == 'crash') {
		throw Exception;
	} else if (command == 'pt' || command == 'playtime') {
		dbCommands.playtime(username, args).then((msg)=>{bot.sendMessage(msg)})
		return null;
	} else if (command == 'qt' || command == 'quote') {
		dbCommands.quote(username, args).then((msg)=>{bot.sendMessage(msg)})
		return null;
	} else if (command == 'seen') {
		dbCommands.lastSeen(username, args).then((msg)=>{bot.sendMessage(msg)})
		return null;
	} else if (command == 'fm' || command == 'firstmessage') {
		dbCommands.firstmessage(username, args).then((msg)=>{bot.sendMessage(msg)})
		return null;
	} else if(command == 'fl' ||command == 'firstlogin' || command == 'joindate' ||command == 'jd') {
		dbCommands.firstlogin(username, args).then((msg)=>{bot.sendMessage(msg)})
		return null;
	}

};


exports.messageHandler = function(username, message) {
	if (nwordcounter[username] == null) {
		nwordcounter[username] = 0;
	}

	if ((!message.startsWith('!') || !message.startsWith('?') && message.length > 3)) {
		database.getFirstmessage(username, (message2)=>{
			if (message2 == '' || message2 == null || message2 == undefined || message2 == "0" || message2 == 0) {
				database.setFirstmessage(username, message.replace(/[^\x00-\x7F]/g, ""))
			}
		})
		textlog.addToCacheValue(username, message.replace(/[^\x00-\x7F]/g, ""), Date.now())
	}

};

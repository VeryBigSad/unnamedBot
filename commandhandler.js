const commands = require('./commands.js');
const fs = require('fs');
const database = require('./database.js');
const textlog = require('./caches/textlogcache.js')
const bot = require('./bot.js');
const dbCommands = require('./databaseCommands.js')

nwordcounter = {};
whispers = {};


exports.getCounter = function() {
	return nwordcounter;
}

exports.setCounter = function() {
	// fs.readFile('C:/users/khrom/desktop/nwordcounter.txt', 'utf8', function (err, data) {
	// 	data = data.split(';');
	// 	data.forEach(function(item, index){
	// 		data[index] = data[index].split(':');
	// 	})
	// 	for(i=0; i < data.lenth; i++) {
	// 		data[i] = data[i].split(':');
	// 	}
		
	// 	nwordcounter = data;
	// });

}

exports.commandHandler = function(username, message) {
	if (message == '?') {
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
	} else if (command == 'discord' || command == 'd') {
		return commands.discordCommand(username, args);
	} else if (command == 'nwordcount') {
		return commands.nwordCommand(username, args);
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
	} else {
		return 'there are no such command'
	}

};


exports.messageHandler = function(username, message) {
	if (nwordcounter[username] == null) {
		nwordcounter[username] = 0;
	}

	if ((!message.startsWith('!') || !message.startsWith('?') && message.length > 3)) {
		database.getFirstmessage(username, (message2)=>{
			if (message2 == '' || message2 == null || message2 == undefined ||message2 == "0" || message2 == 0) {
				database.setFirstmessage(username, message.replace(/[^\x00-\x7F]/g, ""))
			}
		})
		textlog.addToCacheValue(username, message.replace(/[^\x00-\x7F]/g, ""), Date.now())
	}

	// todo: database
	nwordcounter[username] += (message.match(/nigg/gi) || []).length;
	keys = Object.keys(nwordcounter);
	nwordcounterString = '';
	for (i = 0; i < keys.length; i++) {
		nwordcounterString += keys[i] + ':' + nwordcounter[keys[i]] + ';';
	}

	fs.writeFile('nwordcounter.txt', nwordcounterString, function (err) {});

};

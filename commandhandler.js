var commands = require('./commands.js');
var fs = require('fs');


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
	} else {
		return 'there are no such command'
	}

};


exports.handleMessage = function(username, message) {
	if (nwordcounter[username] == null) {
		nwordcounter[username] = 0;
	}
	nwordcounter[username] += (message.match(/nigg/gi) || []).length;
	keys = Object.keys(nwordcounter);
	nwordcounterString = '';
	for (i = 0; i < keys.length; i++) {
		nwordcounterString += keys[i] + ':' + nwordcounter[keys[i]] + ';';
	}

	fs.writeFile('nwordcounter.txt', nwordcounterString, function (err) {});

};


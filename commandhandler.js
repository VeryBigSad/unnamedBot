const command_objects = require('./commands/')
const database = require('./database.js')
const dbCommands = require('./databaseCommands.js')


exports.commandHandler = function(username, message, callback) {
	message = message.slice(1).split(' ');
	let command = message[0].toLowerCase();
	message.shift();
	let args = message;

	for (const el in command_objects) {
		let obj = command_objects[el]
		if (obj.command_name.includes(command)) {
			obj.call(username, args, callback);
			break;
		}
	}

	return;

	// this is it.
	// I'll delete everything below once copying commands to /commands/ folder is finished

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
		} else if (command === 'neko') {
			commands.nekoCommand(username, args).then((msg)=>{resolve(msg)})
		} else if (command === 'fact') {
			commands.randomFact().then(msg=>{resolve(msg)})
		} else if (command === 'help') {
			resolve(commands.helpCommand())
		} else if (command === 'pt' || command === 'playtime') {
			dbCommands.playtime(username, args).then((msg)=>{resolve(msg)})
		} else if (command === 'qt' || command === 'quote') {
			dbCommands.quote(username, args).then((msg)=>{resolve(msg)})
		} else if (command === 'seen') {
			dbCommands.lastSeen(username, args).then((msg)=>{resolve(msg)})
		} else if (command === 'fm' || command === 'firstmessage') {
			dbCommands.firstmessage(username, args).then((msg)=>{resolve(msg)})
		} else if (command === 'firstlogin' || command === 'joindate' ||command === 'jd') {
			dbCommands.firstlogin(username, args).then((msg)=>{resolve(msg)})
		}

		return null;
	}))

};


exports.messageHandler = function(username, message) {
	database.addTextMessage(username, message, Date.now() / 1000)
};

const command_objects = require('./commands/')
const custom_commands = require('./commands.json')
const database = require('./database.js')

exports.commandHandler = function(username, message, callback) {
	message = message.slice(1).split(' ');
	let command = message[0].toLowerCase();
	message.shift();
	let args = message;
	// check if it's a command in /commands/ folder
	for (const el in command_objects) {
		let obj = command_objects[el]
		if (obj.command_name.includes(command)) {
			obj.call(username, args, callback);
			break;
		}
	}
	// maybe command is not there, and in the commands.json file instead
	for (const el in custom_commands) {
		let obj = custom_commands[el]
		if (obj.command_name.includes(command)) {
			callback(obj.call)
		}
	}
	// it's not there. ignore it
};


exports.messageHandler = function(username, message) {
	database.addTextMessage(username, message, Date.now() / 1000)
};

const cmdhandler = require('./commandhandler.js');
const sync = require('sync-request');


exports.welcomeMessage = 'Hi! I\'m a property of an unnamed group. Use ?help to find out about what I can do!';

exports.helpCommand = function(username, args) {
	return '/msg ' + username + ' ?help - this command; ?report - report a player; ?discord - Unnamed group\'s discord; ?quote - random quote of someone; ?playtime - playtime of someone\n' +
		   '?fact - random fact; ?firstmessage - first message of someone; ?seen - when person had been seen last time';
};

exports.reportCommand = function(username, args) {
	if (args.length < 2) {
		return 'Please, do ?report <name> <reason>'
	}
	return 'Reported ' + args[0] + ' for ' + args.slice(1).join(' ') + '! Staff will review this ASAP.'
};

exports.discordCommand = function(username, args) {
	return 'Join official discord of unnamed group! https://discord.gg/ZXvVQtg'
}; 	


exports.nwordCommand = function(username, args) {
	player = username;
	if (args.length >= 1) {
		player = args[0];
		if (cmdhandler.getCounter()[player] == null) {
 			return 'Can\'t find ' + player + '!';
 		}
	}
	console.log(cmdhandler.getCounter())
	if (cmdhandler.getCounter()[player] == null) {
		return 'You haven\'t said the nword yet!';
	}

	return player + ' had said the N word ' + cmdhandler.getCounter()[player] + ' times!'
}; 	
var tmp;


exports.randomFact = function() {
	resp = sync('GET', 'https://uselessfacts.jsph.pl/random.json?language=en');
    return 'Random fact: ' + JSON.parse(resp.getBody('utf8')).text;
}

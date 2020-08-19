const cmdhandler = require('./commandhandler.js');
const sync = require('sync-request');
const bot = require('./bot')
const config = require('./config.json')


exports.welcomeMessage = 'Hi! I\'m a property of an unnamed group. Use ?help to find out about what I can do!';

exports.helpCommand = function(username, args) {
	return "?discord - discord server; ?quote - your random quote, ?playtime - your playtime, ?jd - joindate; ?fm - your first message, ?seen <player> - when a player was last seen. More commands in discord: " + config.spammer.discord_bot_link
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

exports.pingCommand = function(username, args) {
	if (args.length >= 1) username = args[0];
	var players =  bot.getPlayers()
	for(player in players){
	if(player === username) {
		return 'Ping of ' + username + ' is ' + players[player].ping
	} 
	}
	return "Cant't find user on the server"
}


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

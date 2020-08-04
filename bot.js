const database = require('./database.js')
const cacheManager = require('./caches/cachemanager.js')
const bindManager = require('./bindManager.js');

const Discord = require('./discord.js');

const mineflayer = require('mineflayer');
const pathfinder = require('mineflayer-pathfinder').pathfinder
const gameplay = require('./prismarine-gameplay').gameplay


if (process.argv.length < 3 || process.argv.length > 6) {
    console.log("Usage: node bot.js <host> <port> [<name>] [<password>]");
    process.exit(1);
}
options = {
		username: process.argv[4] ? process.argv[4] : "treeFucker",
		verbose: true,
		port: parseInt(process.argv[3]),
		host: process.argv[2],
		password: process.argv[5],
		version: "1.12.2",
		checkTimeoutInterval: 99999
}


exports.allowedToRelog = true
exports.relog=(log=true)=>{
	if(this.allowedToRelog) {
		this.allowedToRelog = false
		if (log) {
			Discord.sendMessage('\`Reconnecting!\`');
			console.log("Attempting to reconnect...");		
		}
		bot = mineflayer.createBot(options);
		exports.bot = bot;
		exports.sendMessage = (message)=> {
			this.bot.chat(message);
		}
		Discord.bindDiscord(this.bot)
		bindManager.bind(bot);
		this.waitforrelog();
	}
}

lastTimeUsed = 0;
lastTimeMessage = 0;

process.on('uncaughtException', function(err) {
	console.log(err);
	Discord.sendMessage(`Bot has encountered an error: ` + String(err));
});

process.on('exit', function(code) {
	cacheManager.dumpCache();
	console.log(code);
	Discord.sendMessage(`<@!437208440578768908> Bot is actually down now`);
});

process.on('SIGINT', function(code) {
	cacheManager.dumpCache();
	Discord.sendMessage(`Exiting, because someone connected to the machine and stopped the bot.`);
	process.exit(1)
})

function bindGameplay(bot) {
	bot.loadPlugin(pathfinder);
	bot.loadPlugin(gameplay);
}


exports.sendMessage = (text)=>{
	this.bot.chat(text)
}

exports.getPlayers = ()=>{
	return this.bot.players
}


exports.executeAsync=(func)=> {
    setTimeout(func, 0);
}

// sleep time expects milliseconds
exports.sleep =(time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
}

exports.waitforrelog = async() => {
	await this.sleep(120000)
	allowedToRelog = true
}
database.init('localhost', 'root', '79397939', 'textlog', 'minedata')

this.relog(false);




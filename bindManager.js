const commands = require('./commands.js');
const database = require('./database.js');
const Discord = require('./discord.js');
const playtimecache = require('./caches/playtimecache.js')
const cacheManager = require('./caches/cachemanager.js')
const totallogincache = require('./caches/totallogincache.js')
const botManager = require('./bot.js');
const config = require('./config.json');
const mineflayer = require('mineflayer');
const { EventEmitter } = require('events');
var isConnected = false

exports.bind = (bot) => {
	//connection test loop
    doConnectionTest(bot)
	if(isConnected === false){
		setInterval(()=>{
			if(isConnected === false)
				doConnectionTest();
		}, config.connectionTestTime*1000);
	}
}

function internalBind(bot=mineflayer.Bot) {
	//Kills all intervals running (hopefully)
	var killId = setTimeout(";");
	for (var i = killId; i > 0; i--) clearInterval(i)

    //Discord chat logging
    bot.on('message', function(jsonMsg) {
		message = String(jsonMsg);
		lastTimeMessage = Date.now();
		username = message.slice(0, message.indexOf(':'));
		text = message.slice(message.indexOf(':') + 2);


		time = new Date();
		console.log('[' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + '] ' + jsonMsg)
	})

    //Command management
	bot.on('chat', function(username, message) {
	    if (username === bot.username) return;

	    if (message[0] == config.prefix) {
		  	if (Date.now() - lastTimeUsed <= config.commandInterval) return;
		  	lastTimeUsed = Date.now();
		  		toSend = cmdhandler.commandHandler(username, message);
		  		if (toSend !== null) {
		  			bot.chat(toSend);  		  			
		  		}
	    } else {
	  	    cmdhandler.messageHandler(username, message);
	  	}
	});

    //kicked event
	bot.on('kicked', function(reason) {
		Discord.sendMessage(`BOT HAD BEEN KICKED FOR ` + reason + ' :crab:');
		cacheManager.dumpCache()
		isConnected = false
		botManager.relog();
	});

	//spam messages
	var spamMessages = ['[Bot] Did you know you could do ?fact for a random fact? It\'s epic, I know. Do ?help for more!',
	                    '[Bot] Join Unnamed group\'s discord server to participate in upcoming giveaways (3 winners & 3 kits!) https://discord.gg/ZXvVQtg', 
	                    '[Bot] Have troubles with progression on the server? Buy shulkers with THE cheapest prices from THE best group! https://discord.gg/ZXvVQtg',
	                    '[Bot] Have troubles with progression on the server? Buy shulkers with THE cheapest prices from THE best group! https://discord.gg/ZXvVQtg',
	                    '[Bot] Buy kits from Unnamed group and your dick will grow 3 inches (We have proof and reviews!) https://discord.gg/ZXvVQtg',
	                    '[Bot] Buy kits from Unnamed group and your dick will grow 3 inches (We have proof and reviews!) https://discord.gg/ZXvVQtg'];


    //spammer                    
	botManager.executeAsync(async function() {
		while (true) {
			await sleep((Math.random() * 100000) + 30000).then(async function() {
				randomIndex = Math.floor(Math.random() * spamMessages.length);
				bot.chat(spamMessages[randomIndex]);		
			});
		}
	}, 10);

	//login handler
    bot.on('login', async() => {
        bot.chat(commands.welcomeMessage);
		bot.chat('Hello, Alyxix!')
		setTimeout(async() => {
			setInterval(async function() {
				for(player in bot.players){
					playtimecache.addToCacheValue(player, 1)
				}
			}, 1000)
		}, 1000)
	 });
	 setTimeout(()=>{
		setInterval(async function() {
			cacheManager.dumpCache()
		}, config.cacheDumpFrequencey*10000);
	}, 25000)

	//player join handler
	bot.on('playerJoined', (player) => {
		database.checkuser(player.username);
		logins = totallogincache.getCacheValue(player)
		if (logins == 0) {
			bot.chat(player.username + ' is new! Welcome to poggop.org!')
			playtimecache.setCacheValue(player.username, 60)
		}
		database.getFirstlogin(player.username, (result)=> {
			if(result === null)
				database.setFirstlogin(player.username, Date.now())
		})
		totallogincache.addToCacheValue(player.username, 1)
		database.setLastlogin(player.username, Date.now())
	
	})

	//unexpected connection reset					//
	//bot.on('end', ()=> {							//
	//	isConnected = false;						// <---- Had problems with bot.on('kick')
	//	cacheManager.dumpCache();					//
	//	botManager.relog(false)						//
	//})											//
} 

//check if player is acctualy connected to the server
function doConnectionTest(bot){
	if(player === undefined){
		botManager.relog()
		setTimeout(()=>{
			if(player !== undefined){
				isConnected = true;
				internalBind()
			}
		}, 1000)
	}
}
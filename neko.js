const axios = require('axios')
const Discord = require('discord.js')
const config = require('./config.json')
const neko = new Discord.WebhookClient(config.discord.neko_number, config.discord.neko_symbols);
const client = new Discord.Client();


exports.get_neko = function (type) {
	return new Promise(resolve => {
		axios.get('https://nekobot.xyz/api/image?type=' + type).then(response => {
			resolve(response.data.message)
			//neko.send("Here's your christian neko, sir\n" + response.data.message)
		});
	})
}

exports.BindNeko = ()=>{
	setInterval(()=>{
		this.get_neko('neko').then((link)=>{
			console.log('sending random neko pic...')
			neko.send("Random christian neko\n" + link);
		})
	}, config.wait_for_random_neko_minutes * 1000 * 60)
	client.on('message', msg => {
		if (msg.author.bot || msg.channel.name !== 'neko') {
			return;
		}

		if (msg.content.toLowerCase() === 'neko') {
			this.get_neko('neko').then((link)=>{
				console.log('sending neko pic...')
				neko.send("Here's your christian neko, sir\n" + link)
			})
		} else if (msg.content.toLowerCase() === 'hentai neko' || msg.content.toLowerCase() === 'hneko') {
			if (Math.random() >= 0.5) {
				this.get_neko('hneko').then((link)=>{
					console.log('sending hentai neko pic...')
					neko.send("Here's your neko, sir\n" + link)
				})
			} else {
				this.get_neko('hkitsune').then((link)=>{
					console.log('sending hentai neko pic...')
					neko.send("Here's your neko, sir\n" + link)
				})
			}
		}
	})
}



client.login(config.discord.bot_private_key) // you might just use the bot to send the messages but nah


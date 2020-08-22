const axios = require('axios')
const Discord = require('discord.js')
const neko = new Discord.WebhookClient('743246927130525757', 'YWITiXeNlx97rbg6gkhgbhOrrQV9Xwvdmlrn6A6bVldB1Dfa8daoTePtbeO6f9fCdR5a');
const client = new Discord.Client();
const config = require('./config.json')


exports.get_neko = function (type) {
	return new Promise(resolve => {
		axios.get('https://nekobot.xyz/api/image?type=' + type).then(response => {
			resolve(response.data.message)
			neko.send("Here's your christian neko, sir\n" + response.data.message)
		});
	})
}

exports.BindNeko = ()=>{
	setInterval(()=>{
		// every 50 minutes
		this.get_neko('hneko').then((link)=>{
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



client.login('NzMyNjgxNDY4MjE1ODIwMzQ5.Xw4Jvw.JskD45xytRaX7lDpSehZWaguOXA');


const axios = require('axios')
const Discord = require('discord.js')
const neko = new Discord.WebhookClient('743246927130525757', 'YWITiXeNlx97rbg6gkhgbhOrrQV9Xwvdmlrn6A6bVldB1Dfa8daoTePtbeO6f9fCdR5a');
const client = new Discord.Client();



client.on('message', msg => {
	if (msg.author.bot || msg.channel.name != 'neko') {
		return;
	}

	if (msg.content.toLowerCase() == 'neko') {
		axios.get('https://nekobot.xyz/api/image?type=neko').then(response => {
			console.log('sending neko pic...')
			neko.send(response.data.message)
		});
	} else if (msg.content.toLowerCase() == 'hentai neko' || msg.content.toLowerCase() == 'hneko') {
		if (Math.random() >= 0.5) {
			axios.get('https://nekobot.xyz/api/image?type=hneko').then(response => {
				console.log('sending hentai neko pic...')
				neko.send("Here's your neko, sir\n" + response.data.message)
			});
		} else {
			axios.get('https://nekobot.xyz/api/image?type=hkitsune').then(response => {
				console.log('sending hentai neko pic...')
				neko.send("Here's your neko, sir\n" + response.data.message)
			});
		}
		
	}
})

setInterval(()=>{
	// every 50 minutes
	axios.get('https://nekobot.xyz/api/image?type=hkitsune').then(response => {
		console.log('sending hentai neko pic...')
		neko.send("Random neko\n" + response.data.message);  
	});
}, 3000)


client.login('NzMyNjgxNDY4MjE1ODIwMzQ5.Xw4Jvw.JskD45xytRaX7lDpSehZWaguOXA');

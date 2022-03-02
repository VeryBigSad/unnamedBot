# Unnamed bot
Copy of mooomooo bot with some interesting original features and great stability. Set this bot up on your anarchy server today! (instructions below)

## Features

* Lots of commands (like playtime, quote, joindate, lastseen, report/ping)
* customizable command prefix
* (WOW) <b>CREATE YOUR OWN COMMANDS WITH ZERO CODE!</b> Use commands.json to add your own custom commands, like `!discord` or `!bestgroup` 
* Discord integration coming soon™

[//]: # (* Commands for discord &#40;btw all the functional commands you can use in-game you can also use in discord&#41;:)
[//]: # (* `!raw` &#40;sends message in-game chat without a prefix&#41;)
[//]: # (* `!save` &#40;manually saves cache to the database&#41; &#40;its done every hour anyway, dev command&#41;)
[//]: # (* `!usercount` &#40;amount of players)
[//]: # (registered in the database, e.g., those who logged on at least once&#41;.)

### Installing
<b>Easy!</b>
1. Install Node JS and npm on your system (<a href="https://nodejs.org/en/download/">link</a>)
2. Download this repository, open the folder that it contains, open the terminal there.
3. Run `npm install`

<b>Yeah, Done!</b> To load up the bot run this:\
`node bot.js [-microsoft (use when using a microsoft account)] <ip (ip of the server)> <port (port of the server, 25565 by default)> <mc.net username (minecraft username/email if microsoft acc)> <mc.net password (password)>`


### Configuring
So, we open `config.json` and change whatever we need:
1. `prefix` - what to use as a command prefix in in-game chat, like `!` or `?`. 
2. `commandInterval` - How often can this bot send text messages in chat.
3. `discord_bot_private_key` - Your discord bot token for discord integration (coming soon™)
4. `spammer` - Stuff to manage your spammer.
   1. `min_spam_wait` - minimal time between messages (in minutes).
   2. `max_spam_wait` - maximal time between messages (in minutes).
   3. `messages` - list of messages that will be spammed by the bot.

### Does it collect my data?

No. You can check the source code if you think that it does.

## Built With

* [Mineflayer](https://github.com/PrismarineJS/mineflayer/) - Used for handling actual minecraft connection
* [Discord.js](https://discord.js.org/) - Used for communicating with discord

## Contributing

Making pull requests is cool, and you should do it if you think that you have something to add!

## Authors

* **Sanyss/VeryBigSad** - *Initial work & maintaining*
* **NoWillToLife** - *Helped building the initial crappy version which became the inspiration*

## License

You can do whatever you want but adding us as contributors would be nice of you :)

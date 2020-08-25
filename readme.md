# Unnamed bot

mooomooo's copy with some original features and bad stability _(if you actually want to use this bot hit me up, I'll fix it)_

## What can it do?

Commands in-game (you can modify the prefix):\
* !help (self explainatory)
* !report (joke command)
* !ping (shows your ping)
* !discord (shows your discord link)
* !fact (random fact)
* !pt (playtime)
* !qt (random quote) 
* !seen (when someone was last seen)
* !fm (your first message) (buggy)
* !jd (your joindate)
* !neko (random christian or hentai nekochan)

Commands for discord (btw all the functional commands you can use in-game you can also use in discord):\
!raw (sends message in-game chat without a prefix), !save (manually saves cache to the database) (its done every hour anyway), !usercount (amount of players
registered in the database, e.g. those who logged on at least once).

And, of course, you can send messages for them to get sent out to the ingame chat.

### Installing

To start up the thing, what you do is - try to launch it and install every package it tells you to install through npm. Then, install pm2 (google it). Go to the directory where the source code of the bot is located, and do `pm2 start bot.js -- <server ip> <server port> <minecraft.net login> <minecraft.net password>`. You can check the logs through `pm2 logs`.

### Does it collect my data?

No. You can check the source code if you think that it does.

## Built With

* [Mineflayer](https://github.com/PrismarineJS/mineflayer/) - Used for handling actual minecraft connection
* [Discord.js](https://discord.js.org/) - Used for communicating with the discord

## Contributing

Make a push request (or an issue even), I'll simp for you if you will actually do

## Authors

* **Sanyss** - *Initial work*
* **NoWillToLife** - *making everything about databases and cache work*

## License

You can do whatever you want but if you are making a modification of this bot, make sure to add us as creators/authors

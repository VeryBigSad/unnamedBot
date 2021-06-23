# Unnamed bot

mooomooo's copy with some original features and bad stability _(if you actually want to use this bot hit me up, I'll fix it)_

## What can it do?

Commands in-game (you can modify the prefix):
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
Okay, so (assuming you have nodeJS and npm installed). First, you do `git clone https://github.com/verybigsad/unnamedbot`, then `cd unnamedbot`.\
Now you have to set up all the dependencies - run `npm install`, and it will install all the required packages.\
You can run it now with `node bot.js <ip> <port> <mc.net username> <mc.net password>`, but it will either have almost only 50% of features it need to have, either won't work at all. To fix this you need to set up mysql database, and configure the bot.


### Setting up the database
just google `install mysql` for your platform, and after that, connect to the database and create 2 databases - `minedata` and `textlog`


### Configuring
So, we open `config.json` and change whatever we need:
1. `prefix` - what to use as a command prefix in ingame-chat, like `!` or `?`. 
2. `commandInterval` - how much seconds should separate two commands (at least). If the bot is getting kicked for spamming, set it higher.
3. `discord`
    1. `bot_private_key` - create a discord bot, and insert it's private token here
    2. `bot_channel_id` - id of the discord channel, where the bot will send ingame chat (it can be empty, but then you won't be able to use the commands in the discord and the console will be full of errors).
4. `spammer`
    1. `messages` - messages to be spammed once in a while. Every message has an equal chance of being sent out.
    2. `min_spam_wait` & `max_spam_wait` - how often to spam (example: 60 & 120 will mean that bot will send a message not more often then once in a minute and not less often then once in 2 minutes, and on average it will send a message per 1.5 minutes)
    3. `discord_command_message` - what will ?discord do.
5. `database` - data to log in to the database. User has to be able to create tables in `textlog`, btw.

Everything that is not mentioned above but is in `config.json` you can leave like that and will be fine.

### Does it collect my data?

No. You can check the source code if you think that it does.

## Built With

* [Mineflayer](https://github.com/PrismarineJS/mineflayer/) - Used for handling actual minecraft connection
* [Discord.js](https://discord.js.org/) - Used for communicating with discord

## Contributing

Making pull requests is cool and you should do it as long as your code is good enough!

## Authors

* **Sanyss/VeryBigSad** * - *Initial work*
* **NoWillToLife** - *making everything about databases and cache work*

## License

You can do whatever you want but adding us as contributors would be nice of you

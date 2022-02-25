# Unnamed bot
Copy of mooomooo with some original features and (very) bad stability. If you actually want to use this bot - hit me up, I might do something so that it'll be more usable.

***
I'd not recommend using this right now. It's _very_ hard to set up, and soon there will be a second version (currently in development in branch v2) which would provide more stability and would allow for more tinkering with the config.
## What can it do?

Commands in-game (you can modify the prefix and disable some of these commands):
* !help (self-explanatory)
* !report (jokingly reports you to "staff", doesn't actually do anything)
* !ping (shows your ping)
* !discord (shows your discord link)
* !fact (random fact)
* !pt (playtime)
* !qt (random quote) 
* !seen (time the player was last seen online)
* !fm (your first message) (buggy)
* !jd (time you had been first seen)
* !neko (random christian or hentai nekochan)

Commands for discord (btw all the functional commands you can use in-game you can also use in discord):
* `!raw` (sends message in-game chat without a prefix)
*  `!save` (manually saves cache to the database) (its done every hour anyway, dev command)
* `!usercount` (amount of players
registered in the database, e.g., those who logged on at least once).

And, of course, you can send messages for them to get sent out to the in-game chat.

### Installing
Kind of a hard process, but I believe in you!\
Okay, so first, install nodeJS and npm. Second, you do `git clone https://github.com/verybigsad/unnamedbot` (you also need git for that one), then `cd unnamedbot`.\
Now you have to set up all the dependencies - run `npm install`, and it will install all the required packages. \
You can run it now with `node bot.js [-microsoft (use when using a microsoft account)] <ip (ip of the server)> <port (port of the server, 25565 by default)> <mc.net username (minecraft username/email if microsoft acc)> <mc.net password (password)>`, but it will either have almost only 50% of features it needs to have, either won't work at all. To fix this you need to set up a mysql database, and configure the bot.


### Setting up the database
just google `install mysql` for your platform, and after that, connect to the database and create 2 databases - `minedata` and `textlog`


### Configuring
So, we open `config.json` and change whatever we need:
1. `prefix` - what to use as a command prefix in in-game chat, like `!` or `?`. 
2. `commandInterval` - how many seconds should separate two commands (so that you won't get kicked for spamming if 10 people are working with the bot at the same time). If the bot is getting kicked for spamming, set it higher.
3. `discord`
    1. `bot_private_key` - create a discord bot, and insert it's private token here
    2. `bot_channel_id` - id of the discord channel, where the bot will send ingame chat (it can be empty, but then you won't be able to use the commands in the discord and the console will be full of errors).
4. `spammer`
    1. `messages` - messages to be spammed once in a while. Every message has an equal chance of being sent out.
    2. `min_spam_wait` & `max_spam_wait` - how often to spam (example: 60 & 120 will mean that bot will send a message not more often than once in a minute and not less often than once in 2 minutes, and on average it will send a message once per 1.5 minutes)
    3. `discord_command_message` - what will ?discord do.
5. `database` - credentials to log in to the database. Specified user has to be able to create tables in `textlog`, btw.
6. `disabled_commands` - list of commands that should be disabled. To disable one, you should not write the actual command name in there, but instead a name of the function that's responsible for the command. Check `commands.js` and `databaseCommands.js` to see if you find functions which have names like *helpCommand* or *nekoCommand*.
7. `static_text` - templates for the messages that the bot will be sending out as responses to commands. If you want, you can change them, but you have to leave in things in brackets, since those will be filled in with actual data.

Everything that is not mentioned above but is in `config.json` you can leave like that and will be fine.

### Does it collect my data?

No. You can check the source code if you think that it does.

## Built With

* [Mineflayer](https://github.com/PrismarineJS/mineflayer/) - Used for handling actual minecraft connection
* [Discord.js](https://discord.js.org/) - Used for communicating with discord

## Contributing

Making pull requests is cool and you should do it as long as your code is good enough!

## Authors

* **Sanyss/VeryBigSad** - *Initial work & maintaining*
* **NoWillToLife** - *making everything about databases and cache work*

## License

You can do whatever you want but adding us as contributors would be nice of you :)

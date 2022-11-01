<p align="center">
 <img width="100px" src="https://th.bing.com/th/id/R.4520ec0d3ce32b92f5f572267adbae01?rik=B%2ftYfxF%2fcsQikA&riu=http%3a%2f%2fwww.clker.com%2fcliparts%2f4%2f9%2fw%2fJ%2fA%2fa%2fquestion-mark.svg.hi.png&ehk=Ya5SlgZ1ZDUx1GRgwoKF90XaUGojzdwN9jhuZeVH4NQ%3d&risl=&pid=ImgRaw&r=0" align="center" alt="GitHub Readme Stats" />
 <h2 align="center">UnnamedBot</h2>
 <p align="center">A MooMoo copy to create custom commands via a Minecraft account.</p>
</p>
  <p align="center">
    <a href="https://github.com/VeryBigSad/unnamedBot/actions">
      <img alt="Tests Passing" src="https://github.com/VeryBigSad/unnamedBot/workflows/Test/badge.svg" />
    </a>
    <a href="https://github.com/VeryBigSad/unnamedBot/graphs/contributors">
      <img alt="GitHub Contributors" src="https://img.shields.io/github/contributors/VeryBigSad/unnamedBot" />
    </a>
    <a href="https://github.com/anuraghazra/github-readme-stats/issues">
      <img alt="Issues" src="https://img.shields.io/github/issues/VeryBigSad/unnamedBot?color=0088ff" />
    </a>
<div text-align="center">
# Info
Unnamedbot is a copy/recreation of the popular 2b2t account moomoo, it allows you to create commands on any server the account joins!

## Features

* Built in commands like playtime, report, firstmessage, qoute, lastseen, and more to come
* Customizable prefix
* (WOW) <b>CREATE YOUR OWN COMMANDS WITH ZERO CODE!</b> Use commands.json to add your own custom commands, like `!discord` or `!bestgroup`, read [How to make commands](#CreatingCMDS) to setup.
* Discord integration coming soon™

[//]: # (* Commands for discord &#40;btw all the functional commands you can use in-game you can also use in discord&#41;:)
[//]: # (* `!raw` &#40;sends message in-game chat without a prefix&#41;)
[//]: # (* `!save` &#40;manually saves cache to the database&#41; &#40;its done every hour anyway, dev command&#41;)
[//]: # (* `!usercount` &#40;amount of players)
[//]: # (registered in the database, e.g., those who logged on at least once&#41;.)

## Setup
<b>Easy!</b>
1. Install Node JS and npm on your system (<a href="https://nodejs.org/en/download/">link</a>)
2. Download this repository, open the folder that it contains, open the terminal there.
3. Run `npm install`

### Configuring
To configure go to `config.json`
Things to change:
> `prefix` - what to use as a command prefix in in-game chat, like `!` or `?`.

> `commandInterval` - How often can this bot send text messages in chat.

> `discord_bot_private_key` - Your discord bot token for discord integration (coming soon™)

> `spammer` - Stuff to manage your spammer.
>   1. `min_spam_wait` - minimal time between messages (in minutes).
>   2. `max_spam_wait` - maximal time between messages (in minutes).
>   3. `messages` - list of messages that will be spammed by the bot.

### Running
To run the bot use this command: `[] = optional <> = required` 

`node bot.js [-microsoft (If is a migrated account)] <ip (ip of the server)> <port (port of the server, 25565 by default)> <username (minecraft username. Email if microsoft account)> <password (Account Password)>`

#### Running on Linux VM on session quit. (Advanced)
If you would like to run the bot on a Linux Server and be able to logout of the session you can use the Node Package "forever"

To install it run `sudo npm i forever -g`

Then to start the bot run `forever start bot.js [-microsoft (If is a migrated account)] <ip (ip of the server)> <port (port of the server, 25565 by default)> <username (minecraft username. Email if microsoft account)> <password (Account Password)>`

*Sadly to stop the bot you must restart your entire server as the Daemon does not close properly* 
   
## <p id="CreatingCMDS">Creating Custom Commands</p>
First go to `commands.json`, there is info in that file on how to create commands.


### Does it collect my data?

No, Unanmedbot will login to the minecraft account specified via the enviroment variables and then discard the login details.
As of writing this [Mineflayer](https://github.com/PrismarineJS/mineflayer/) does not store your data.

## Built With

* [Mineflayer](https://github.com/PrismarineJS/mineflayer/) - Node.JS package to connect to Minecaft servers.
* [Discord.js](https://discord.js.org/) - The most common Discord Bot building frame work used by many bots.

## Contributing

Making pull requests is cool, and you should do it if you think that you have something to add! (Feel free to add your name under "Other Contributors" if you helped out!

### Authors

* **Sanyss/VeryBigSad** - *Initial work & maintaining*
* **NoWillToLife** - *Helped building the initial crappy version which became the inspiration*

#### Other Contributors

* **Rodney_RWR** - *Code Clean-Up & Updating README*

## License

You can do whatever you want but adding us as contributors would be nice of you :)
</div>

const { Gameplay } = require('./src/gameplay')

function inject (bot) {
  bot.gameplay = new Gameplay(bot)
}

module.exports = {
  gameplay: inject
}

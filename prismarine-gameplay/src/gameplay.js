const { CollectItem } = require('./strats/collectItem')
const { CollectBlock } = require('./strats/collectBlock')
const { WaitForTime } = require('./strats/waitForTime')
const { WaitForItemDrop } = require('./strats/waitForItemDrop')

function loadDefaultStrategies (gameplay) {
  gameplay.addStrategy(new CollectItem(gameplay.bot))
  gameplay.addStrategy(new CollectBlock(gameplay.bot))
  gameplay.addStrategy(new WaitForTime(gameplay.bot))
  gameplay.addStrategy(new WaitForItemDrop(gameplay.bot))
}

/**
 * A container for all containing and configuring gameplay strategies.
 */
class Gameplay {
  /**
   * Creates a new gameplay object
   *
   * @param {Bot} bot - The bot this gameplay container is acting upon
   */
  constructor (bot, loadDefault = true) {
    this.bot = bot
    this.strategies = []
    this.activeStrategy = null

    if (loadDefault) loadDefaultStrategies(this)
  }

  /**
   * Adds a new strategy to this gameplay container.
   *
   * @param {Strategy} strategy - The strategy to add.
   */
  addStrategy (strategy) {
    this.strategies.push(strategy)

    this[strategy.name] = (options, cb) => {
      if (this.activeStrategy !== null) {
        cb(new Error(`Strategy ${this.activeStrategy.name} is still active!`))
        return
      }

      try {
        this.activeStrategy = strategy
        strategy.run(options, (err, returns) => {
          this.activeStrategy = null
          cb(err, returns)
        })
      } catch (err) {
        this.activeStrategy = null
        cb(err)
      }
    }
  }

  stopAll () {
    if (this.activeStrategy !== null) this.activeStrategy.exit()
  }
}

module.exports = { Gameplay }

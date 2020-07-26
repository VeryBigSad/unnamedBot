const { Strategy } = require('../strategy')
const { GoalFollow } = require('mineflayer-pathfinder').goals
const Movements = require('mineflayer-pathfinder').Movements

/**
 * A simple task which collects a specific item from the ground.
 * Requires the pathfinder plugin to be loaded in order to work.
 */
class CollectItem extends Strategy {
  /**
   * Creates a new Collect Item strategy.
   *
   * @param {Bot} bot - The bot to act on.
   */
  constructor (bot) {
    super('collectItem', bot)
  }

  /**
   * @inheritdoc
   *
   * Options:
   * * item - The item drop to pick up.
   *
   * _OR_
   *
   * * items - A list of items drops to pick up.
   *
   * _OR_
   *
   * * distance - The maximum distance to look for item drops if specific target not specified.
   */
  run (options, cb) {
    this.shouldExit = false

    if (options.item !== undefined) {
      this._handleItems([options.item], cb)
    } else if (options.items !== undefined) {
      this._handleItems(options.items, cb)
    } else if (options.distance !== undefined) {
      this._handleItems(this._findNearbyItems(options.distance), cb)
    } else {
      cb(new Error('Target item or search distance must be specified!'))
    }
  }

  exit () {
    this.shouldExit = true
    this.bot.pathfinder.setGoal(null)
  }

  _findNearbyItems (distance) {
    const items = []
    for (const entityName of Object.keys(this.bot.entities)) {
      const entity = this.bot.entities[entityName]

      if (entity.objectType !== 'Item') {
        continue
      }

      if (entity.position.distanceTo(this.bot.entity.position) > distance) {
        continue
      }

      items.push(entity)
    }

    items.sort((a, b) => {
      return (
        b.position.distanceTo(this.bot.entity.position) -
        a.position.distanceTo(this.bot.entity.position)
      )
    })

    return items
  }

  _handleItems (items, cb) {
    if (items.length === 0) {
      cb()
      return
    }

    const bot = this.bot

    function checkItems () {
      if (this.shouldExit) {
        bot.removeListener('physicTick', checkItems)
        cb()
        return
      }

      if (!items[items.length - 1].isValid) {
        items.pop()

        if (items.length === 0) {
          bot.removeListener('physicTick', checkItems)
          bot.pathfinder.setGoal(null)
          cb()
          return
        }

        const followGoal = new GoalFollow(items[items.length - 1], 0)
        bot.pathfinder.setGoal(followGoal)
      }
    }

    const mcData = require('minecraft-data')(this.bot.version)
    const defaultMove = new Movements(this.bot, mcData)
    bot.pathfinder.setMovements(defaultMove)

    bot.on('physicTick', checkItems)

    const followGoal = new GoalFollow(items[items.length - 1], 0)
    bot.pathfinder.setGoal(followGoal)
  }
}

module.exports = { CollectItem }

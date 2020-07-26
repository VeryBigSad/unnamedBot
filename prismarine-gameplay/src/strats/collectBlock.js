const { Strategy } = require('../strategy')
const { GoalNear } = require('mineflayer-pathfinder').goals
const Movements = require('mineflayer-pathfinder').Movements

const { WaitForItemDrop } = require('./waitForItemDrop')
const { CollectItem } = require('./collectItem')

/**
 * A strategy which mines and collects the target block.
 * Requires the pathfinder plugin to be loaded in order to work.
 */
class CollectBlock extends Strategy {
  /**
   * Creates a new Collect Block strategy.
   *
   * @param {Bot} bot - The bot to act on.
   */
  constructor (bot) {
    super('collectBlock', bot)

    this.waitForItemDrop = new WaitForItemDrop(bot)
    this.collectItem = new CollectItem(bot)
  }

  /**
   * @inheritdoc
   *
   * Options:
   * * block - The block to mine and collect
   *
   * _OR_
   *
   * * blockType - The type of block to look for.
   * * distance - How far away from the bot to look for this block in
   */
  run (options, cb) {
    this.shouldExit = false

    if (options.block !== undefined) {
      this._handleItems([options.item], cb)
    } else if (options.blockType !== undefined) {
      const mcData = require('minecraft-data')(this.bot.version)
      const id = mcData.blocksByName[options.blockType].id

      const findNext = () => {
        if (this.shouldExit) {
          cb()
          return
        }

        const block = this._findNearbyBlock(id, options.distance)

        if (block) {
          this._handleBlock(block, err => {
            if (err) cb(err)
            else findNext()
          })
        } else {
          cb()
        }
      }

      findNext()
    } else {
      cb(new Error('Target block must be specified!'))
    }
  }

  exit () {
    this.waitForItemDrop.exit()
    this.collectItem.exit()

    this.shouldExit = true
    this.bot.pathfinder.setGoal(null)
  }

  _findNearbyBlock (blockId, distance) {
    return this.bot.findBlock({
      matching: blockId,
      maxDistance: distance
    })
  }

  _handleBlock (block, cb) {
    const mcData = require('minecraft-data')(this.bot.version)
    const defaultMove = new Movements(this.bot, mcData)
    this.bot.pathfinder.setMovements(defaultMove)

    if (!this._canMine(block)) {
      cb(new Error('Does not have available tools to mine block!'))
      return false
    }

    const pos = block.position
    const goalNear = new GoalNear(pos.x, pos.y, pos.z, 3) // TODO Replace with GoalInteract
    this.bot.pathfinder.setGoal(goalNear)

    this.bot.once('goal_reached', () => {
      const dig = block => {
        this.bot.dig(block, err => {
          if (err) {
            cb(err)
            return
          }

          this.waitForItemDrop.run(
            {
              position: block.position,
              maxDistance: 5,
              maxTicks: 20,
              groupItems: true
            },
            (err, returns) => {
              if (err) {
                cb(err)
                return
              }

              this.collectItem.run(
                {
                  items: returns.items
                },
                err => cb(err)
              )
            }
          )
        })
      }

      const tool = this.bot.pathfinder.bestHarvestTool(block)

      if (tool) {
        this.bot.equip(tool, 'hand', err => {
          if (err) {
            cb(err)
            return
          }

          dig(block)
        })
      } else {
        dig(block)
      }
    })
  }

  _canMine (block) {
    if (block.harvestTools === undefined) return true

    const items = this.bot.inventory.items()
    for (const tool in block.harvestTools) {
      const id = parseInt(tool, 10)
      for (const j in items) {
        const item = items[j]
        if (item.type === id) return true
      }

      return false
    }
  }
}

module.exports = { CollectBlock }

/**
 * A configurable function which can be executed to preform a task.
 */
class Strategy {
  /**
   * Creates a new strategy object with the given name.
   *
   * @param {string} name - The name of this strategy.
   * @param {Bot} bot - The bot to preform this action on.
   */
  constructor (name, bot) {
    this.name = name
    this.bot = bot
  }

  /**
   * Executes this strategy.
   *
   * @param {*} options - The options for how this strategy should be executed.
   * @param {(err?: Error) => void} cb - Called when this strategy has finished executing.
   */
  run (options, cb) {
    cb()
  }

  /**
   * Requests this strategy to stop executing at the next available opportunity.
   */
  exit () {}
}

module.exports = { Strategy }

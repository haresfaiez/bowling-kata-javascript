const Score = require('./Score')

class Session {
  constructor(configuration, registeredRolls) {
    this.configuration = configuration
    this.registeredRolls = registeredRolls
  }

  registerRoll(roll) {
    if (this.isOver()) throw new Error('This game session is over')

    let increment
    
    if (roll.hits === 10)
      increment = 'strike'
    else if (Array.isArray(roll.hits) && (roll.hits[0] + roll.hits[1] === 10))
      increment = 'spare'
    else
      increment = roll 

    this.registeredRolls.push(increment)
  }

  rollsCount() {
    return this.registeredRolls.length
  }

  score() {
    return Score.from(this.registeredRolls).result()
  }

  isOver() {
    return this.rollsCount() === this.configuration
  }

  status() {
    return { rolls: this.rollsCount(), score: this.score() }
  }

  lastRoll() {
    return this.registeredRolls[this.registeredRolls.length -1]
  }
  
  static fromRollsCount(rollsCount) {
    return new Session(rollsCount, []);
  }

  static fromFile(path) {
    const gamePlay = require(path)
    
    const result = Session.fromRollsCount(gamePlay.attempts)
    gamePlay.session.forEach(each => result.registerRoll(each))
    
    return result
  }
}

module.exports = Session

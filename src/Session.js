const Roll = require('./Roll')
const Score = require('./Score')

class Session {
  constructor(configuration, registeredRolls) {
    this.configuration = configuration
    this.registeredRolls = registeredRolls
  }

  registerRoll(lastRoll) {
    if (this.isOver()) throw new Error('This game session is over')

    this.registeredRolls.push(Roll.create(lastRoll))
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

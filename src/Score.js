const Roll = require('./Roll')

class Score {
  constructor(rolls) {
    this.rolls = rolls
  }
  
  result() {
    const hitsSum = this.rolls
          .map(each => new Roll(each))
          .reduce((precedent, each) => each.score(precedent), 0)
    return hitsSum.value || hitsSum

  }

  static from(rolls) {
    return new Score(rolls)
  }
}

module.exports = Score

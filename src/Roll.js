class Roll {
  constructor(roll) {
    this.roll = roll
  }

  hitsCount() {
    return this.roll.hits || this.roll
  }

  isSingleShot() {
    return !Array.isArray(this.hitsCount()) || (this.roll === 'strike')
  }

  isSpare() {
    return this.roll === 'spare'
  }

  isStrike() {
    return this.roll === 'strike'
  }

  addHitsCountTo(precedent) {
    const precedentValue = precedent.value || precedent
    
    if (!this.isSingleShot())
      return precedentValue + this.hitsCount().reduce((e, r) => e + r, 0)

    return precedentValue + this.hitsCount()
  }

  addScoreTo(precedent) {
    const remaining = precedent.remaining || 0

    const value = (this.isStrike() || this.isSpare()) ? new Roll(10) : this

    return { value: value.addHitsCountTo(precedent) + remaining }
  }

  score(precedent) {
    if (this.isStrike())
      return Object.assign(this.addScoreTo(precedent), { remaining: 10 })

    return this.addScoreTo(precedent)
  }
}

module.exports = Roll

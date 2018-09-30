const Score = require('./Score')
const Roll = require('./Roll')

describe('Score', () => {
  it('calculates a spare as 10 hits', () => {
    const score = Score.from([ Roll.fromHits(2), Roll.spare() ])
    
    expect(score.result()).toEqual(12)
  })

  it('calculates the sum of the next hit when adding a strike', () => {
    const score = Score.from([ Roll.strike(), Roll.fromHits(2) ])

    expect(score.result()).toEqual(22)
  })
})

describe('roll hits', () => {
  it('add a remaining to the result when the roll is a strike', () => {
    const roll = new Roll('strike')
    
    expect(roll.score(0)).toEqual({ value: 10, remaining: 10 })
  })
})

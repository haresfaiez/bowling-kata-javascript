const Session = require('./Session')

describe('Bowling session with two attempts', () => {
  let session

  beforeEach(() => {
    session = Session.fromRollsCount(2)
  })
  
  it('calculates the number of rolls during the game', () => {
    expect(session.status().rolls).toEqual(0)
    
    session.registerRoll({ hits: 5 })

    expect(session.isOver()).toBe(false)
    expect(session.status().rolls).toEqual(1)
  })

  it('hinders more rolls than two', () => {
    session.registerRoll({ hits: 5 })
    session.registerRoll({ hits: 3 })

    expect(session.isOver()).toBeTruthy()
    try {
      session.registerRoll({ hits: 1 })
      throw new Error('Session should not accept more than 2 rolls')
    } catch(e) {}
  })

  it('stores 10hits for one hit as a strike', () => {
    session.registerRoll({ hits: 10 })

    expect(session.lastRoll()).toEqual('strike')
  })

  it('stores a sum of 10hits for two rolls as a spare', () => {
    session.registerRoll({ hits: [4, 6] })

    expect(session.lastRoll()).toEqual('spare')
  })
})

describe('New bowling sesssion', () => {
  it('reads a complete game play from a file', () => {
    const session = Session.fromFile('../spec/gamePlay.json')

    expect(session.rollsCount()).toEqual(1)
    expect(session.isOver()).toBeTruthy()
    expect(session.status()).toEqual({ rolls: 1, score: 6 })
  })

  it('accepts an incomplete game play from a file', () => {
    const session = Session.fromFile('../spec/incompleteGamePlay.json')

    expect(session.isOver()).toBe(false)
  })
})

describe('Session score', () => {
  describe('after a regular attempt', () => {
    it('should be sum of hits', () => {
      const session = Session.fromRollsCount(2)

      session.registerRoll({ hits: [1, 2] })

      expect(session.status()).toEqual({ rolls: 1, score: 3 })
    })
  })
})

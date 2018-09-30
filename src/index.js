const Session = require('./Session')

const gamePlay = process.argv.slice(2, 3)[0]

console.log('Parsing', gamePlay)

console.log('Result', Session.fromFile(gamePlay).status())

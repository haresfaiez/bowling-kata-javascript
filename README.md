Bowling-kata-javascript is a Javascript kata.
It is meant to run on Node.js.

# Operation

  * Run `npm start <configuration-file>` to start a bowling session
  * Run `npm test` to run the test suite

# Configuration

The configuration file should follow the next structure:

`{attempts: <number-of-attempts>, session <array-of-rolls-result>}`

Each element of `<the array-of-rolls-result>` shuold follow the next structure:
`{ hits: <roll-result> }`

`<roll-result>` can be a numbe(the number of hits) in case the player throws the ball once, or an array
in case the player throws the ball multiple times.

# Development
It was developed using TDD and OOP style.
It was grown with respect to best coding practices and OOP idioms,
mainly the four rules of simple design from Kent Beck.
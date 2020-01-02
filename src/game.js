const R = require('ramda')

const create = (playerNames, columns, rows) => {
  return {
    players: {
      1: {
        id: 1,
        name: playerNames[0]
      },
      2: {
        id: 2,
        name: playerNames[1]
      }
    },
    columns: columns,
    rows: rows,
    board: R.repeat(0, columns*rows)
  }
}

module.exports = {
  create
}

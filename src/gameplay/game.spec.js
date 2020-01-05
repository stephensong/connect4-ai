const assert = require("assert")
const { Game } = require("./game")
const { Player } = require("./player")

const player1 = Object.freeze(new Player(1))
const player2 = Object.freeze(new Player(2))
const defaultGame = () => new Game([player1, player2], 6, 7)
const X = null

describe("Game", () => {
  describe("initialisation", () => {
    it("has players", () => {
      const g = defaultGame()
      assert.deepStrictEqual(g.players().map(p => p.id()), [1, 2])
    })

    it("has an empty board", () => {
      const g = defaultGame()
      assert.deepStrictEqual(g.board(), [
        [X,X,X,X,X,X,X],
        [X,X,X,X,X,X,X],
        [X,X,X,X,X,X,X],
        [X,X,X,X,X,X,X],
        [X,X,X,X,X,X,X],
        [X,X,X,X,X,X,X],
      ])
    })
  })

  describe("turns", () => {
    it("returns the id of the next player (round robin)", () => {
      const g = defaultGame()
      let nextPlayer

      nextPlayer = g.nextPlayer()
      assert.strictEqual(nextPlayer.id(), 1)
      g.tryPut(nextPlayer, 4)
      nextPlayer = g.nextPlayer()
      assert.strictEqual(nextPlayer.id(), 2)
      g.tryPut(nextPlayer, 4)
      nextPlayer = g.nextPlayer()
      assert.strictEqual(nextPlayer.id(), 1)
      g.tryPut(nextPlayer, 3)
      nextPlayer = g.nextPlayer()
      assert.strictEqual(nextPlayer.id(), 2)
    })

    it("checks whether the player is next or not", () => {
      const g = defaultGame()

      assert.doesNotThrow(() => g.tryPut(player1, 4))
      assert.throws(() => g.tryPut(player1, 4),)
      assert.doesNotThrow(() => g.tryPut(player2, 4))
      assert.throws(() => g.tryPut(player2, 4),)
    })

    it("is possible to put “chips” into slots", () => {
      const g = defaultGame()
      g.tryPut(g.nextPlayer(), 0)
      assert.deepStrictEqual(g.board(), [
        [X,X,X,X,X,X,X],
        [X,X,X,X,X,X,X],
        [X,X,X,X,X,X,X],
        [X,X,X,X,X,X,X],
        [X,X,X,X,X,X,X],
        [1,X,X,X,X,X,X],
      ])
      g.tryPut(g.nextPlayer(), 0)
      assert.deepStrictEqual(g.board(), [
        [X,X,X,X,X,X,X],
        [X,X,X,X,X,X,X],
        [X,X,X,X,X,X,X],
        [X,X,X,X,X,X,X],
        [2,X,X,X,X,X,X],
        [1,X,X,X,X,X,X],
      ])
      g.tryPut(g.nextPlayer(), 5)
      assert.deepStrictEqual(g.board(), [
        [X,X,X,X,X,X,X],
        [X,X,X,X,X,X,X],
        [X,X,X,X,X,X,X],
        [X,X,X,X,X,X,X],
        [2,X,X,X,X,X,X],
        [1,X,X,X,X,1,X],
      ])
    })

    it("is not possible to overfill slots", () => {
      const g = defaultGame()
      g.tryPut(g.nextPlayer(), 0)
      g.tryPut(g.nextPlayer(), 0)
      g.tryPut(g.nextPlayer(), 0)
      g.tryPut(g.nextPlayer(), 0)
      g.tryPut(g.nextPlayer(), 0)
      g.tryPut(g.nextPlayer(), 0)
      assert.throws(() => g.tryPut(g.nextPlayer(), 0))
    })
  })
})

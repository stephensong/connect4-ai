const assert = require("assert")
const {create, findWinners} = require("./board")

const assertOk = ({expected, board}) => {
  const winners = findWinners(4, board)
  assert.deepStrictEqual(winners.sort(), expected.sort())
}

describe("Board", () => {
  it("initialises board with given dimensions", () => {
    const rows = 6
    const columns = 7
    const board = create(rows, columns)
    assert.strictEqual(board.length, rows)
    board.forEach(r => r.forEach(f => {
      assert.strictEqual(f, 0)
    }))
  })

  it("finds no winner when board is completely empty", () => {
    const board = [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
    ]
    assert.strictEqual(findWinners(4, board).length, 0)
  })

  it("finds no winner when there is no winning sequence", () => {
    [
      {expected: [], board: [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [1,0,0,2,0,0,0],
        [2,0,1,1,0,0,0],
        [2,1,2,1,0,0,0],
        [1,2,1,2,0,0,0],
      ]},
      {expected: [], board: [
        [0,1,0,0,0,0,0],
        [0,2,0,0,0,0,0],
        [1,1,0,0,0,0,0],
        [2,2,2,1,0,1,2],
        [2,2,2,1,1,1,2],
        [2,2,2,1,1,1,2],
      ]},
    ].forEach(assertOk)
  })

  it("finds winners in horizontal sequences", () => {
    [
      {expected: [1], board: [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,1,1,1,1,0],
      ]},
      {expected: [2], board: [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,2,2,2,2],
        [0,0,0,1,1,1,2],
        [0,0,0,1,2,2,1],
        [0,0,2,1,1,1,2],
      ]},
      {expected: [2, 1], board: [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,2,2,2,2,0],
        [0,0,1,1,1,1,0],
      ]},
    ].forEach(assertOk)
  })

  it("finds winners in vertical sequences", () => {
    [
      {expected: [1], board: [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,1,0,0,0,0],
        [0,0,1,0,0,0,0],
        [0,0,1,0,0,0,0],
        [0,0,1,0,0,0,0],
      ]},
      {expected: [2], board: [
        [0,0,0,0,0,0,0],
        [0,0,0,0,2,0,0],
        [0,0,1,0,2,0,0],
        [0,0,1,0,2,0,0],
        [0,0,1,2,2,2,1],
        [0,0,2,2,1,1,2],
      ]},
      {expected: [1, 2], board: [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,1,0,0,0,2],
        [0,0,1,0,0,0,2],
        [0,0,1,0,0,0,2],
        [0,0,1,0,0,0,2],
      ]},
    ].forEach(assertOk)
  })

  it("finds winners in diagonal sequences", () => {
    [
      {expected: [1], board: [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [1,0,0,0,0,0,0],
        [2,1,0,0,0,0,0],
        [2,2,1,0,0,0,0],
        [2,2,2,1,0,0,0],
      ]},
      {expected: [2], board: [
        [0,0,0,0,0,0,0],
        [0,0,0,0,1,0,0],
        [0,0,2,0,2,2,0],
        [0,0,1,0,2,1,0],
        [0,0,1,2,2,2,1],
        [0,0,2,2,1,1,2],
      ]},
      {expected: [1, 2], board: [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [1,0,0,0,0,2,0],
        [2,1,0,0,2,1,0],
        [2,2,1,2,1,1,0],
        [2,2,2,1,1,1,0],
      ]},
    ].forEach(assertOk)
  })

  it("finds all winners in all directions", () => {
    [
      {expected: [1, 2, 1], board: [
        [0,0,0,0,0,0,0],
        [2,0,0,0,0,0,0],
        [2,0,0,0,0,1,0],
        [2,0,0,0,1,2,0],
        [2,0,0,1,2,2,0],
        [1,1,1,1,2,2,0],
      ]}
    ].forEach(assertOk)
  })
})

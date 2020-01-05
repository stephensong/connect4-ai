function Player(id, name, onTurn) {
  this._id = id
  this._name = name
  this._onTurn = onTurn
}

Player.prototype.id = function() {
  return this._id
}

Player.prototype.name = function() {
  return this._name
}

Player.prototype.onTurn = function(done, board, status) {
  this._onTurn(done, board, status)
}

module.exports = { Player }
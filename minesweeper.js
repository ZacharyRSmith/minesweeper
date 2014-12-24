// Start with a 9x9 board with 10 mines.

// numFlags = numMines

function Game() {
  this.numFlagsPlaced = 0;
  this.numSquaresDiscovered = 0;

    genGrid:function(size) {
    
  },
  placeMines:function(num) {
    
  },
  setNumTouchingMines:function() {
    
  }
}

Game.prototype = {
  checkVictory:function() {
    if (this.grid.length ** 2 - this.numSquaresDiscovered === this.numMines) {
      this.victory = true;
    }
  },
  renderGrid:function() {
    
  }
}
  
function Square() {
  this.isDiscovered = false;
  this.hasMine = false;
  this.view = " "; //   view (Mine, numMines, flag, question, blank)
}

Square.prototype = {
  constructor: Square,
  discoverAdjSquares:function() {
    look at squares adjacent on grid:
    setToDiscovered(adjSquare);
  },
  getNumTouchingMines:function() {
    // look at adjacent squares on grid. return count that hasMine
  },
  getView:function() {},
  actOnRightClick:function(game) {
    if (this.isDiscovered) { return false; }

    if (this.view === " ") {
      if (game.numFlagsLeft > 0) {
        this.view = "F";
      }
    }
  },
  setToDiscovered:function() {
    if (hasMine) {

    } else if (getNumTouchingMines > 0) {

    } else { // is a "blank square"
      discoverAdjSquares
    }
  },
  setView:function() {},
  setViewToFlag:function() {
  },
  setViewToQuestion:function() {}
}
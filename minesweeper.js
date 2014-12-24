// Start with a 9x9 board with 10 mines.

// EVENTS:
// VICTORY -- All squares (-mines) are showing.
// LOSS -- Click on mine.

// numFlags = numMines
// Flags/?'s
// squares next to mine display numMines touching.

// OBJECTS:
// Game
//   init:
//    genGrid(size)
//    placeMines(num)
//    setNumTouchingMines
//
//    renderGrid:function
//
//   numSquaresDiscovered
//     if grid.length ** 2 - numMines { victory = true; }
//   checkVictory
//   setVictory

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
  setToDiscovered:function() {
    if (hasMine) {

    } else if (getNumTouchingMines > 0) {

    } else { // is a "blank square"
      discoverAdjSquares
    }
  },
  setView:function() {},
  setViewToFlag:function() {},
  setViewToQuestion:function() {}
}
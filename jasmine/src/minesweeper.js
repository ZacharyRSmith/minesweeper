// Start with a 9x9 board with 10 mines.

// numFlags = numMines

function Game(gridSize, numMines) {
  this.numFlagsPlaced = 0;
  this.numMines = numMines;
  this.numSquaresDiscovered = 0;

  // Generate this.grid:
  {
    this.grid = [];
    for (var col_i = 0; col_i < gridSize; col_i++) {
      var col = [];
      this.grid.push(col);
      for (var row_i = 0; row_i < gridSize; row_i++) {
        var row = new Square();
        col.push(row);
      }
    }
  }

  // Place mines:
  var countOfMinesPlaced = 0;
  while (countOfMinesPlaced < numMines) {
    
  }
    // x_coor
    // y_coor
    // if (grid[x_coor][y_coor].hasMine === false) { // place mine;
  // increase minesPlaced; }

  { // Set numTouchingMines prop on squares.
  
  }
}

// Game.prototype = {
//   checkVictory:function() {
//     if (this.grid.length ** 2 - this.numSquaresDiscovered === this.numMines) {
//       this.victory = true;
//     }
//   },
//   renderGrid:function() {
    
//   }
// }
  
function Square() {
  this.isDiscovered = false;
  this.hasMine = false;
  this.view = " "; //   view (Mine, numMines, flag, question, blank)
}

// Square.prototype = {
//   constructor: Square,
//   discoverAdjSquares:function() {
//     look at squares adjacent on grid:
//     setToDiscovered(adjSquare);
//   },
//   getNumTouchingMines:function() {
//     // look at adjacent squares on grid. return count that hasMine
//   },
//   getView:function() {},
//   actOnRightClick:function(game) {
//     if (this.isDiscovered) { return false; }

//     if (this.view === " ") {
//       if (game.numFlagsLeft > 0) {
//         this.view = "F";
//       }
//     }
//   },
//   setToDiscovered:function() {
//     if (hasMine) {

//     } else if (getNumTouchingMines > 0) {

//     } else { // is a "blank square"
//       discoverAdjSquares
//     }
//   },
//   setView:function() {},
//   setViewToFlag:function() {
//   },
//   setViewToQuestion:function() {}
// }

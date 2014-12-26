// Start with a 9x9 board with 10 mines.

// numFlags = numMines

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

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
        var row = new Square(col_i, row_i);
        col.push(row);
      }
    }
  }

  // Place mines:
  var countOfMinesPlaced = 0;
  while (countOfMinesPlaced < numMines) {
    var x_coor = getRandomInt(0, 8);
    var y_coor = getRandomInt(0, 8);
    var sqr = this.grid[x_coor][y_coor];
    if (sqr.hasMine === false) {
      sqr.hasMine = true;
      countOfMinesPlaced++;
    }
  }

  // Set numTouchingMines prop on squares.
  {
    // iterate through grid
    // for each square, call setNumTouchingMines().
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
  
function Square(x_coor, y_coor) {
  this.adjSquares = this.setAdjSquares(x_coor, y_coor);
  this.isDiscovered = false;
  this.hasMine = false;
  this.numTouchingMines = null;
  this.view = " "; //   view (Mine, numMines, flag, question, blank)
}

Square.prototype = {
  constructor: Square,
//   discoverAdjSquares:function() {
//     look at squares adjacent on grid:
//     setToDiscovered(adjSquare);
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
  setAdjSquares:function(x_coor, y_coor) {
    // Iterate through 8 possible adj square coordinate combinations.
    // If coordinates are non-neg, check if on grid. Add if so.
    var coorCombos = [];
    for (var i = -1; i <= 1; i++) {
      var x_coorNew = x_coor + i;
      if (x_coorNew >= 0) {
        for (var j = -1; j <= 1; j++) {
          var y_coorNew = y_coor + j;
          if (y_coorNew >= 0) { coorCombos.push([x_coorNew, y_coorNew]); }
        }
      }
    }
  },
  setNumTouchingMines:function(x_coor, y_coor) {
    // Look at 8 possible adj sqrs
    // look at adjacent squares on grid. set this.numTouchingMines to
    // count.
  },
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
}

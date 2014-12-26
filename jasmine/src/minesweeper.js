// Start with a 9x9 board with 10 mines.

// numFlags = numMines

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function Game(gridSize, numMines) {
  this.numFlagsPlaced = 0;
  this.numMines = numMines;
  this.numSquaresDiscovered = 0;

  // Build this.grid:
  {
    this.grid = [];
    for (var col_i = 0; col_i < gridSize; col_i++) {
      var col = [];
      this.grid.push(col);
      for (var row_i = 0; row_i < gridSize; row_i++) {
        var row = new Square(gridSize, [col_i, row_i]);
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
  
function Square(gridSize, coordinates) {
  this.coordinates = coordinates;
  this.isDiscovered = false;
  this.hasMine = false;
  this.numTouchingMines = null;
  this.view = " "; //   view (Mine, numMines, flag, question, blank)

  // Init functions:
  this.adjSquaresCoors = this.getAdjacentSquaresCoors(gridSize);
}

Square.prototype = {
  constructor: Square,
//   discoverAdjacentSquares:function() {
//     look at squares adjacent on grid:
//     setToDiscovered(adjSquare);
//   },
  getAdjacentSquaresCoors:function(gridSize) {
    var resAry = [];
    var x_coor = this.coordinates[0];
    var y_coor = this.coordinates[1];

    // Iterate through 8 possible adj square coordinate combinations.
    // If coordinates are non-negative, add to result array.
    for (var i = -1; i <= 1; i++) {
      var x_coorNew = x_coor + i;
      if (0 <= x_coorNew && x_coorNew <= gridSize) {
        for (var j = -1; j <= 1; j++) {
          var y_coorNew = y_coor + j;
          if (0 <= y_coorNew && y_coorNew <= gridSize) {
            resAry.push([x_coorNew, y_coorNew]);
          }
        }
      }
    }
    return resAry;
  },
//   getView:function() {},
//   actOnRightClick:function(game) {
//     if (this.isDiscovered) { return false; }

//     if (this.view === " ") {
//       if (game.numFlagsLeft > 0) {
//         this.view = "F";
//       }
//     }
//   },
  setNumTouchingMines:function(x_coor, y_coor) {
    // Look at 8 possible adj sqrs
    // look at adjacent squares on grid. set this.numTouchingMines to
    // count.
  },
//   setToDiscovered:function() {
//     if (hasMine) {

//     } else if (getNumTouchingMines > 0) {

//     } else { // is a "blank square"
//       discoverAdjacentSquares
//     }
//   },
//   setView:function() {},
//   setViewToFlag:function() {
//   },
//   setViewToQuestion:function() {}
}

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
        var row = new Square(this, gridSize, [col_i, row_i]);
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
      sqr.view = '<div class="cell">m</div>';
      countOfMinesPlaced++;
    }
  }

  // Set numTouchingMines prop on squares.
  {
    var grid = this.grid;
    grid.forEach(function(col) {
      col.forEach(function(cell) {
        cell.adjacentSquaresCoors.forEach(function(coors) {
          x_coor = coors[0];
          y_coor = coors[1];
          if (grid[x_coor][y_coor].hasMine === true) {
            cell.numTouchingMines++;
          }
        });

        if (cell.hasMine === false) {
          cell.view = '<div class="cell">' + cell.numTouchingMines + '</div>';
        }
      });
    });
  }
}

Game.prototype = {
  constructor: Game,
  checkVictory:function() {
    if (Math.pow(this.grid.length, 2) - this.numSquaresDiscovered === this.numMines) {
      this.victory = true;
      alert("You've won!! : D");
    }
  },
  divCoorsToInt:function(coorsStr) {
    var coorsIntAry = [];
    var coorsStrAry = coorsStr.split(",");
    coorsIntAry[0] = parseInt(coorsStrAry[0]);
    coorsIntAry[1] = parseInt(coorsStrAry[1]);
    return coorsIntAry;
  },
  renderGrid:function() {
    var htmlStr = '<div id="grid">';
    this.grid.forEach(function(col) {
      htmlStr = htmlStr + '<div class="col">';

      var rowHtmlStr = '';
      col.forEach(function(cell) {
        if (cell.isDiscovered === true) {
          rowHtmlStr = cell.view + rowHtmlStr;
        } else {
          rowHtmlStr = cell.viewUndiscovered + rowHtmlStr;
        }
      });
      htmlStr = htmlStr + rowHtmlStr + '</div>';
    });
    htmlStr = htmlStr + '</div>';

    $('div#content').html(htmlStr);
  }
}

function Square(game, gridSize, coordinates) {
  // REFERENCES:
  this.game = game;

  // PROPS:
  this.coordinates = coordinates;
  this.isDiscovered = false;
  this.hasMine = false;
  this.numTouchingMines = 0;
  this.view = '<div class="cell" id="' + this.coordinates + '">..</div>';
  this.viewType = "blank";
  this.viewUndiscovered = '<div class="cell" id="' + this.coordinates +
    '">_</div>';
  //   view (Mine, numMines, flag, question, blank)

  // Init functions:
  this.adjacentSquaresCoors = this.getAdjacentSquaresCoors(gridSize);
}

Square.prototype = {
  constructor: Square,
  discoverAdjacentSquares:function() {
    this.adjacentSquaresCoors.forEach(function(coors) {
      var square = this.game.grid[coors[0]][coors[1]];
      if (square.isDiscovered === false) { square.setToDiscovered(); }
    }, this);
  },
  getAdjacentSquaresCoors:function(gridSize) {
    var resAry = [];
    var x_coor = this.coordinates[0];
    var y_coor = this.coordinates[1];

    // Iterate through 8 possible adj square coordinate combinations.
    // If coordinates are non-negative and inside grid, add to result array.
    for (var i = -1; i <= 1; i++) {
      var x_coorNew = x_coor + i;
      if (0 <= x_coorNew && x_coorNew <= gridSize - 1) {
        for (var j = -1; j <= 1; j++) {
          var y_coorNew = y_coor + j;
          if (0 <= y_coorNew && y_coorNew <= gridSize - 1) {
            if (x_coorNew == x_coor && y_coorNew == y_coor) { continue; }
            else { resAry.push([x_coorNew, y_coorNew]); }
          }
        }
      }
    }
    return resAry;
  },
  actOnRightClick:function() {
    if (this.isDiscovered) { return false; }

    switch(this.viewType) {
      case "blank":
        this.viewType = "flag";
        this.viewUndiscovered = '<div class="cell" id="' + this.coordinates +
    '">F</div>';
        break;
      case "flag":
        this.viewType = "question";
        this.viewUndiscovered = '<div class="cell" id="' + this.coordinates +
    '">?</div>';
        break;
      case "question":
        this.viewType = "blank";
        this.viewUndiscovered = '<div class="cell" id="' + this.coordinates +
    '">_</div>';
        break;
    }
  },
  setToDiscovered:function() {
    this.isDiscovered = true;
    this.game.numSquaresDiscovered++;
    if (this.hasMine === true) {
      alert("Game over, you got explodanated!!");
      this.game.grid.forEach(function(col) {
        col.forEach(function(cell) {
          cell.isDiscovered = true;
        });
      });
    } else if (this.numTouchingMines === 0) { // is a "blank square"
      this.discoverAdjacentSquares();
      // discoverAdjacentSquares
    }
  }
}

function getCell(jQObj, game) {
  var coors = game.divCoorsToInt(jQObj.attr('id'));
  var cell = game.grid[coors[0]][coors[1]];
  return cell;
}

function actOnClickedCell(jQObj, game, callback) {
  var cell = getCell(jQObj, game);
  callback.call(cell);
  game.renderGrid();
}

$(document).ready(function(){
  var game = new Game(9, 10);
  game.renderGrid();
  $('div#content').on('click', '.cell', function(){
    actOnClickedCell($(this), game, function() {
      this.setToDiscovered();
      game.checkVictory();
    });
  });
  $('div#content').on('contextmenu', '.cell', function(e){
    e.preventDefault();

    actOnClickedCell($(this), game, function() {
      this.actOnRightClick();
    });
  });
});
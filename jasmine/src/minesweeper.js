function getCoorsInts (strCoors) {
  var intAry = [];
  var strAryCoors = strCoors.split(',');
  intAry[0] = parseInt(strAryCoors[0]);
  intAry[1] = parseInt(strAryCoors[1]);
  return intAry;
}

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function Game (gridSize, numMines) {
  this.numFlagsPlaced = 0;
  this.numMines = numMines;
  this.numSquaresDiscovered = 0;

  this.grid = this.buildGrid(gridSize);

  // Place mines:
  var countOfMinesPlaced = 0;
  while (countOfMinesPlaced < numMines) {
    var x_coor = getRandomInt(0, gridSize);
    var y_coor = getRandomInt(0, gridSize);
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
  
  buildGrid:function (gridSize) {
    var grid = [];
    
    for (var x=0; x<gridSize; x++) {
      var col = [];
      grid.push(col);
      
      for (var y=0; y<gridSize; y++) {
        col.push(new Square(this, gridSize, [x, y]));
      }
    }
    return grid;
  },
  checkVictory:function () {
    if (Math.pow(this.grid.length, 2) - this.numSquaresDiscovered === this.numMines) {
      clearInterval(intervalID);
      alert("You've won!! : D");
    }
  },
  getCell:function (cellDiv) {
    var coors = getCoorsInts(cellDiv.attr('id'));
    return game.grid[coors[0]][coors[1]];
  },
  renderGrid:function () {
    var htmlStr = '<div id="grid">';
    this.grid.forEach(function(col) {
      htmlStr = htmlStr + '<div class="col">';

      var rowHtmlStr = '';
      col.forEach(function (cell) {
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

  // INIT FUNCTIONS:
  this.adjacentSquaresCoors = this.getAdjacentSquaresCoors(gridSize);
}

Square.prototype = {
  constructor: Square,
  
  discoverAdjacentSquares:function () {
    this.adjacentSquaresCoors.forEach(function (coors) {
      var square = this.game.grid[coors[0]][coors[1]];

      if (square.isDiscovered === false) {
        square.setToDiscovered();
        this.game.numSquaresDiscovered += 1;
      }
    }, this);
  },
  getAdjacentSquaresCoors:function (gridSize) {
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
  actOnRightClick:function () {
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
  setToDiscovered:function () {
    this.isDiscovered = true;

    if (this.hasMine === true) {
      clearInterval(intervalID);
      alert("Game over, you got explodanated!!");
      this.game.grid.forEach(function (col) {
        col.forEach(function (cell) {
          cell.isDiscovered = true;
        });
      });
    } else if (this.numTouchingMines === 0) {
      this.discoverAdjacentSquares();
    }
  }
}

// GAME INIT:
var gridSize = prompt("Welcome to Minesweeper!\n" +
                         "How long should each side of the Grid be?");
var numMines = prompt("How many mines should there be?");
var game = new Game(parseInt(gridSize), parseInt(numMines));

var time = 0;
var intervalID = setInterval(function () {
  time++;
  $('button#timer').html('<button id="timer">Time: ' + time + '</button>');
}, 1000);

$(document).ready(function (){
  game.renderGrid();

  $('div#content').on('click', '.cell', function (){
    game.getCell($(this)).setToDiscovered();
    game.numSquaresDiscovered += 1;
    game.checkVictory();
    game.renderGrid();
  });
  $('div#content').on('contextmenu', '.cell', function (e){
    e.preventDefault();

    game.getCell($(this)).actOnRightClick();
    game.renderGrid();
  });
});

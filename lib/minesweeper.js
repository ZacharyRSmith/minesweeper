function getCoorsFromStr (str) {
  var strAry = str.split(',');
  return [parseInt(strAry[0]), parseInt(strAry[1])];
}

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function Game (gridSize, numMines) {
  this.numMines = numMines;
  this.numSquaresDiscovered = 0;

  this.grid = this.buildGrid(gridSize);
  this.placeMines();
  this.setNumTouchingMines();
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
    
    if (Math.pow(this.grid.length, 2) - this.numSquaresDiscovered ===
                                                      this.numMines) {
      clearInterval(intervalID);
      alert("You've won!! : D");
    }
  },
  
  discoverAdjacentSquares:function (sqr) {
    var adjSqrs = this.getAdjacentSquares(sqr);
    
    adjSqrs.forEach(function (adjSqr) {
      
      if (adjSqr.isDiscovered) { return; }
      
      adjSqr.discover();
    });
  },
  
  discoverEverySquare:function () {
    this.grid.forEach(function (col) {
      col.forEach(function (sqr) {
        sqr.isDiscovered = true;
      });
    });
  },

  end:function () {
    clearInterval(intervalID);
    alert("Game over, you got explodanated!!");
    this.discoverEverySquare();
  },
    
  getAdjacentSquares:function (sqr) {
    var adjSqrs = [];
    var x = sqr.coordinates[0];
    var y = sqr.coordinates[1];

    [-1, 0, 1].forEach(function (addX) {
      crntX = x + addX;

      [-1, 0, 1].forEach(function (addY) {
        crntY = y + addY;
        
        // If no change were made to x or y, then crntX and crntY would
        // equal the param square's coordinates, so skip.
        if (addX === 0 && addY === 0) { return; }

        var crntSqr = this.getSquare([crntX, crntY]);

        if (!crntSqr) { return; }

        adjSqrs.push(crntSqr);
      }, this);
    }, this);
    return adjSqrs;
  },
  
  getSquareFromDiv:function (div) {
    return this.getSquare(getCoorsFromStr(div.attr('id')));
  },
  
  getSquare:function (coors) {
    var x = coors[0];
    var y = coors[1];

    if (!this.grid[x] || !this.grid[x][y]) { return; }
    
    return this.grid[x][y];
  },
  
  placeMines:function () {
    var minesPlaced = 0;
    
    while (minesPlaced < numMines) {
      var x = getRandomInt(0, gridSize);
      var y = getRandomInt(0, gridSize);
      var sqr = this.getSquare([x, y]);
      
      if (sqr.hasMine) { continue; }
      
      sqr.placeMine();
      minesPlaced += 1;
    }
  },
  
  renderGrid:function () {
    var htmlStr = '<div id="grid">';
    
    this.grid.forEach(function(col) {
      htmlStr = htmlStr + '<div class="col">';

      var rowHtmlStr = '';
      col.forEach(function (sqr) {
        
        if (sqr.isDiscovered) {
          rowHtmlStr = sqr.view + rowHtmlStr;
        } else {
          rowHtmlStr = sqr.viewUndiscovered + rowHtmlStr;
        }
      });
      htmlStr = htmlStr + rowHtmlStr + '</div>';
    });
    htmlStr = htmlStr + '</div>';

    $('div#grid').html(htmlStr);
  },

  setNumTouchingMines:function() {
    
    this.grid.forEach(function (col) {
      
      col.forEach(function (sqr) {
        sqr.setNumTouchingMines();
      });
    }, this);
  }
}

function Square(game, gridSize, coordinates) {
  this.game = game;

  this.coordinates = coordinates;
  this.isDiscovered = false;
  this.hasMine = false;
  this.numTouchingMines = 0;
  this.view = '<div class="sqr" id="' + this.coordinates + '">..</div>';
  this.viewType = "blank";
  this.viewUndiscovered = '<div class="sqr" id="' + this.coordinates +
      '">_</div>';
}

Square.prototype = {
  constructor: Square,

  discover:function () {
    if (this.isDiscovered) { return; }
    if (this.hasMine) {
      this.game.end();
      return;
    }
    
    this.isDiscovered = true;
    this.game.numSquaresDiscovered += 1;

    if (this.numTouchingMines === 0) {
      this.game.discoverAdjacentSquares(this);
    }
  },

  actOnRightClick:function () {
    if (this.isDiscovered) { return; }

    switch(this.viewType) {
      case "blank":
        this.viewType = "flag";
        this.viewUndiscovered = '<div class="sqr" id="' + this.coordinates +
            '">F</div>';
        break;
      case "flag":
        this.viewType = "question";
        this.viewUndiscovered = '<div class="sqr" id="' + this.coordinates +
            '">?</div>';
        break;
      case "question":
        this.viewType = "blank";
        this.viewUndiscovered = '<div class="sqr" id="' + this.coordinates +
            '">_</div>';
        break;
    }
  },

  placeMine:function () {
    this.hasMine = true;
    this.view = '<div class="sqr">m</div>';
  },

  setNumTouchingMines:function () {
    
    this.game.getAdjacentSquares(this).forEach(function (adjSqr) {
      if (adjSqr.hasMine) { this.numTouchingMines += 1; }
    }, this);
    
    if (!this.hasMine) {
      this.view = '<div class="sqr">' + this.numTouchingMines + '</div>';
    }
  }
}

// GAME INIT:
var gridSize = prompt("Welcome to Minesweeper!\n" +
                         "How long should each side of the Grid be?");
var numMines = prompt("How many mines should there be?");
var game = new Game(parseInt(gridSize), parseInt(numMines));

// TIMER:
var time = 0;
var intervalID = setInterval(function () {
  time++;
  $('button#timer').html('<button id="timer">Time: ' + time + '</button>');
}, 1000);

$(document).ready(function (){
  game.renderGrid();

  $('div#grid').on('click', '.sqr', function (){
    game.getSquareFromDiv($(this)).discover();
    game.checkVictory();
    game.renderGrid();
  });
  $('div#grid').on('contextmenu', '.sqr', function (e){
    e.preventDefault();

    game.getSquareFromDiv($(this)).actOnRightClick();
    game.renderGrid();
  });
});

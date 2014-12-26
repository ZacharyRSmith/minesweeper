describe("minesweeper.js", function() {
  describe("Game constructor", function() {
    var game = new Game(9, 10);

    it("should construct an 'instanceof' Game", function() {
      expect(game instanceof Game).toEqual(true);
    });

    it("should use params to set props", function() {
      expect(game.grid.length).toEqual(9);
      expect(game.numMines).toEqual(10);
    });

    it("should have a grid with as many mines as param specifies", function() {
      var mineCount = 0;
      for (var col_i in game.grid) {
        var col = game.grid[col_i];
        for (var row_i in col) {
          var row = col[row_i];
          if (row.hasMine === true) { mineCount++; }
        }
      }
      expect(mineCount).toEqual(10);
    });
  });
});
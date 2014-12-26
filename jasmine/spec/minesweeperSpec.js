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
  });
});
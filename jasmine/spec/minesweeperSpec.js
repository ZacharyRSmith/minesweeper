describe("minesweeper.js", function() {
  describe("Game constructor", function() {
    it("should construct an 'instanceof' Game", function() {
      var game = new Game();
      expect(game instanceof Game).toEqual(true);
    });
  });
});
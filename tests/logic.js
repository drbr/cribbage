var expect = chai.expect;

describe("Logic", function() {

  var aceOfClubs = { rank: "A", suit: "C" };
  var twoOfHearts = { rank: "2", suit: "H" };
  var sevenOfDiamonds = { rank: "7", suit: "D" };
  var queenOfSpades = { rank: "Q", suit: "S" };
  var kingOfSpades = { rank: "K", suit: "S" };
  var kingOfDiamonds = { rank: "K", suit: "D" };

  describe("cardRankComparator", function() {
    it("should compare cards properly", function() {
      expect(Logic.cardRankComparator(aceOfClubs, twoOfHearts)).to.be.below(0);
      expect(Logic.cardRankComparator(queenOfSpades, twoOfHearts)).to.be.above(0);
      expect(Logic.cardRankComparator(queenOfSpades, kingOfSpades)).to.be.below(0);
      expect(Logic.cardRankComparator(sevenOfDiamonds, twoOfHearts)).to.be.above(0);
      expect(Logic.cardRankComparator(kingOfSpades, kingOfDiamonds)).to.equal(0);
    });
  });

  describe("scoreHand", function() {
    it("should sort the hand correctly", function() {
      var cards = [queenOfSpades, sevenOfDiamonds, aceOfClubs, kingOfDiamonds];
      var starter = twoOfHearts;

      var sortedHand = Logic.scoreHand(cards, starter);
      expect(sortedHand).to.eql([aceOfClubs, twoOfHearts, sevenOfDiamonds, queenOfSpades, kingOfDiamonds]);
    });
  });
});
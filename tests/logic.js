describe("Cards", function() {
  describe("cardRankComparator", function() {
    it("should compare cards properly", function() {
      expect(Cards.cardRankComparator(AceOfClubs, TwoOfHearts)).to.be.below(0);
      expect(Cards.cardRankComparator(QueenOfSpades, TwoOfHearts)).to.be.above(0);
      expect(Cards.cardRankComparator(QueenOfSpades, KingOfSpades)).to.be.below(0);
      expect(Cards.cardRankComparator(SevenOfDiamonds, TwoOfHearts)).to.be.above(0);
      expect(Cards.cardRankComparator(KingOfSpades, KingOfDiamonds)).to.equal(0);
    });
  });
});

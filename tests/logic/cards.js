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

  describe("isValid", function() {
    it("should return false for an empty object", function() {
      expect(Cards.isValid({})).to.be.false;
    });

    it("should return false for inputs that are not objects", function() {
      expect(Cards.isValid(null)).to.be.false;
      expect(Cards.isValid(undefined)).to.be.false;
      expect(Cards.isValid(1)).to.be.false;
      expect(Cards.isValid(false)).to.be.false;
      expect(Cards.isValid(true)).to.be.false;
      expect(Cards.isValid(0)).to.be.false;
      expect(Cards.isValid('foo')).to.be.false;
      expect(Cards.isValid([])).to.be.false;
      expect(Cards.isValid(['foo'])).to.be.false;
    });

    it("should return true for a correctly specified card", function() {
      expect(Cards.isValid(KingOfDiamonds)).to.be.true;
    });

    it("should return false when the object does not contain all the fields", function() {
      expect(Cards.isValid({suit:'D'})).to.be.false;
      expect(Cards.isValid({rank:'6'})).to.be.false;
    });

    it("should return false when the fields are not one of the allowable values", function() {
      expect(Cards.isValid({suit:'X', rank:'3'})).to.be.false;
      expect(Cards.isValid({suit:'D', rank:'1'})).to.be.false;
      expect(Cards.isValid({suit:'X', rank:'1'})).to.be.false;
    });
  });
});

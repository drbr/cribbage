describe("Cards", function() {
  describe("cardRankComparator", function() {
    it("should compare cards properly", function() {
      expect(Cards.cardRankComparator(AceOfClubs, TwoOfHearts)).to.be.below(0);
      expect(Cards.cardRankComparator(QueenOfSpades, TwoOfHearts)).to.be.above(0);
      expect(Cards.cardRankComparator(QueenOfSpades, KingOfSpades)).to.be.below(0);
      expect(Cards.cardRankComparator(SevenOfDiamonds, TwoOfHearts)).to.be.above(0);
      expect(Cards.cardRankComparator(KingOfSpades, KingOfDiamonds)).to.equal(0);
      expect(Cards.cardRankComparator(TenOfClubs, TwoOfHearts)).to.be.above(0);
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


  describe("Small functions", function() {
    it("rankOrder should be in ascending order", function() {
      expect(_.isEqual(Cards.rankOrder,
        ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'])).to.be.true;
    });

    it("toString should return the proper string representation of a card", function() {
      expect(Cards.toString({rank: 'Q', suit: 'S'})).to.equal('Queen of Spades');
    });

    it("toString should return the empty string for an invalid card", function() {
      expect(Cards.toString({foo: 'bar'})).to.equal('');
    });

    it("toSymbol should return the abbreviated string representation of a card", function() {
      expect(Cards.toSymbol(QueenOfSpades)).to.equal('Q\u2660');
    });

    it("toSymbol should return the empty string for an invalid card", function() {
      expect(Cards.toSymbol({foo: 'bar'})).to.equal('');
    });

    it("suitSymbol should return the appropriate symbol for a suit", function() {
      expect(Cards.suitSymbol(QueenOfSpades.suit)).to.equal('\u2660');
    });

    it("suitSymbol should return the empty string for an undefined suit", function() {
      expect(Cards.suitSymbol()).to.equal('');
    });

    it("suitColor should return red for red cards", function() {
      expect(Cards.suitColor(SixOfDiamonds.suit)).to.equal('red');
      expect(Cards.suitColor(TwoOfHearts.suit)).to.equal('red');
      });

    it("suitColor should return black for black cards", function() {
      expect(Cards.suitColor(QueenOfSpades.suit)).to.equal('black');
      expect(Cards.suitColor(KingOfClubs.suit)).to.equal('black');
    });

    it("suitColor should return the empty string for an undefined suit", function() {
      expect(Cards.suitColor()).to.equal('');
    });

    it("hash should concatenate the rank and suit", function() {
        expect(Cards.hash(QueenOfSpades)).to.equal('SQ');
        expect(Cards.hash(TwoOfDiamonds)).to.equal('D2');
      });

    it("getSortRank should give the sorted integer rank for a card", function() {
      expect(Cards.getSortRank(QueenOfSpades)).to.equal(12);
      expect(Cards.getSortRank(SixOfDiamonds)).to.equal(6);
      expect(Cards.getSortRank(AceOfClubs)).to.equal(1);
    });

    it("getPointRank should give the number of points for a card", function() {
      expect(Cards.getPointRank(QueenOfSpades)).to.equal(10);
      expect(Cards.getPointRank(SixOfDiamonds)).to.equal(6);
      expect(Cards.getPointRank(AceOfClubs)).to.equal(1);
    });
  });
  
});

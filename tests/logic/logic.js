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

describe("Logic", function() {
  describe("findDuplicates", function() {

    function expectResult(cards, result) {
      expect(Logic.findDuplicates(cards)).to.eql(result);
    }

    it("should return an empty array when there are no duplicates", function() {
      var cards = [KingOfClubs, FiveOfHearts, JackOfSpades];
      expectResult(cards, []);
    });

    it("should return one item when there are two or three identical cards", function() {
      var cards = [KingOfClubs, EightOfClubs, KingOfClubs];
      expectResult(cards, [KingOfClubs]);

      cards = [KingOfClubs, EightOfClubs, KingOfClubs, KingOfClubs, SixOfHearts];
      expectResult(cards, [KingOfClubs]);
    });

    it("should return multiple items when there are multiple sets of matching cards", function() {
      var cards = [KingOfClubs, EightOfClubs, KingOfClubs, SixOfHearts, SixOfHearts];
      expectResult(cards, [KingOfClubs, SixOfHearts]);
    });

    it("should ignore invalid cards", function() {
      var cards = [{}, {}, ThreeOfSpades];
      expectResult(cards, []);

      cards = [{}, null, ThreeOfSpades, null];
      expectResult(cards, []);

      cards = [ThreeOfSpades, {rank: 'A'}, {rank: 'A'}, ThreeOfSpades];
      expectResult(cards, [ThreeOfSpades]);
    });
  });

  describe("validHand", function() {
    it("should return false if there are too few or too many cards", function() {
      var cards = [KingOfClubs, EightOfClubs, SixOfHearts, FiveOfDiamonds, SixOfDiamonds];
      expect(Logic.validHand(cards, AceOfClubs)).to.be.false;

      cards = [NineOfSpades, KingOfSpades, FiveOfClubs];
      expect(Logic.validHand(cards, SixOfDiamonds)).to.be.false;
    });

    it("should return false if there are duplicates", function() {
      var cards = [KingOfClubs, EightOfClubs, KingOfClubs, ThreeOfSpades];
      expect(Logic.validHand(cards, AceOfClubs)).to.be.false;

      cards = [KingOfClubs, EightOfClubs, AceOfClubs, ThreeOfSpades];
      expect(Logic.validHand(cards, KingOfClubs)).to.be.false;
    });

    it("should return false if any of the cards are invalid", function() {
      var cards = [EightOfClubs, SevenOfDiamonds, null, FiveOfSpades];
      expect(Logic.validHand(cards, NineOfHearts)).to.be.false;

      cards = [EightOfClubs, SevenOfDiamonds, null, FiveOfSpades, TwoOfHearts];
      expect(Logic.validHand(cards, NineOfHearts)).to.be.false;

      cards = [EightOfClubs, SevenOfDiamonds, {rank: '7'}, FiveOfSpades];
      expect(Logic.validHand(cards, NineOfHearts)).to.be.false;
    });

    it("should return true if the hand is well-formed", function() {
      var cards = [EightOfClubs, FiveOfSpades, ThreeOfSpades, KingOfDiamonds];
      expect(Logic.validHand(cards, SixOfHearts)).to.be.true;
    });
  });
});
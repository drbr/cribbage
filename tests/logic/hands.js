describe("Hands", function() {
  describe("findDuplicates", function() {

    function expectResult(cards, result) {
      expect(Hands.findDuplicates(cards)).to.eql(result);
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
      expect(Hands.validHand(cards, AceOfClubs)).to.be.false;

      cards = [NineOfSpades, KingOfSpades, FiveOfClubs];
      expect(Hands.validHand(cards, SixOfDiamonds)).to.be.false;
    });

    it("should return false if there are duplicates", function() {
      var cards = [KingOfClubs, EightOfClubs, KingOfClubs, ThreeOfSpades];
      expect(Hands.validHand(cards, AceOfClubs)).to.be.false;

      cards = [KingOfClubs, EightOfClubs, AceOfClubs, ThreeOfSpades];
      expect(Hands.validHand(cards, KingOfClubs)).to.be.false;
    });

    it("should return false if any of the cards are invalid", function() {
      var cards = [EightOfClubs, SevenOfDiamonds, null, FiveOfSpades];
      expect(Hands.validHand(cards, NineOfHearts)).to.be.false;

      cards = [EightOfClubs, SevenOfDiamonds, null, FiveOfSpades, TwoOfHearts];
      expect(Hands.validHand(cards, NineOfHearts)).to.be.false;

      cards = [EightOfClubs, SevenOfDiamonds, {rank: '7'}, FiveOfSpades];
      expect(Hands.validHand(cards, NineOfHearts)).to.be.false;
    });

    it("should return true if the hand is well-formed", function() {
      var cards = [EightOfClubs, FiveOfSpades, ThreeOfSpades, KingOfDiamonds];
      expect(Hands.validHand(cards, SixOfHearts)).to.be.true;
    });
  });
});
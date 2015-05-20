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

  describe("generateDeck", function() {
    
    var deck;

    beforeEach(function() {
      deck = Hands.generateDeck();
    });

    it("should generate 52 cards", function() {
      expect(deck.length).to.equal(52);
    });

    it("the cards should be in ascending sorted order", function() {
      expect(deck[0]).to.eql(AceOfClubs);
      expect(deck[1]).to.eql(AceOfSpades);
      expect(deck[2]).to.eql(AceOfHearts);
      expect(deck[3]).to.eql(AceOfDiamonds);
      expect(deck[6]).to.eql(TwoOfHearts);
      expect(deck[45]).to.eql(QueenOfSpades);
      expect(deck[51]).to.eql(KingOfDiamonds);
    });
  });

  it("Chai's \"contains\" assertion compares objects using deep equality", function() {
    var foo = { a: 'foo', b: 'bar' };
    var baz = { a: 'foo', b: 'bar' };
    var fooArray = [foo];
    expect(foo).to.eql(baz);
    expect(fooArray).to.contain(baz);
    expect(fooArray).to.eql([ { a: 'foo', b: 'bar' } ]);
  });

  describe("scoreForEachStarter", function() {
    var cards = [TwoOfHearts, FiveOfClubs, TenOfClubs, SixOfSpades];

    it("should deal with null/undefined nonStarters", function() {
      expect(Hands.scoreForEachStarter(cards)).to.have.length(48);
      expect(Hands.scoreForEachStarter(cards, null)).to.have.length(48);
      expect(Hands.scoreForEachStarter(cards, [])).to.have.length(48);
    });

    it("should not consider cards that are nonStarters", function() {
      var nonStarters = [JackOfSpades, FiveOfDiamonds];
      var scoresForEachStarter = Hands.scoreForEachStarter(cards, nonStarters);
      var startersConsidered = scoresForEachStarter.map(function(obj) {
        return obj.starter;
      });

      expect(scoresForEachStarter).to.have.length(46);
      cards.concat(nonStarters).forEach(function(missingCard) {
        expect(startersConsidered).to.not.contain(missingCard);
      });
    });

    it("should evaluate the scores correctly for each hand", function() {
      var scoresForEachStarter = Hands.scoreForEachStarter(cards);
      expect(scoresForEachStarter).to.have.length(48);
      expect(scoresForEachStarter[0]).to.eql({ starter: AceOfClubs, score: 2 });
    });
  });

  describe("scoreBreakdownsByHand", function() {
    it("should have some tests", function() {
      throw new Error("Write some tests for this!");
    });
  });
});
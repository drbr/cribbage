describe("Scoring", function() {

  function makeCards(ranks) {
    return ranks.map(function(value) {
      return { rank: value };
    });
  }

  describe("scorePairs", function() {

    function expectPoints(sortedHand, points) {
      expect(Scoring.scorePairs(makeCards(sortedHand))).to.equal(points);
    }

    it("should award zero points when there are no pairs", function() {
      var sortedHand = ["3", "5", "6", "7", "K"];
      expectPoints(sortedHand, 0);
    });

    it("should award two points for one pair", function() {
      var sortedHand = ["3", "5", "6", "6", "K"];
      expectPoints(sortedHand, 2);
     
      sortedHand = ["A", "A", "3", "5", "K"];
      expectPoints(sortedHand, 2);
     
      sortedHand = ["A", "2", "3", "K", "K"];
      expectPoints(sortedHand, 2);
    });

    it("should award four points for two pairs", function() {
      var sortedHand = ["5", "5", "6", "6", "7"];
      expectPoints(sortedHand, 4);
     
      sortedHand = ["A", "A", "Q", "K", "K"];
      expectPoints(sortedHand, 4);
     
      sortedHand = ["9", "10", "10", "J", "J"];
      expectPoints(sortedHand, 4);
    });

    it("should award six points for a set of three ", function() {
      var sortedHand = ["3", "3", "3", "7", "K"];
      expectPoints(sortedHand, 6);

      sortedHand = ["A", "3", "3", "3", "K"];
      expectPoints(sortedHand, 6);

      sortedHand = ["A", "3", "8", "8", "8"];
      expectPoints(sortedHand, 6);
    });

    it("should award eight points for a set of two and a set of three", function() {
      var sortedHand = ["3", "3", "3", "7", "7"];
      expectPoints(sortedHand, 8);

      sortedHand = ["3", "3", "7", "7", "7"];
      expectPoints(sortedHand, 8);
    });

    it("should award twelve points for a set of four", function() {
      var sortedHand = ["Q", "Q", "Q", "Q", "K"];
      expectPoints(sortedHand, 12);

      sortedHand = ["J", "Q", "Q", "Q", "Q"];
      expectPoints(sortedHand, 12);
    });
  });

  describe("scoreRuns", function() {

    function expectPoints(sortedHand, points) {
      expect(Scoring.scoreRuns(makeCards(sortedHand))).to.equal(points);
    }

    it("should award zero points for no consecutive cards", function() {
      var sortedHand = ["A", "3", "6", "J", "K"];
      expectPoints(sortedHand, 0);
    });

    it("should award zero points for a run of two", function() {
      var sortedHand = ["A", "3", "6", "7", "K"];
      expectPoints(sortedHand, 0);

      sortedHand = ["7", "8", "8", "K", "K"];
      expectPoints(sortedHand, 0);

      sortedHand = ["3", "3", "4", "6", "7"];
      expectPoints(sortedHand, 0);
    });

    it("should award three points for a run of three", function() {
      var sortedHand = ["3", "6", "7", "8", "Q"];
      expectPoints(sortedHand, 3);

      sortedHand = ["3", "4", "5", "8", "8"];
      expectPoints(sortedHand, 3);
    });

    it("should award three points for a run of two and a run of three", function() {
      var sortedHand = ["A", "2", "6", "7", "8"];
      expectPoints(sortedHand, 3);
    });

    it("should award four points for a run of four", function() {
      var sortedHand = ["6", "7", "8", "9", "J"];
      expectPoints(sortedHand, 4);
    });

    it("should award five points for a run of five", function() {
      var sortedHand = ["5", "6", "7", "8", "9"];
      expectPoints(sortedHand, 5);
    });

    it("should award six points for a double run of three", function() {
      var sortedHand = ["4", "7", "8", "8", "9"];
      expectPoints(sortedHand, 6);
    });

    it("should award eight points for a double run of four", function() {
      var sortedHand = ["6", "7", "8", "8", "9"];
      expectPoints(sortedHand, 8);
    });

    it("should award twelve points for a double-double run", function() {
      var sortedHand = ["6", "7", "7", "8", "8"];
      expectPoints(sortedHand, 12);

      sortedHand = ["6", "6", "7", "7", "8"];
      expectPoints(sortedHand, 12);

      sortedHand = ["6", "6", "7", "8", "8"];
      expectPoints(sortedHand, 12);
    });

    it("should award nine points for a triple run", function() {
      var sortedHand = ["3", "4", "4", "4", "5"];
      expectPoints(sortedHand, 9);

      sortedHand = ["3", "3", "3", "4", "5"];
      expectPoints(sortedHand, 9);

      sortedHand = ["3", "4", "5", "5", "5"];
      expectPoints(sortedHand, 9);
    });
  });

  describe("scoreFifteens", function() {

    function expectPoints(hand, points) {
      expect(Scoring.scoreFifteens(makeCards(hand))).to.equal(points);
    }

    it("should award zero points when nothing adds to 15", function() {
      var hand = ["3", "4", "7", "9", "Q"];
      expectPoints(hand, 0);
    });

    it("should award two points for one 15", function() {
      var hand = ["A", "6", "7", "9", "Q"];
      expectPoints(hand, 2);

      hand = ["4", "4", "7", "9", "Q"];
      expectPoints(hand, 2);

      hand = ["2", "2", "7", "2", "2"];
      expectPoints(hand, 2);
    });

    it("should award four points for two 15s", function() {
      var hand = ["5", "6", "7", "9", "Q"];
      expectPoints(hand, 4);

      hand = ["5", "6", "7", "J", "Q"];
      expectPoints(hand, 4);
    });

    it("awards the appropriate number of points when there are many combinations", function() {
      var hand = ["5", "5", "5", "5", "10"];
      expectPoints(hand, 16);

      hand = ["5", "5", "5", "10", "J"];
      expectPoints(hand, 14);

      hand = ["6", "7", "8", "9", "A"];
      expectPoints(hand, 6);
    });
  });

  describe("scoreFlush", function() {

    function makeCards(suits) {
      return suits.map(function(value) {
        return { suit: value };
      });
    }

    function expectPoints(hand, starter, points) {
      expect(Scoring.scoreFlush(makeCards(hand), {suit: starter})).to.equal(points);
    }
    
    it("should award four points when the hand is all one suit", function() {
      var hand = ["S", "S", "S", "S"];
      var starter = "D";
      expectPoints(hand, starter, 4);
    });

    it("should award five points when the starter and the hand is all one suit", function() {
      var hand = ["S", "S", "S", "S"];
      var starter = "S";
      expectPoints(hand, starter, 5);
    });

    it("should award zero points if there is not a flush", function() {
      var hand = ["H", "S", "D", "S"];
      var starter = "D";
      expectPoints(hand, starter, 0);
    });

    it("should award zero points if the starter is the same suit "
        + "as only three other cards", function() {
      var hand = ["S", "S", "S", "D"];
      var starter = "S";
      expectPoints(hand, starter, 0);
    });
  });

  describe("scoreHisNobs", function() {

    it("should award a point when the hand contains a jack of the same suit "
        + "as the starter", function() {
      var hand = [KingOfSpades, SevenOfDiamonds, JackOfHearts, NineOfSpades];
      var starter = TwoOfHearts;
      expect(Scoring.scoreHisNobs(hand, starter)).to.equal(1);
    });

    it("should not award a point when the hand contains a jack of a different suit "
        + "than the starter", function() {
      var hand = [KingOfSpades, SevenOfDiamonds, JackOfSpades, NineOfSpades];
      var starter = TwoOfHearts;
      expect(Scoring.scoreHisNobs(hand, starter)).to.equal(0);
    });

    it("should award a point if the hand contains multiple jacks, one of which "
        + "is the same suit as the starter", function() {
      var hand = [KingOfSpades, JackOfSpades, JackOfHearts, NineOfSpades];
      var starter = TwoOfHearts;
      expect(Scoring.scoreHisNobs(hand, starter)).to.equal(1);
    })

    it("should not award a point when the starter is a jack", function() {
      var hand = [NineOfSpades, TwoOfHearts, AceOfClubs, JackOfHearts];
      var starter = JackOfSpades;
      expect(Scoring.scoreHisNobs(hand, starter)).to.equal(0);
    }); 
  });

  describe("scoreHand", function() {

    it("should combine all the elements into the total score for a hand", function() {
      var cards = [JackOfSpades, SixOfSpades, JackOfHearts, FiveOfClubs];
      var starter = SevenOfDiamonds;
      expect(Scoring.scoreHand(cards, starter)).to.equal(9);

      cards = [AceOfClubs, TwoOfClubs, ThreeOfSpades, TwoOfHearts];
      starter = TwoOfDiamonds;
      expect(Scoring.scoreHand(cards, starter)).to.equal(15);

      cards = [JackOfSpades, FiveOfClubs, KingOfDiamonds, FiveOfHearts];
      starter = QueenOfSpades;
      expect(Scoring.scoreHand(cards, starter)).to.equal(18);

      cards = [FiveOfSpades, FiveOfClubs, JackOfHearts, FiveOfDiamonds];
      starter = FiveOfHearts;
      expect(Scoring.scoreHand(cards, starter)).to.equal(29);

      cards = [EightOfDiamonds, SevenOfDiamonds, SixOfSpades, SixOfHearts];
      starter = SevenOfClubs;
      expect(Scoring.scoreHand(cards, starter)).to.equal(20);

      cards = [NineOfHearts, AceOfClubs, TwoOfDiamonds, QueenOfSpades];
      starter = FiveOfDiamonds;
      expect(Scoring.scoreHand(cards, starter)).to.equal(4);

      cards = [TenOfClubs, AceOfClubs, TwoOfDiamonds, QueenOfSpades];
      starter = SixOfDiamonds;
      expect(Scoring.scoreHand(cards, starter)).to.equal(0);

      cards = [SevenOfDiamonds, SevenOfClubs, AceOfClubs, TwoOfHearts];
      starter = FiveOfHearts;
      expect(Scoring.scoreHand(cards, starter)).to.equal(8);

      cards = [TwoOfHearts, FiveOfClubs, TenOfClubs, SixOfSpades];
      starter = AceOfClubs;
      expect(Scoring.scoreHand(cards, starter)).to.equal(2);
    });
  });
});

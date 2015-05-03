describe("Scoring", function() {

  function makeCards(ranks) {
    return ranks.map(function(value) {
      return { rank: value };
    });
  }

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
});

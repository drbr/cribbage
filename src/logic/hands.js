var Hands = (function(Hands) {

  // Returns a boolean indicating whether or not the given cards comprise
  // a valid cribbage hand.
  Hands.validHand = function(cards, starter) {
    var validHand = (cards.length === 4 && cards.every(function(card) {
      return Cards.isValid(card);
    }));

    validHand = validHand && Cards.isValid(starter);
    return validHand && Hands.findDuplicates(cards.concat(starter)).length == 0;
  };

  Hands.findDuplicates = function(cards) {
    var cardMap = {};
    var duplicateMap = {};
    var duplicateArray = [];
    cards.forEach(function(card) {
      if (Cards.isValid(card)) {
        var hash = Cards.hash(card);
        if (!cardMap[hash]) {
          cardMap[hash] = card;
        } else if (!duplicateMap[hash]) {
          duplicateMap[hash] = card;
          duplicateArray.push(card);
        }
      }
    });

    return duplicateArray;
  };

  // Returns a 52-card deck, in sorted ascending order, with the suits
  // in the order specified by Cards.suitOrder
  Hands.generateDeck = function() {
    var deck = [];
    for (var i = 0; i < Cards.rankOrder.length; i++) {
      for (var j = 0; j < Cards.suitOrder.length; j++) {
        deck.push({ suit: Cards.suitOrder[j], rank: Cards.rankOrder[i] });
      }
    }
    return deck;
  };

  // Takes four cardsInHand, and pairs with every possible starter from the deck.
  // Does not consider cards present in nonStarters for the starter.
  // Returns an array of objects in the following form:
  // { starter: cardObject, score: number }
  Hands.scoreForEachStarter = function(cards, nonStarters) {
    var deck = Hands.generateDeck();
    
    // Put the known cards into a dictionary for fast lookup
    var cardsNotInDeck = {};
    cards.concat(nonStarters).forEach(function(card) {
      if (card) {
        cardsNotInDeck[Cards.hash(card)] = true;
      }
    });

    var starterScores = [];
    deck.forEach(function(starter) {
      if (cardsNotInDeck[Cards.hash(starter)]) {
        return;
      }

      var score = Scoring.scoreHand(cards, starter);
      starterScores.push({ starter: starter, score: score });
    });

    return starterScores;
  }

  return Hands;
})(Hands || {});
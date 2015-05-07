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
    Cards.rankOrder.forEach(function(rank) {
      Cards.suitOrder.forEach(function(suit) {
        deck.push({ suit: suit, rank: rank });
      });
    });
    return deck;
  };

  return Hands;
})(Hands || {});
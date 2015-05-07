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
        var hash = card.rank + card.suit;
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

  return Hands;
})(Hands || {});
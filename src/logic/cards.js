/*
 * The card object looks like this:
 * { suit: "H|D|C|S", rank: "A|2|3|4|5|6|7|8|9|10|J|Q|K" }
 */
var Cards = (function(Cards) {

  var rankValues = {
    A:  { sort: 1,  points: 1,  string: 'Ace' },
    2:  { sort: 2,  points: 2,  string: 'Two' },
    3:  { sort: 3,  points: 3,  string: 'Three' },
    4:  { sort: 4,  points: 4,  string: 'Four' },
    5:  { sort: 5,  points: 5,  string: 'Five' },
    6:  { sort: 6,  points: 6,  string: 'Six' },
    7:  { sort: 7,  points: 7,  string: 'Seven' },
    8:  { sort: 8,  points: 8,  string: 'Eight' },
    9:  { sort: 9,  points: 9,  string: 'Nine' },
    10: { sort: 10, points: 10, string: 'Ten' },
    J:  { sort: 11, points: 10, string: 'Jack' },
    Q:  { sort: 12, points: 10, string: 'Queen' },
    K:  { sort: 13, points: 10, string: 'King' }
  };

  var suitValues = {
    C: { string: 'Clubs', symbol: '\u2663', color: 'black' },
    S: { string: 'Spades', symbol: '\u2660', color: 'black' },
    H: { string: 'Hearts', symbol: '\u2665', color: 'red' },
    D: { string: 'Diamonds', symbol: '\u2666', color: 'red' }
  };

  Cards.rankOrder = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  Cards.suitOrder = ['C', 'S', 'H', 'D'];

  Cards.suitSymbol = function(suit) {
    return suitValues[suit].symbol;
  };

  Cards.suitColor = function(suit) {
    return suitValues[suit].color;
  };

  Cards.toString = function(card) {
    if (Cards.isValid(card)) {
      return [rankValues[card.rank].string, ' of ', suitValues[card.suit].string].join('');
    } else {
      return '';
    }
  };

  Cards.toSymbol = function(card) {
    if (Cards.isValid(card)) {
      return card.rank + suitValues[card.suit].symbol;
    } else {
      return '';
    }
  }

  // Returns a unique string identifier for the card
  Cards.hash = function(card) {
    return card.suit + card.rank;
  };

  Cards.isValid = function(card) {
    if (!card) return false;
    return (rankValues[card.rank] && suitValues[card.suit]) ? true : false;
  };

  Cards.cardRankComparator = function(cardA, cardB) {
    return rankValues[cardA.rank].sort - rankValues[cardB.rank].sort;
  };

  Cards.getSortRank = function(card) {
    return rankValues[card.rank].sort;
  };

  Cards.getPointRank = function(card) {
    return rankValues[card.rank].points;
  };

  return Cards;
})(Cards || {});
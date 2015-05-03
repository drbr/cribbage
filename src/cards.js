/*
 * The card object looks like this:
 * { suit: "H|D|C|S", rank: "A|2|3|4|5|6|7|8|9|10|J|Q|K" }
 */
var Cards = (function(Cards) {

  Cards.cardValues = {
    A:  { sort: 1, points: 1 },
    2:  { sort: 2, points: 2 },
    3:  { sort: 3, points: 3 },
    4:  { sort: 4, points: 4 },
    5:  { sort: 5, points: 5 },
    6:  { sort: 6, points: 6 },
    7:  { sort: 7, points: 7 },
    8:  { sort: 8, points: 8 },
    9:  { sort: 9, points: 9 },
    10: { sort: 10, points: 10 },
    J:  { sort: 11, points: 10 },
    Q:  { sort: 12, points: 10 },
    K:  { sort: 13, points: 10 }
  };

  Cards.cardRankComparator = function(cardA, cardB) {
    return Cards.cardValues[cardA.rank].sort - Cards.cardValues[cardB.rank].sort;
  };

  Cards.getSortRank = function(card) {
    return Cards.cardValues[card.rank].sort;
  }

  Cards.getPointRank = function(card) {
    return Cards.cardValues[card.rank].points;
  }

  return Cards;
})(Cards || {});
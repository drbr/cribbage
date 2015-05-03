/*
 * The card object looks like this:
 * { suit: "H|D|C|S", rank: "A|2|3|4|5|6|7|8|9|10|J|Q|K" }
 */
var Logic = (function(Logic) {

  var cardValues = {
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
  }

  Logic.cardRankComparator = function(cardA, cardB) {
    return cardValues[cardA.rank].sort - cardValues[cardB.rank].sort;
  };

  // Temporary function to make sure the dependency loader works
  Logic.write = function() {
    document.write('<p>The dependencies were loaded successfully!</p>')
  }

  /**
   * Takes in an array of cards and one additional starter card,
   * and returns the score for that hand
   */
  Logic.scoreHand = function(cards, starter) {
    // Sort the 5 cards to make everything else easier
    var hand = cards.concat(starter);
    hand.sort(Logic.cardRankComparator);

    // TODO: temporary to make sure the it works so far
    return hand;
    

    // Count all combinations that add up to 15

    // Count the runs

    // Check for a flush

    // Check for His Nobs

    // Return the score
  };

  return Logic;
})(Logic || {});
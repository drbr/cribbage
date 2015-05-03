var Scoring = (function(Scoring) {

  /**
   * Takes in an array of cards and one additional starter card,
   * and returns the score for that hand.
   */
  Scoring.scoreHand = function(cards, starter) {
    var score = 0;

    // Sort the 5 cards to make everything else easier
    var hand = cards.concat(starter);
    hand.sort(Cards.cardRankComparator);

    score += Scoring.scorePairs(hand);
    score += Scoring.scoreRuns(hand);
    score += Scoring.scoreFifteens(hand);
    score += Scoring.scoreFlush(cards, starter);
    score += Scoring.scoreHisNobs(cards, starter);

    return score;
  };

  Scoring.scorePairs = function(sortedHand) {
    var instances = 1;
    var pairs = 0;
    sortedHand = sortedHand.map(function(card) {
      return card.rank;
    });

    for (var index = 1; index < sortedHand.length; index++) {
      if (sortedHand[index] === sortedHand[index-1]) {
        pairs += instances;
        instances++;
      } else {
        instances = 1;
      }
    }

    return pairs * 2;
  };

  Scoring.scoreRuns = function(sortedHand) {
    var longestRun = 1;
    var accumulator = 1;
    var multiplier = 1;
    var cardValues = sortedHand.map(function(card) {
      return Cards.getSortRank(card);
    });

    for (var index = 1; index < cardValues.length; index++) {
      if (cardValues[index] === cardValues[index-1]) {
        // A double or triple run
        accumulator++;
      } else if (cardValues[index] === cardValues[index-1] + 1) {
        longestRun++;
        multiplier *= accumulator;
        accumulator = 1;
      } else if (longestRun < 3) {
        // The run was broken; start scanning from scratch
        longestRun = 1;
        multiplier = 1;
        accumulator = 1;
      } else {
        // Since a run must consist of three or more cards, and a hand
        // contains only five cards, the hand can contain at most one run.
        accumulator = 1;
        break;
      }
    }
    return (longestRun >= 3) ? longestRun * multiplier * accumulator : 0;
  };

  Scoring.scoreFifteens = function(hand) {
    // Returns the number of subsets of pointValues that add up exactly to sum.
    // pointTotal is the sum of all the pointValues.
    function subsetsAddingTo(sum, pointValues, pointTotal) {
      if (pointValues.length == 0 || sum <= 0 || pointTotal < sum) {
        return 0;
      }

      var firstElementIsSum = (pointValues[0] == sum);

      var subArray = pointValues.slice(1);
      var subArrayTotal = pointTotal - pointValues[0];

      var subsetFull = subsetsAddingTo(sum, subArray, subArrayTotal);
      var subsetPartial = firstElementIsSum ? 1
          : subsetsAddingTo(sum - pointValues[0], subArray, subArrayTotal);
      return subsetFull + subsetPartial;
    }

    var pointValues = hand.map(function(card) {
      return Cards.getPointRank(card);
    });
    var pointTotal = pointValues.reduce(function(total, value) {
      return total + value;
    });
    return subsetsAddingTo(15, pointValues, pointTotal) * 2;
  };

  Scoring.scoreFlush = function(cards, starter) {
    var score = 0;
    var fourPointFlush = cards.every(function(card) {
      return card.suit === cards[0].suit;
    });

    if (fourPointFlush) {
      score += 4;

      // Five-point flush
      if (starter.suit === cards[0].suit) {
        score += 1;
      }
    }

    return score;
  }

  Scoring.scoreHisNobs = function(cards, starter) {
    var hisNobs = cards.some(function(card) {
      return card.rank === "J" && card.suit === starter.suit;
    });
    return hisNobs? 1 : 0;
  };

  return Scoring;
})(Scoring || {});
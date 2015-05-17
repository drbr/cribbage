crActivityControllers.controller('evaluateDealCtrl', ['LogicProvider', '$scope', function(LogicProvider, $scope) {
  // These objects get populated by the card selectors
  // The card is wrapped in an object to avoid the isolate scope "dot problem".
  $scope.cards = Array.apply(null, new Array(6)).map(function() {
    return { card: {} };
  });
  $scope.cardsUnwrapped = [{}, {}, {}, {}, {}, {}];

  $scope.setCard = function(newCard, index) {
    $scope.cards[index].card = newCard;
    $scope.cardsUnwrapped[index] = newCard;
  };

  $scope.$watch('cards', function() {
    $scope.breakdownsPerHand = breakdownsPerHand();
    var breakdownObj = $scope.breakdownsPerHand[0];
    $scope.scoreBreakdown = breakdownObj && breakdownObj.scoreBreakdownByStarter || 'Select cards first!';
  }, true);

  // Returns an array of each possible four-card hand, sorted in descending order
  // by its expected score (based on each possible starter card).
  function breakdownsPerHand() {
    var allCardsValid = $scope.cardsUnwrapped.every(function(card) {
      return LogicProvider.cards.isValid(card);
    });

    if (!allCardsValid) {
      return [];
    }

    var breakdownsPerHand = [];
    var possibleHands = LogicProvider.util.enumerateSubsets($scope.cardsUnwrapped, 4);
    for (var i = 0; i < possibleHands.length; i++) {
      var hand = possibleHands[i];

      var starterScoresForHand = LogicProvider.hands.scoreForEachStarter(hand.in, hand.out);

      var expectedScore = starterScoresForHand.map(function(scoreObj) {
          return scoreObj.score;
        }).reduce(function(sum, nextScore) {
          return sum + nextScore;
        }) / starterScoresForHand.length;

      breakdownsPerHand.push({
        fourCards: hand.in,
        rejectedCards: hand.out,
        expectedScore: expectedScore,
        scoreBreakdownByStarter: starterScoresForHand
      });
    }

    // Sort descending by the expected value of each 4-card hand
    breakdownsPerHand.sort(function(a, b) {
      return b.expectedScore - a.expectedScore;
    });

    return breakdownsPerHand;
  };

}]);

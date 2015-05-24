crActivityControllers.controller('evaluateDealCtrl',
    ['LogicProvider', 'UtilProvider', 'cardToStringFilter', '$scope',
    function(LogicProvider, UtilProvider, cardToStringFilter, $scope) {
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

  function setPromptForErrors() {
    var duplicatesArray = LogicProvider.hands.findDuplicates($scope.cardsUnwrapped);
    if (duplicatesArray.length > 0) {
      var prompt = UtilProvider.viewUtils.stringifyDuplicateCards(
        duplicatesArray, LogicProvider.cards, cardToStringFilter);
      $scope.prompt = { prompt: prompt, classes: 'text-danger' };
      return true;
    }

    var validCardSet = $scope.cardsUnwrapped.every(function(card) {
      return LogicProvider.cards.isValid(card);
    });
    if (!validCardSet) {
      $scope.prompt = { prompt: 'Select six cards to see the score breakdown.', classes: 'text-warning' };
      return true;
    }

    $scope.prompt = null;
    return false;
  };

  $scope.chooseHand = function($index) {
    $scope.currentHandIndex = $index;
    $scope.scoreBreakdown = $scope.breakdownsPerHand[$index].scoreBreakdownByStarter;
  }

  $scope.$watch('cards', function() {
    if (!setPromptForErrors()) {
      $scope.breakdownsPerHand = LogicProvider.hands.scoreBreakdownsPerHand($scope.cardsUnwrapped);
    } else {
      $scope.breakdownsPerHand = null;
    }
    $scope.scoreBreakdown = null;
    $scope.currentHandIndex = null;
  }, true);

}]);

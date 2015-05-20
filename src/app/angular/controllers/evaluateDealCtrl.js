crActivityControllers.controller('evaluateDealCtrl',
    ['LogicProvider', 'UtilProvider', '$scope', function(LogicProvider, UtilProvider, $scope) {
  // These objects get populated by the card selectors
  // The card is wrapped in an object to avoid the isolate scope "dot problem".
  $scope.cards = Array.apply(null, new Array(6)).map(function() {
    return { card: {} };
  });
  $scope.cardsUnwrapped = [{}, {}, {}, {}, {}, {}];

  // TODO: Temporary code to easily test
  var TwoOfDiamonds = { rank: "2", suit: "D" };
  var ThreeOfSpades = { rank: "3", suit: "S" };
  var FiveOfClubs = { rank: "5", suit: "C" };
  var FiveOfHearts = { rank: "5", suit: "H" };
  var FiveOfSpades = { rank: "5", suit: "S" };
  var FiveOfDiamonds = { rank: "5", suit: "D" };
  $scope.cardsUnwrapped = [TwoOfDiamonds, ThreeOfSpades, FiveOfClubs, FiveOfHearts, FiveOfSpades, FiveOfDiamonds];
  $scope.cards = $scope.cardsUnwrapped.map(function(card) {
    return { card: card };
  });

  $scope.setCard = function(newCard, index) {
    $scope.cards[index].card = newCard;
    $scope.cardsUnwrapped[index] = newCard;
  };

  function setPromptForErrors() {
    var duplicatesArray = LogicProvider.hands.findDuplicates($scope.cardsUnwrapped);
    if (duplicatesArray.length > 0) {
      var prompt = UtilProvider.viewUtils.stringifyDuplicateCards(duplicatesArray, LogicProvider.cards);
      $scope.prompt = { prompt: prompt, classes: 'text-danger' };
      return true;
    }

    var validCardSet = $scope.cardsUnwrapped.every(function(card) {
      return LogicProvider.cards.isValid(card);
    });
    if (!validCardSet) {
      $scope.prompt = { prompt: 'Select cards first!', classes: 'text-warning' };
      return true;
    }

    $scope.prompt = null;
    return false;
  };

  $scope.$watch('cards', function() {
    var cardsSelectedCorrectly = !setPromptForErrors();

    if (cardsSelectedCorrectly) {
      $scope.breakdownsPerHand = LogicProvider.hands.scoreBreakdownsPerHand($scope.cardsUnwrapped);

      // TODO: Use the first one until the breakdown selector is built
      var breakdownObj = $scope.breakdownsPerHand[0];
      $scope.scoreBreakdown = breakdownObj.scoreBreakdownByStarter;
    }
  }, true);

}]);

crActivityControllers.controller('scoreHandCtrl', function($scope) {
  // These objects get populated by the card selectors.
  // The card is wrapped in an object to avoid the isolate scope "dot problem".
  $scope.cards = Array.apply(null, new Array(4)).map(function() {
    return { card: {} };
  });
  $scope.cardsUnwrapped = [{}, {}, {}, {}];
  $scope.starter = {};

  $scope.setCard = function(newCard, index) {
    $scope.cards[index].card = newCard;
    $scope.cardsUnwrapped[index] = newCard;
  };

  $scope.setStarter = function(newCard) {
    $scope.starter = newCard;
  };

});

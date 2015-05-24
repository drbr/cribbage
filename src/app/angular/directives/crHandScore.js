crDirectives.directive('crHandScore',
    ['LogicProvider', 'UtilProvider', 'cardToStringFilter',
    function(LogicProvider, UtilProvider, cardToStringFilter) {
  return {
    restrict: 'E',
    scope: {
      cards: '=',
      starter: '='
    },
    templateUrl: 'src/app/templates/crHandScore.html',
    link: function(scope, element, attrs) {

      scope.getScore = function() {
        return LogicProvider.scoring.scoreHand(scope.cards, scope.starter);
      }

      // Returns a string if the cards have not been selected properly,
      // empty string if everything is okay
      scope.error = function() {
        // The only error we currently check for is duplicate cards in the hand
        var duplicates = LogicProvider.hands.findDuplicates(scope.cards.concat(scope.starter));
        return duplicates.length ?
            UtilProvider.viewUtils.stringifyDuplicateCards(
              duplicates, LogicProvider.cards, cardToStringFilter) : '';
      };

      scope.validHand = function() {
        return LogicProvider.hands.validHand(scope.cards, scope.starter);
      };
    }
  };
}]);

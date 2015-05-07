crDirectives.directive('crHandScore',
    ['LogicProvider', function(logicProvider) {
  return {
    restrict: 'E',
    scope: {
      cards: '=',
      starter: '='
    },
    templateUrl: 'src/app/templates/crHandScore.html',
    link: function(scope, element, attrs) {

      scope.getScore = function() {
        return logicProvider.scoring.scoreHand(scope.cards, scope.starter);
      }

      // Returns a string if the cards have not been selected properly,
      // empty string if everything is okay
      scope.error = function() {
        // The only error we currently check for is duplicate cards in the hand
        var duplicates = logicProvider.hands.findDuplicates(scope.cards.concat(scope.starter));
        if (duplicates.length === 0) {
          return '';
        } else {
          var errorText = ['The hand may not contain duplicate cards: '];
          duplicates.reduce(function(prevCard, curCard) {
            if (prevCard != null) {
              errorText.push(', ');
            }
            errorText.push(logicProvider.cards.toString(curCard));
            return curCard;
          }, null);
          return errorText.join('');
        }
      };

      scope.validHand = function() {
        return logicProvider.hands.validHand(scope.cards, scope.starter);
      };
    }
  };
}]);

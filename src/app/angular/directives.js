var directives = angular.module('crDirectives', []);

directives.directive('crHandScore', ['LogicProvider', function(logicProvider) {
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
        var duplicates = logicProvider.logic.findDuplicates(scope.cards.concat(scope.starter));
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
        return logicProvider.logic.validHand(scope.cards, scope.starter);
      };
    }
  };
}]);

directives.directive('crCardSelector', ['LogicProvider', function(logicProvider) {
  return {
    restrict: 'E',
    scope: {
      tabindex: '@inputTabindex',
      card: '=' // A reference to the card being selected
    },
    templateUrl: 'src/app/templates/crCardSelector.html',
    link: function(scope, element, attrs) {

      scope.setSuit = function(suit) {
        scope.suit = suit;
        scope.updateCard();
      };

      scope.updateCard = function() {
        scope.card.suit = scope.suit;
        scope.card.rank = scope.rank.toUpperCase();
      };

    }
  }
}]);
var directives = angular.module('crDirectives', []);

directives.directive('crHandScore', ['LogicProvider', function(logicProvider) {
  return {
    restrict: 'E',
    scope: {
      cards: '=',
      starter: '='
      // A pre-computed score can also be passed in with the 'score' attribute
    },
    template: '<p>The score for this hand is: <span ng-bind="getScore()"></span></p>',
    link: function(scope, element, attrs) {

      scope.getScore = function() {
        // If the score was passed in, trust it
        if (attrs.score !== undefined) {
          return attrs.score;
        } else {
          return logicProvider.scoring.scoreHand(scope.cards, scope.starter);
        }
      }

    }
  };
}]);

directives.directive('crCardSelector', ['LogicProvider', function(logicProvider) {
  return {
    restrict: 'E',
    scope: {
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
        scope.card.rank = scope.rank;
      }

    }
  }
}]);
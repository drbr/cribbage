var directives = angular.module('crDirectives', []);

directives.directive('crHandScore', ['LogicProvider', function(logicProvider) {
    return {
      restrict: 'E',
      scope: {
        cards: '=',
        starter: '='
      },
      template: '<p>The score for this hand is {{ score }}</p>',
      link: function(scope, element, attrs) {

        // If the score was passed in, trust it
        if (attrs.score !== undefined) {
          scope.score = attrs.score;
        } else {
          scope.score = logicProvider.scoring.scoreHand(scope.cards, scope.starter);
        }
      }
    };
  }]);

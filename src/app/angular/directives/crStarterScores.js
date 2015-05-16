crDirectives.directive('crStarterScores',
    ['LogicProvider', function(LogicProvider) {
  return {
    restrict: 'E',
    scope: {
      cards: '=',
      nonStarters: '='
    },
    templateUrl: 'src/app/templates/crStarterScores.html',
    link: function(scope, element, attrs) {

      function fourValidCards() {
        return scope.cards.length === 4 && scope.cards.every(function(card) {
          return LogicProvider.cards.isValid(card);
        });
      }

      scope.computeStarterScores = function() {
        if (fourValidCards()) {
          return LogicProvider.hands.scoreForEachStarter(scope.cards, scope.nonStarters);
        }
      }

    }
  };

}]);
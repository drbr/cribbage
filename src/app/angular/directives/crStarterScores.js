crDirectives.directive('crStarterScores',
    ['LogicProvider', function(logicProvider) {
  return {
    restrict: 'E',
    scope: {
      cards: '=',
      starterScoreMap: '='
    },
    templateUrl: 'src/app/templates/crStarterScores.html',
    link: function(scope, element, attrs) {
      scope.evaluateHand = function() {
        // Go through each starter and compute the score
      }
    }
  };

}]);
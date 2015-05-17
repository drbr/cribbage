crDirectives.directive('crStarterScores',
    ['LogicProvider', function(LogicProvider) {
  return {
    restrict: 'E',
    scope: {
      scoreBreakdown: '='
    },
    templateUrl: 'src/app/templates/crStarterScores.html',
    link: function(scope, element, attrs) { return; }
  };

}]);
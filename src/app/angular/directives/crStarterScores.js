crDirectives.directive('crStarterScores',
    ['LogicProvider', 'UtilProvider', function(LogicProvider, UtilProvider) {
  return {
    restrict: 'E',
    scope: {
      scoreBreakdown: '='
    },
    templateUrl: 'src/app/templates/crStarterScores.html',
    link: function(scope, element, attrs) {
      scope.$watch('scoreBreakdown', function() {
        if (scope.scoreBreakdown && scope.scoreBreakdown.length) {
          scope.tableRows = UtilProvider.viewUtils.
            convertScoreBreakdownToTableRows(scope.scoreBreakdown, LogicProvider.cards);
        }
      });
    }
  };

}]);
var cribbageApp = angular.module('CribbageApp', ['ngRoute']);

var activityTabs = [
    { name: 'scoreHand', string: 'Score a hand', enabled: true },
    { name: 'evaluateDeal', string: 'Evaluate dealt cards', enabled: false }
  ];

cribbageApp.config(['$routeProvider',
  function($routeProvider) {
    activityTabs.forEach(function(tab) {
      $routeProvider.when('/' + tab.name, {
        templateUrl: 'src/app/templates/' + tab.name + '.html'
      });
    });
  }]);

cribbageApp.controller('CribbageCtrl', function($scope) {
  $scope.activityTabs = activityTabs;
});
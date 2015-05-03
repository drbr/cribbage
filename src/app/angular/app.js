var cribbageApp = angular.module('CribbageApp', [
  'ngRoute',
  'crDirectives']);

var activityTabs = [
    { name: 'scoreHand', string: 'Score a hand', enabled: true },
    { name: 'evaluateDeal', string: 'Evaluate dealt cards', enabled: false }
  ];

cribbageApp.config(['$routeProvider',
  function($routeProvider) {
    activityTabs.forEach(function(tab) {
      $routeProvider.when('/' + tab.name, {
        templateUrl: 'src/app/templates/' + tab.name + '.html',
        controller: tab.name + 'Ctrl'
      });
    });
  }]);

cribbageApp.controller('CribbageCtrl', function($scope) {
  $scope.activityTabs = activityTabs;
});

cribbageApp.controller('scoreHandCtrl', function($scope) {
  var ThreeOfSpades = { rank: "3", suit: "S" };
  var FiveOfSpades = { rank: "5", suit: "S" };
  var NineOfHearts = { rank: "9", suit: "H" };
  var NineOfSpades = { rank: "9", suit: "S" };
  var JackOfHearts = { rank: "J", suit: "H" };

  $scope.cards = [FiveOfSpades, JackOfHearts, ThreeOfSpades, NineOfSpades];
  $scope.starter = NineOfHearts;
});

cribbageApp.controller('evaluateDealCtrl', function($scope) {});

// Access the cribbage logic through this service, to avoid global references
cribbageApp.factory('LogicProvider', function() {
  return { scoring: Scoring };
});
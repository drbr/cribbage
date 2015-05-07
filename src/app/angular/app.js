var cribbageApp = angular.module('CribbageApp', [
  'ui.router',
  'crDirectives',
  'crFilters']);

var activityTabs = [
  { name: 'scoreHand', string: 'Score a hand', enabled: true },
  { name: 'evaluateDeal', string: 'Evaluate dealt cards', enabled: false }
];

cribbageApp.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    activityTabs.forEach(function(tab) {
      $stateProvider.state(tab.name, {
        url: '/' + tab.name,
        templateUrl: 'src/app/templates/' + tab.name + '.html',
        controller: tab.name + 'Ctrl'
      });
    });

    $urlRouterProvider.otherwise('/');
  }]);

cribbageApp.controller('CribbageCtrl', function($scope) {
  $scope.activityTabs = activityTabs;
});

cribbageApp.controller('scoreHandCtrl', function($scope) {
  $scope.hand = {
    // The card selectors will populate these objects when a card is selected
    cards: [{}, {}, {}, {}],
    starter: {}
  }
});

cribbageApp.controller('evaluateDealCtrl', function($scope) {});

// Access the cribbage logic through this service, to avoid global references
cribbageApp.factory('LogicProvider', function() {
  return { scoring: Scoring, cards: Cards, hands: Hands };
});
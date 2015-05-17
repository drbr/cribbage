var cribbageApp = angular.module('CribbageApp', [
  'ui.router',
  'crDirectives',
  'crFilters']);

// The directives, each defined in its own file, are all under this module
var crDirectives = angular.module('crDirectives', []);

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
  // These objects get populated by the card selectors
  $scope.cards = [{}, {}, {}, {}];
  $scope.starter = {};
});

cribbageApp.controller('evaluateDealCtrl', function($scope) {
  $scope.hand = {
    cards: [{}, {}, {}, {}],
    nonStarters: []
  }
});

// Access the cribbage logic through this service, to avoid global references
cribbageApp.factory('LogicProvider', function() {
  return { cards: Cards, hands: Hands, scoring: Scoring, util: Util };
});
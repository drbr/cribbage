angular.module('crFilters', [])
  .filter('cardToString', ['LogicProvider', function(LogicProvider) {
    return function(card) {
      return LogicProvider.cards.toString(card);
    };
  }]);
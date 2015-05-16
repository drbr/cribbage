angular.module('crFilters', [])
  .filter('cardToString', ['LogicProvider', function(LogicProvider) {
    return function(card) {
      return LogicProvider.cards.toString(card);
    };
  }])

  .filter('cardToSymbol', ['LogicProvider', function(LogicProvider) {
    return function(card) {
      return LogicProvider.cards.toSymbol(card);
    }
  }]);
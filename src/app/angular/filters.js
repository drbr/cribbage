angular.module('crFilters', [])

  // Takes either a single card or an array of cards
  .filter('cardToString', ['LogicProvider', function(LogicProvider) {
    return function(input) {
      if (Array.isArray(input)) {
        return input.map(function(card) {
          return LogicProvider.cards.toString(card);
        }).join(', ');
      } else {
       return LogicProvider.cards.toString(input);
      }
    }
  }])

  // Takes either a single card or an array of cards
  .filter('cardToSymbol', ['LogicProvider', function(LogicProvider) {
    return function(input) {
      if (Array.isArray(input)) {
        return input.map(function(card) {
          return LogicProvider.cards.toSymbol(card);
        }).join(' ');
      } else {
       return LogicProvider.cards.toSymbol(input);
      }
    };
  }])

  // Takes either a single card or an array of cards
  // Outputs HTML containing spans with classes for suit colors -- use with ng-bind-html
  .filter('cardToSymbolWithColor', ['LogicProvider', '$sce', function(LogicProvider, $sce) {
    function spanForCard(card) {
      var color = LogicProvider.cards.suitColor(card.suit);
      var symbol = LogicProvider.cards.toSymbol(card);
      return '<span class="cr-suit-color ' + color + '">' + symbol + '</span>';
    };

    return function(input) {
      if (Array.isArray(input)) {
        var html = input.map(function(card) {
          return spanForCard(card);
        }).join('&nbsp;&nbsp;');
      } else {
        var html = spanForCard(card);
      }
      return $sce.trustAsHtml(html);
    };
  }])
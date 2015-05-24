angular.module('crFilters', [])

  // Takes either a single card or an array of cards.
  .filter('cardToString', ['LogicProvider', function(LogicProvider) {
    return function(input) {
      if (Array.isArray(input)) {
        var sortedCards = input.sort(LogicProvider.cards.cardComparator);
        return sortedCards.map(function(card) {
          return LogicProvider.cards.toString(card);
        }).join(', ');
      } else {
       return LogicProvider.cards.toString(input);
      }
    }
  }])

  // Takes either a single card or an array of cards.
  // Outputs HTML containing spans with classes for suit colors -- use with ng-bind-html
  // If breakByRank is true, the output html will group the cards by rank and insert line breaks
  // between each group.
  .filter('cardToSymbol', ['LogicProvider', 'UtilProvider', '$sce',
      function(LogicProvider, UtilProvider, $sce) {

    function spanForCard(card) {
      var color = LogicProvider.cards.suitColor(card.suit);
      var symbol = LogicProvider.cards.toSymbol(card);
      return '<span class="cr-suit-color ' + color + '">' + symbol + '</span>';
    };

    function htmlBrokenByRank(cards) {
      var cardsByRank = UtilProvider.viewUtils.chunkCardArrayByRank(cards, LogicProvider.cards);
      return cardsByRank.map(function(cardsWithRank) {
        return cardsWithRank.map(function(card) {
          return spanForCard(card);
        }).join('&nbsp;&nbsp;');
      }).join('<br/>');
    };

    function htmlSingleLine(cards) {
      var sortedCards = cards.sort(LogicProvider.cards.cardComparator);
      return sortedCards.map(function(card) {
        return spanForCard(card);
      }).join('&nbsp;&nbsp;');
    };

    return function(input, breakByRank) {
      if (Array.isArray(input)) {
        var html = breakByRank ? htmlBrokenByRank(input) : htmlSingleLine(input);
      } else {
        var html = spanForCard(card);
      }
      return $sce.trustAsHtml(html);
    };
  }])

crDirectives.directive('crCardSelector',
    ['LogicProvider', function(logicProvider) {
  return {
    restrict: 'E',
    scope: {
      card: '=',
      setCard: '&' // should be bound to a method on the parent scope that stores the card's value
    },
    templateUrl: 'src/app/templates/crCardSelector.html',
    link: function(scope, element, attrs) {

      scope.suitOrder = logicProvider.cards.suitOrder;
      scope.suitSymbol = logicProvider.cards.suitSymbol;
      scope.suitColor = logicProvider.cards.suitColor;
      scope.rankOrder = logicProvider.cards.rankOrder;

      // The chunked rank order is used in the dropdown version of the selector,
      // to display the possible ranks on multiple rows, each with chunkSize elements.
      var chunkSize = 5;
      scope.rankOrderChunks = function() {
        var chunks = [];
        for (var i = 0; i < logicProvider.cards.rankOrder.length; i += chunkSize) {
          chunks.push(logicProvider.cards.rankOrder.slice(i, i + chunkSize));
        }
        return chunks;
      }();

      scope.setSuit = function(suit) {
        scope.suit = suit;
        updateCard();
      };

      scope.setRank = function(rank) {
        scope.rank = rank;
        updateCard();
      }

      function updateCard() {
        // The properties on the card must be set individually due to the dot problem
        if (logicProvider.cards.isValid({ suit: scope.suit, rank: scope.rank })) {
          scope.setCard({ newCard: { suit: scope.suit, rank: scope.rank } });
        } else {
          scope.setCard({ newCard: {} });
        }
      };

    }
  }
}]);
crDirectives.directive('crCardSelector',
    ['LogicProvider', function(logicProvider) {
  return {
    restrict: 'E',
    scope: {
      card: '=' // A reference to the card being selected
    },
    templateUrl: 'src/app/templates/crCardSelector.html',
    link: function(scope, element, attrs) {

      scope.suitOrder = logicProvider.cards.suitOrder;
      scope.suitSymbol = logicProvider.cards.suitSymbol;
      scope.suitColor = logicProvider.cards.suitColor;
      scope.rankOrder = logicProvider.cards.rankOrder;

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
          scope.card.suit = scope.suit;
          scope.card.rank = scope.rank;
        } else {
          scope.card.suit = '';
          scope.card.rank = '';
        }
      };

    }
  }
}]);
var ViewUtils = (function(ViewUtils) {

  ViewUtils.stringifyDuplicateCards = function(duplicates, Cards, cardToStringFilter) {
    var errorText = 'The hand may not contain duplicate cards: ';
    return errorText + cardToStringFilter(duplicates);
  };

  ViewUtils.convertScoreBreakdownToTableRowsSortedByCard = function(breakdownObj, Cards) {
    // Sort by card rank and then by score, to make sure all the suits with the same score
    // are adjacent before the object is broken up
    var starterScores = breakdownObj.sort(function(a, b) {
      if (a.starter.rank !== b.starter.rank) {
        return Cards.cardRankComparator(a.starter, b.starter);
      } else if (a.score !== b.score) {
        return a.score - b.score;
      } else {
        return Cards.cardSuitComparator(a.starter, b.starter);
      }
    });

    var tableRows = [];
    for (var i = 0; i < starterScores.length; i++) {
      var cur = starterScores[i];
      if (prev && cur.starter.rank === prev.starter.rank && cur.score === prev.score) {
        rowObj.cards.push(cur.starter);
      } else {
        if (rowObj) tableRows.push(rowObj);
        var rowObj = { cards: [], score: cur.score };
        rowObj.cards.push(cur.starter);
      }
      var prev = cur;
    }
    if (rowObj) tableRows.push(rowObj);
    return tableRows;
  };

  ViewUtils.convertScoreBreakdownToTableRowsSortedByScore = function(breakdownObj, Cards) {
    var scoreStarters = _.groupBy(breakdownObj, function(obj) { return obj.score; });
    var tableRows = [];
    _.values(scoreStarters).forEach(function(starterScoreArray) {
      var rowObj = {
        cards: _.pluck(starterScoreArray, 'starter'),
        score: starterScoreArray[0].score
      };
      tableRows.push(rowObj);
    });
    return _.sortBy(tableRows, 'score').reverse();
  };

  ViewUtils.chunkCardArrayByRank = function(cardArray, Cards) {
    var cardsByRank = _.groupBy(cardArray, function(card) { return card.rank; });
    var sortedRanks = _.keys(cardsByRank).sort(Cards.cardRankComparatorFromRank);
    return sortedRanks.map(function(rank) { return cardsByRank[rank].sort(Cards.cardSuitComparator); });
  };

  return ViewUtils;
})(ViewUtils || {});
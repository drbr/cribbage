var ViewUtils = (function(ViewUtils) {

  ViewUtils.stringifyDuplicateCards = function(duplicates, Cards) {
    var errorText = 'The hand may not contain duplicate cards: ';
    var duplicatesString = duplicates.map(function(card) {
      return Cards.toString(card);
    }).join(', ');
    return errorText + duplicatesString;
  };

  ViewUtils.convertScoreBreakdownToTableRows = function(breakdownObj, Cards) {
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

  return ViewUtils;
})(ViewUtils || {});
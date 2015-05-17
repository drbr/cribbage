var Util = (function(Util) {

  // Enumerate all subsets, of size subsetSize, from the list of items.
  // Returns an array where each element is in the format { in: [], out: [] }.
  // in represents the items in the subset, and out represents other items.
  Util.enumerateSubsets = function(items, subsetSize) {
    var allSubsets = [];

    function buildSubsets(itemsInSubset, itemsNotInSubset, furtherItems, subsetSize) {

      if (subsetSize <= 0) {
        if (itemsInSubset.length > 0) {
          allSubsets.push({
            in: itemsInSubset,
            out: itemsNotInSubset.concat(furtherItems)
          });
        }
        return;

      } else if (subsetSize > furtherItems.length) {
        return;
      }

      buildSubsets(itemsInSubset.concat(furtherItems[0]), itemsNotInSubset,
          furtherItems.slice(1), subsetSize - 1);
      buildSubsets(itemsInSubset, itemsNotInSubset.concat(furtherItems[0]),
          furtherItems.slice(1), subsetSize);
    }

    buildSubsets([], [], items, subsetSize);
    return allSubsets;
  };

  return Util;
})(Util || {});
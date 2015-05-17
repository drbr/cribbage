describe('Util', function() {
  describe('enumerateSubsets', function() {

    function subsetObj(subset, fullArray) {
      return {
        in: subset,
        out: _.difference(fullArray, subset)
      };
    };

    describe('should enumerate no subsets of the empty set', function() {
      it('0 choose 0', function() {
        expect(Util.enumerateSubsets([], 0)).to.eql([]);
      });

      it('0 choose 1', function() {
        expect(Util.enumerateSubsets([], 1)).to.eql([]);
      });
    });

    describe('should enumerate no subsets when k is negative', function() {
      it('3 choose -2', function() {
        expect(Util.enumerateSubsets(['A', 'B', 'C'], -2)).to.eql([]);
      });
    });

    describe('should enumerate no subsets when k is zero', function() {
      it('1 choose 0', function() {
        expect(Util.enumerateSubsets(['A'], 0)).to.eql([]);
      });

      it('4 choose 0', function() {
        expect(Util.enumerateSubsets(['A', 'B', 'C', 'D'], 0)).to.eql([]);
      });
    });

    describe('should enumerate one subset when k equals n', function() {
      it('1 choose 1', function() {
        var array = ['A'];
        expect(Util.enumerateSubsets(array, 1)).to.eql([ subsetObj(array, array) ]);
      });

      it('2 choose 2', function() {
        var array = ['A', 'B'];
        expect(Util.enumerateSubsets(array, 2)).to.eql([ subsetObj(array, array) ]);
      });

      it('5 choose 5', function() {
        var array = ['A', 'B', 'C', 'D', 'E'];
        expect(Util.enumerateSubsets(array, 5)).to.eql([ subsetObj(array, array) ]);
      });
    });

    describe('should not generate any subsets when k is greater than n', function() {
      it('1 choose 2', function() {
        expect(Util.enumerateSubsets(['A'], 2)).to.eql([]);
      });

      it('3 choose 5', function() {
        expect(Util.enumerateSubsets(['A', 'B', 'C'], 5)).to.eql([]);
      });
    });

    describe('should enumerate subsets correctly when k is less than n (general case)', function() {
      it('2 choose 1', function() {
        var array = ['A', 'B'];
        expect(Util.enumerateSubsets(array, 1)).to.eql([
          subsetObj(['A'], array),
          subsetObj(['B'], array)
        ]);
      });

      it('3 choose 2', function() {
        var array = ['A', 'B', 'C'];
        expect(Util.enumerateSubsets(array, 2)).to.eql([
          subsetObj(['A', 'B'], array),
          subsetObj(['A', 'C'], array),
          subsetObj(['B', 'C'], array)
        ]);
      });

      it('5 choose 3', function() {
        var array = ['A', 'B', 'C', 'D', 'E'];
        expect(Util.enumerateSubsets(array, 3)).to.eql([
          subsetObj(['A', 'B', 'C'], array),
          subsetObj(['A', 'B', 'D'], array),
          subsetObj(['A', 'B', 'E'], array),
          subsetObj(['A', 'C', 'D'], array),
          subsetObj(['A', 'C', 'E'], array),
          subsetObj(['A', 'D', 'E'], array),
          subsetObj(['B', 'C', 'D'], array),
          subsetObj(['B', 'C', 'E'], array),
          subsetObj(['B', 'D', 'E'], array),
          subsetObj(['C', 'D', 'E'], array)
        ]);
      });
    });
  });
});
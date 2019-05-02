var assert = require('assert');
var calc = require('../../models/calc')

describe('Calc', function() {
  describe('sum()', function() {

    it('should return 3 when we sum 2 and 1', function() {
      assert.equal(3, calc.sum(2,1));
    });

    it('should return 0.3 when we sum 0.2 and 0.1', function() {
        assert.equal(0.3, calc.sum(0.2,0.1));
    });

  });
});

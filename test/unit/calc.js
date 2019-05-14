var assert = require("assert");
var calc = require("../../models/calc");

describe("Calc", function() {
  describe("sum()", function() {
    it("should return 3 when we sum 2 and 1", function() {
      assert.equal(4, calc.sum(2, 1));
    });
  });
});

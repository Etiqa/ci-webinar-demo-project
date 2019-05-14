var express = require('express');
var router = express.Router();
var calc = require('../models/calc');

/* Do the math. */
router.get('/sum/:a/:b', function(req, res, next) {
  res.send({
    value:calc.sum(+req.params.b,+req.params.b)});
});

module.exports = router;

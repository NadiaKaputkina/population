var express = require('express');
var router = express.Router();

const auth = require('./middleware/auth');
const permissions = require('./middleware/permissions');

/* GET home page. */
router.get('/', auth, permissions, function(req, res, next) {
  res.render('roles');
});

module.exports = router;

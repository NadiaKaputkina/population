var express = require('express');
var router = express.Router();

const roles = require('../controllers/roles.controller');

const auth = require('./middleware/auth');
const permissions = require('./middleware/permissions');

/* GET home page. */
router.get('/', auth, permissions, roles.getRoles);

router.post('/', auth, permissions, roles.saveRoles);

router.post('/new-object', auth, permissions, roles.addNewObject);

module.exports = router;

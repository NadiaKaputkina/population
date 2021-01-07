var express = require('express');
var router = express.Router();

const { Op } = require('sequelize');

const auth = require('./middleware/auth');
const permissions = require('./middleware/permissions');

const persons = require('../controllers/persons.controller');

/* GET users listing. */
router.get('/', auth, permissions, persons.getAllPersons);
router.get('/:id', auth, permissions, persons.getPersonById);
router.get('/new', auth, permissions, function(req, res, next) {
  res.render('user', {})
});

router.get('/:id/get-child', auth, permissions, persons.getChildByPersonId);
router.get('/:id/get-parents', auth, permissions, persons.getParentByPersonId);

router.post('/save', auth, permissions, persons.savePerson);
router.delete('/:id/delete', auth, permissions, persons.deletePerson);

router.post('/get-person-by-search-params', auth, permissions, persons.getPersonBySearchParams);

module.exports = router;

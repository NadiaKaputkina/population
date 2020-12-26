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


router.post('/get-filtered-users', auth, permissions, function(req, res, next) {
  const searchParams = req.body;

  Users.findAll({
    where: {
      SexId: searchParams.sexId
    },
    order: ['Id']
  })
    .then(users =>  res.status(200).send(users) )
    .catch(error => res.status(500).send(error) )
})

router.post('/get-user-by-search-params', auth, permissions, function(req, res, next) {
  const { DateOfBirthCurrentUser, IdentificationNumber, LastName } = req.body;
  
  let date = new Date(DateOfBirthCurrentUser);
  let year = date.getFullYear() - 10;
  date.setFullYear(year);

  Users.findAll({
      include: [Sexes],
      where: {
          IdentificationNumber: {
            [Op.like]: `${IdentificationNumber}%`
          },
          LastName: {
            [Op.like]: `${LastName}%`
          },
          DateOfBirth: {
            [Op.lte]: date
          }
      }
  })
  .then(users => {
    return users.length > 0 ? 
      res.status(200).send(users) :
      res.status(200).send({text: 'Не найдено'})
    })
  .catch(error => res.status(500).send(error) )
});

module.exports = router;

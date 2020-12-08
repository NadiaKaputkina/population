var express = require('express');
var router = express.Router();

const Users = require('../models/users');
const Sexes = require('../models/sexes');
const { DataTypes } = require('sequelize');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('/')
  Users.belongsTo(Sexes, {
    foreignKey: 'SexId'
  })

  Users.findAll({
    include: [Sexes],
    order: ['Id']
  })
    .then(users => res.render('users', { users }) )
    .catch(error => res.render('error', { error }) )
});

router.post('/get-filtered-users', function(req, res, next) {
  const { sexId } = req.body;
  console.log('/get-filtered-users', sexId)
  Users.findAll({
    where: {
      SexId: sexId
    },
    order: ['Id']
  })
    .then(users =>  res.status(200).send(users) )
    .catch(error => res.status(500).send(error) )
})

router.get('/:id', function(req, res, next) {
  console.log('/:id')
  const userId = req.params.id;

  Users.findByPk(userId)
    .then(user =>  res.render('user', { user }) )
    .catch(error => res.render('error', { error }) )
});

module.exports = router;

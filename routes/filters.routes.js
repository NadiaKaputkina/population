var express = require('express');
var router = express.Router();

const auth = require('./middleware/auth');
const permissions = require('./middleware/permissions');

const db = require('../models');
const Sexes = db.Sexes;
const MaritalStatuses = db.MaritalStatuses;
const Users = db.Users;

/* GET home page. */
router.get('/get-filters', async function(req, res, next) {
    const sexes = await Sexes.findAll()
    const maritalStatuses = await MaritalStatuses.findAll()

    res.status(200).send({ sexes, maritalStatuses })
});

router.post('/get-filtered-persons', auth, permissions, function(req, res, next) {
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

// router.get('/get-sexes', function(req, res, next) {
//     Sexes.findAll()
//     .then(sexes => res.status(200).send({ sexes }))
    
// });

// router.get('/get-sexes', function(req, res, next) {
//     Sexes.findAll()
//     .then(sexes => res.status(200).send({ sexes }))
    
// });

// router.get('/get-sexes', function(req, res, next) {
//     Sexes.findAll()
//     .then(sexes => res.status(200).send({ sexes }))
    
// });

module.exports = router;

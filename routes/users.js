var express = require('express');
var router = express.Router();

const { Op } = require('sequelize');

const Users = require('../models/users');
const Sexes = require('../models/sexes');
const Children = require('../models/children');

/* GET users listing. */
router.get('/', function(req, res, next) {
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
  const searchParams = req.body;
console.log(searchParams)
  Users.findAll({
    where: {
      SexId: searchParams.sexId
    },
    order: ['Id']
  })
    .then(users =>  res.status(200).send(users) )
    .catch(error => res.status(500).send(error) )
})

router.get('/:id', function(req, res, next) {
  const userId = req.params.id;

  Users.findByPk(userId)
    .then(user =>  res.render('user', { user }) )
    .catch(error => res.render('error', { error }) )
});

router.get('/:id/get-child', async function(req, res, next) {
  const userId = req.params.id;

  let childIds = [];
  
  await Children.findAll({
    attributes: ['ChildId'],
    where: {
      ParentId: userId
    }
  })
  .then(models => {
    childIds = models.map(model => model.getDataValue('ChildId'))
  }) 
  .catch(error => res.status(500).send(error) )

  if (!childIds.length) {
    res.status(200).send({title:'Нет детей'})
  } else {
    await Users.findAll({
      attributes: ['FirstName', 'LastName', 'SexId', 'IdentificationNumber'],
      where: {
        Id: {
          [Op.or]: childIds
        }
      }
    })
      .then(children =>  res.status(200).send(children) )
      .catch(error => res.status(500).send(error) )
  }
});

router.get('/:id/get-parents', async function(req, res, next) {
  const userId = req.params.id;

  let parentIds = [];
  
  await Children.findAll({
    attributes: ['ParentId'],
    where: {
      ChildId: userId
    }
  })
  .then(models => {
    parentIds = models.map(model => model.getDataValue('ParentId'))
  }) 
  .catch(error => res.status(500).send(error) )

  if (!parentIds.length) {
    res.status(200).send({title: 'Нет родителей'})
  } else {
    await Users.findAll({
      attributes: ['FirstName', 'LastName', 'SexId', 'IdentificationNumber'],
      where: {
        Id: {
          [Op.or]: parentIds
        }
      }
    })
      .then(parents =>  res.status(200).send(parents) )
      .catch(error => res.status(500).send(error) )
  }

});

router.get('/new', function(req, res, next) {
  res.render('user', {})
});

router.post('/save', async function(req, res, next) {
  const { Id, ...userParams } = req.body;
  let userId = Id;

  if (Id) {
    console.log('--- update ---')
    await Users.update(userParams, {
      where: {
        Id: Id
      }
    })
  } else {
    console.log('--- new ---')
    const newUser = await Users.create(userParams);
    userId = newUser.Id;
  }
 
  Users.findByPk(userId)
  .then(user =>  res.status(200).send(user) )
  .catch(error => res.status(500).send(error) )
  
});

router.delete('/:id/delete', async function(req, res, next) {
  const userId = req.params.id;

  Users.destroy({
    where: {
      Id: userId
    }
  })
  .then(() => res.send(200))
  .catch(() => res.send(500))
});

module.exports = router;

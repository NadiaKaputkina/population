var express = require('express');
var router = express.Router();

const { Op } = require('sequelize');
const upload = require('./middleware/upload');
const { uploadFiles } = require('../controllers/upload');

const Users = require('../models').Users;
const Sexes = require('../models').Sexes;
const Children = require('../models').Children;
const MaritalStatuses = require('../models').MaritalStatuses;

/* GET users listing. */
router.get('/', function(req, res, next) {
  Users.findAll({
    include: [Sexes, MaritalStatuses],
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
    res.status(200).send({text:'Дети не найдены'})
  } else {
    await Users.findAll({
      attributes: ['FirstName', 'LastName', 'SexId', 'DateOfBirth', 'IdentificationNumber'],
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
    res.status(200).send({text: 'Родители не найдены'})
  } else {
    await Users.findAll({
      attributes: ['FirstName', 'LastName', 'SexId', 'DateOfBirth', 'IdentificationNumber'],
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

router.post('/get-user-by-search-params', function(req, res, next) {
  const { DateOfBirthCurrentUser, IdentificationNumber, LastName } = req.body;
  
  let date = new Date(DateOfBirthCurrentUser);
  let year = date.getFullYear() - 10;
  date.setFullYear(year);

  console.log(DateOfBirthCurrentUser, date);

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

router.get('/new', function(req, res, next) {
  res.render('user', {})
});

router.post('/save', upload.single('file'), async function(req, res, next) {
  const { Id, ...userParams } = req.body;

  await uploadFiles(req, res);

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

  console.log(userParams.parentsIds)
  if (Array.isArray(userParams.parentsIds)) {
    Children.create({
      ChildId: userId,
      ParentId: userParams.parentsIds
    })
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

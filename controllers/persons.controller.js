const db = require('../models');
const Users = db.Users;
const Sexes = db.Sexes;
const Children = db.Children;
const MaritalStatuses = db.MaritalStatuses;

const { Op } = require('sequelize');

exports.getAllPersons = async (req, res) => {
    const currentAccount = req.params.accountData;

    await Users.findAll({
        include: [Sexes, MaritalStatuses],
        order: ['Id']
    })
        .then(users => res.render('users', { users, currentAccount }) )
        .catch(error => res.render('error', { error }) )
};

exports.getPersonById = async (req, res) => {
    const userId = req.params.id;

    await Users.getUserById(userId)
      .then(user =>  res.render('user', { user }) )
      .catch(error => res.render('error', { error }) )
};

exports.savePerson = async (req, res) => {
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

  if (Array.isArray(userParams.parentsIds)) {
    await Children.create({
      ChildId: userId,
      ParentId: userParams.parentsIds
    })
  }

  await Users.findByPk(userId)
  .then(user =>  res.status(200).send(user) )
  .catch(error => res.status(500).send(error) )
};

exports.deletePerson = async (req, res) => {
    const userId = req.params.id;

    await Users.destroy({
      where: {
        Id: userId
      }
    })
    .then(() => res.send(200))
    .catch(() => res.send(500))
};

exports.getChildByPersonId = async (req, res) => {
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
};

exports.getParentByPersonId = async (req, res) => {
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
};

exports.get = async (req, res) => {

};

exports.get = async (req, res) => {

};

exports.get = async (req, res) => {

};

exports.get = async (req, res) => {

};
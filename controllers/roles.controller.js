const db = require('../models');
const Roles = db.Roles;
const SysObjects = db.SysObjects;
const RolesActions = db.RolesActions;
const ObjectsActions = db.ObjectsActions;

const { Op } = require('sequelize');

exports.getRoles = async (req, res) => {
    Roles.findAll({
        attributes: ['Id', 'Title'],
        include: ObjectsActions
    })
    .then(roles => res.status(200).render('roles', { roles }))
};

exports.saveRoles = async (req, res) => {
    // const currentAccount = req.params.accountData;

    // await Users.findAll({

    //     include: [Sexes, MaritalStatuses],
    //     order: ['Id']
    // })
    //     .then(users => res.render('users', { users, currentAccount }) )
    //     .catch(error => res.render('error', { error }) )
};

exports.addNewObject = async (req, res) => {
    const newObject = req.body.title;

    if (newObject) {
        const isObjectExit = await checkDuplicateObject(newObject);
        console.log('-----isObjectExit=', isObjectExit);

        if (isObjectExit !== null) {
            res.status(400).send({message: 'Объект уже существует.'})
        } else {
            const obj = await SysObjects.create({
                Title: newObject
            });

            if (obj === null) {
                res.status(400).send('Error')
            } else {
                ObjectsActions.addActionsByNewObject(obj.Title)
                .then(responses => responses.map(model => model.Title))
                .then(objsList => res.status(201).send({
                    objName: newObject, 
                    objsList: objsList
                }))
                .catch(error => res.render('error', { error }))
            }
        }
    }
}

const checkDuplicateObject = async (object) => {
    return SysObjects.findOne({
        where: { 
            Title: object
        }
    })
};
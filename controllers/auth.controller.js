const db = require('../models');
const Accounts = db.Accounts;

const config = require('../config/config')['env'];

const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');

exports.signin = async (req, res) => {
    const { email, password } = req.body;

    await Accounts.findOne({
        where: {
            [Op.or]: [
                { Email: email },
                { Login: email }
            ]
        }
    })
    .then(account => {
        if (!account) {
            res.status(404).render('login', { email: 'Ошибка аутентификации. Пользователь не найден.' })
        } else {
            const isPwdCompare = Accounts.comparePassword(password, account.Password);
    
            if (isPwdCompare) {
                //set JWT token
                const token = jwt.sign({ id: account.Id }, config.jwt_secret, { expiresIn: '1d'});
                console.log('-----------------------');
                res.cookie('jwt_token', token, { maxAge: 24*60*60*1000 })
                res.redirect('/')
            } else {
                res.status(404).render('login', { password: 'Ошибка аутентификации. Неправильный пароль.' })
            }
        }
    })
    .catch(err => res.status(500).send({ message: err.message }))
};

exports.signup = async (req, res) => {

};
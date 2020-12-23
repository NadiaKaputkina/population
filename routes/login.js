const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');

const Accounts = require('../models').Accounts;
const config = require('../config/config')['env'];

router.route('/')
    .get(function(req, res, next) {
        res.render('login')
    })
    .post(function(req, res, next) {
        const { email, password } = req.body;

        Accounts.findOne({
            where: {
                [Op.or]: [
                    { Email: email },
                    { Login: email }
                ]
            }
        })
        .then(account => {
            if (!account) {
                res.render('login', { errorLogin: 'Ошибка аутентификации. Пользователь не найден.', email })
            } else {
                const isPwdCompare = Accounts.comparePassword(password, account.Password);
        
                if (isPwdCompare) {
                    //set JWT token
                    const token = jwt.sign({ id: account.Id }, config.jwt_secret, { expiresIn: '1d'});
                    
                    res.cookie('jwt_token', token, { maxAge: 24*60*60*1000 })
                    res.redirect('/')
                } else {
                    res.render('login', { errorLogin: 'Ошибка аутентификации. Неправильный пароль.', email })
                }
            }
        })
        .catch(error => console.log(error))
    })
module.exports = router;
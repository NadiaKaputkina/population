const express = require('express');
const router = express.Router();

const authC = require('../controllers/auth.controller');

const auth = require('./middleware/auth');
const permissions = require('./middleware/permissions');

router.get('/signin', function(req, res, next) {
    res.render('login')
});

router.post('/signin', authC.signin);
router.post('/signup', auth, permissions, authC.signup);

router.get('/signout', function(req, res, next) {
    res.render('login')
});

module.exports = router;
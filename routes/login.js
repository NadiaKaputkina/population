const express = require('express');
const router = express.Router();

router.route('/')
    .get(function(req, res, next) {
        res.render('login')
    })
    .post(function(req, res, next) {
        const { email, password } = req.body;
        console.log(email, password);

        
        res.redirect('/')
    })
module.exports = router;
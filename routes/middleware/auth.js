const jwt = require('jsonwebtoken');
const config = require('../../config/config')['env'];

const auth = async function(req, res, next) {
    try {
        req.params.authAccountId = jwt.verify(req.cookies['jwt_token'], config.jwt_secret).id;
        
        next();
    } catch (e) {
        return res.redirect('/login')
    }
}

module.exports = auth;
const config = require('./config')['env'];

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const Accounts = require('../models').Accounts;

module.exports = (passport) => {
    const options = {
        secretOrKey: config.jwt_secret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    };

    passport.use(new JwtStrategy(options, (payload, done) => {
        Accounts.findByPk(payload.id)
        .then(account => {
            if (account) done(null, account);
            else done(null, false);
        })
        .catch(err => console.log(err))
    }))
}
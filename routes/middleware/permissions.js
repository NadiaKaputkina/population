const config = require('../../config/config')['env'];
const Accounts = require('../../models').Accounts;

const permissions = async function(req, res, next) {
    const accountId = req.params.authAccountId;

    if (!accountId) {
        return res.redirect('/login')
    } 

    Accounts.findByPk(accountId)
    .then(account => {
        const { Password, ...accountWithoutPassword } = account;

        req.params.accountData = accountWithoutPassword;
        next();
    })
    .catch(error => res.redirect('/login'))
    // .catch(() => next({ statusCode: 404, error: true, message: 'Пользователь не найден' }))
    
}

module.exports = permissions;
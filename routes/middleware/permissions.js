const config = require('../../config/config')['env'];
const Accounts = require('../../models').Accounts;

const permissions = async function(req, res, next) {
    const accountId = req.params.authAccountId;

    if (!accountId) {
        return res.redirect('/login')
    } 

    const account = await Accounts.findByPk(accountId, {
        attributes: ['Id', 'FirstName', 'LastName', 'RoleId', 'Email']
    })

    if (account === null) {
        next({ statusCode: 404, error: true, message: 'Пользователь не найден' })
    } else {
        const { Id, FirstName, LastName, RoleId, Email } = account;
        
        const Role = Accounts.getAccountRole(RoleId);

        req.params.accountData = {
            Id,
            FirstName,
            LastName,
            Role,
            Email
        };

        next();
    }
}

module.exports = permissions;
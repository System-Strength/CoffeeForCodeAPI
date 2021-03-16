const mysql = require('../mysql')


exports.postCategory = async (req, res, next ) => {
    try {
    const query = 'INSERT INTO tbl_shoppingcart(email_user, cd_prod, qt_prod) VALUES (?,?,?)'
    const result = await mysql.execute(query, [ req.params.email_user, req.params.cd_prod, req.params.qt_prod ])
    return res.status(201).send({
        email_user: result.email_user,
        cd_prod: req.params.cd_prod,
        qt_prod: req.params.qt_prod
    });
    } catch (error) {
        return res.status(500).send({error: error})
    }
};
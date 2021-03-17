const mysql = require('../mysql')

exports.getCartOffUser = async (req, res, next) => {
    try {
        const query = 'select * from tbl_shoppingcart where email_user = ?;'
        const resultcart = await mysql.execute(query, [req.params.email_user]) 
    if(resultcart.length < 1){
        return res.status(412).send({ warning: 'This user doesn`t have anything on your cart' })
    }else {
        const responsecart = {
            CartItens: resultcart.map(cart => {
                return {
                    cd_prod: cart.cd_prod,
                    qt_prod: cart.qt_prod,
        }
    })
    }
    return res.status(200).send(responsecart)
    }
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

//  Insert new iten on shoppingCart
exports.postIntenOnCart = async (req, res, next ) => {
    try {
        //  Verify if have same product on user cart
        const queryHave = 'select * from tbl_shoppingcart where email_user = ? and cd_prod = ?;'
        const resultHaveOnCart = await mysql.execute(queryHave, [req.params.email_user, req.params.cd_prod]) 

        if(resultHaveOnCart.length > 0){
            return res.status(409).send({error: 'Just have this product on your cart'})
        }else{
            //  Insert products on user cart
            const query = 'INSERT INTO tbl_shoppingcart(email_user, cd_prod, qt_prod) VALUES (?,?,?)'
            const result = await mysql.execute(query, [ req.params.email_user, req.params.cd_prod, req.params.qt_prod ])
            return res.status(201).send({
                email_user: result.email_user,
                cd_prod: req.params.cd_prod,
                qt_prod: req.params.qt_prod
            });
        }
    } catch (error) {
        return res.status(500).send({error: error})
    }
};

exports.patchItenCard = async (req, res, next) => {
    try {
        //  Verify if have same product on user cart
        const queryHave = 'SELECT * FROM tbl_shoppingcart WHERE email_user = ? and cd_prod = ?;'
        const resultHaveOnCart = await mysql.execute(queryHave, [req.params.email_user, req.params.cd_prod])
        if(resultHaveOnCart.length > 0){const query = `UPDATE tbl_shoppingcart SET qt_prod = ?
                                                                WHERE email_user = ? and cd_prod = ? `
        await mysql.execute(query, [ req.params.qt_prod, req.params.email_user, req.params.cd_prod ])
        const response = {
            mensagem: 'Cart updated successfully !!',
            productsUpdated: {
                email_user: req.params.email_user,
                cd_prod: req.params.cd_prod,
                qt_prod: req.params.qt_prod,
            }
        }
        return res.status(202).send(response);
        }else{
            return res.status(417).send({warning: 'User don`t have this product on cart'})
        }
        
    } catch (error) {
        return res.status(500).send({error: error})
    }
}

exports.deleteItenCart = async (req, res, next) => {
    try {

        const queryNoHave = 'SELECT * FROM tbl_shoppingcart WHERE email_user = ? and cd_prod = ?;'
        const resultNoHaveOnCart = await mysql.execute(queryNoHave, [req.params.email_user, req.params.cd_prod])
        if(resultNoHaveOnCart.length > 0){
            const query = 'DELETE FROM tbl_shoppingcart where email_user = ? AND cd_prod = ?;'
            await mysql.execute(query, [req.params.email_user, req.params.cd_prod])
            const response = {
                mensagem: 'Product successfully removed'
            }
            return res.status(202).send(response);
        }else {
            return res.status(417).send({ error: 'User don`t have this product on cart' })
        }
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}
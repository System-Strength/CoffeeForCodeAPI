const mysql = require('../mysql')

//  Insert new iten on shoppingCart
exports.postNewCard = async (req, res, next ) => {
    try {
        //  Verify if have same product on user cart
        const queryHave = 'select * from tbl_cards where email_user = ?;'
        const resultHaveOnCart = await mysql.execute(queryHave, [req.params.email_user]) 

        if(resultHaveOnCart.length >= 3){
            return res.status(207).send({error: 'User have more of 3 cards'})
        }else{
            const querySameCard = 'select * from tbl_cards where number_card = ?;'
            const SameCard = await mysql.execute(querySameCard, [req.params.number_card] )
            if(SameCard.length > 0){
                return res.status(409).send({error: 'Card already inserted'})
            }else{//  Insert products on user cart
                const query = 'INSERT INTO tbl_cards(email_user, flag_card, number_card, shelflife_card, cvv_card, nmUser_card) VALUES (?,?,?,?,?,?)'
                const result = await mysql.execute(query, [ req.params.email_user, req.params.flag_card, req.params.number_card, req.params.shelflife_card,
                    req.params.cvv_card, req.params.nmUser_card ])
                return res.status(201).send({
                    email_user: result.email_user,
                    number_card: req.params.number_card,
                    shelflife_card: req.params.shelflife_card,
                    flag_card: req.params.flag_card,
                    nmUser_card: req.params.nmUser_card
                });
            }
        }
    } catch (error) {
        return res.status(500).send({error: error})
    }
};
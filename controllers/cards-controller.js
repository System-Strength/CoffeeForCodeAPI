const mysql = require('../mysql')


exports.getCardOfUser = async (req, res, next) => {
    try {
        const query = 'select * from tbl_cards where email_user = ?;'
        const resultcard = await mysql.execute(query, [req.params.email_user]) 
    if(resultcard.length < 1){
        return res.status(412).send({ warning: 'This user doesn`t have any card on account' })
    }else {
        const responsecard = {
            length: resultcard.length,
            Cards: resultcard.map(cards => {
                return {
                    cd_card: parseInt(cards.cd_card),
                    email_user: cards.email_user,
                    flag_card: cards.flag_card,
                    number_card: cards.number_card,
                    shelflife_card: cards.shelflife_card,
                    cvv_card: cards.cvv_card,
                    nmUser_card: cards.nmUser_card
        }
    })
    }
    return res.status(200).send(responsecard)
    }
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

//  Insert new Card for user
exports.postNewCard = async (req, res, next ) => {
    try {
        //  Check how many cards are registered
        const queryHave = 'select * from tbl_cards where email_user = ?;'
        const resultHaveOnCart = await mysql.execute(queryHave, [req.params.email_user]) 

        if(resultHaveOnCart.length >= 3){
            return res.status(207).send({error: 'User have more of 3 cards'})
        }else{
            //  Check if have the same card on user account
            const querySameCard = 'select * from tbl_cards where number_card = ?;'
            const SameCard = await mysql.execute(querySameCard, [req.params.number_card] )
            if(SameCard.length > 0){
                return res.status(409).send({error: 'Card already inserted'})
            }else{//  Insert card for user
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

exports.deleteCard = async (req, res, next) => {
    try {
        const queryNoHave = 'SELECT * FROM tbl_cards WHERE email_user = ? and cd_card = ?;'
        const resultNoHaveOnCart = await mysql.execute(queryNoHave, [req.params.email_user, req.params.cd_card])
        if(resultNoHaveOnCart.length > 0){
            const query = 'DELETE FROM tbl_cards where email_user = ? AND cd_card = ?;'
            await mysql.execute(query, [req.params.email_user, req.params.cd_card])
            const response = {
                mensagem: 'Product successfully removed'
            }
            return res.status(202).send(response);
        }else {
            return res.status(417).send({ error: 'User don`t have this card' })
        }
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}
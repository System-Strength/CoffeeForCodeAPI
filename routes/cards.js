const express = require('express');
const router = express.Router();
const CardsController = require('../controllers/cards-controller');

router.get('/:email_user', CardsController.getCardOfUser);

router.post('/insert/:email_user/:flag_card/:number_card/:shelflife_card/:cvv_card/:nmUser_card', CardsController.postNewCard)

router.delete('/remove/:email_user/:cd_card', CardsController.deleteCard)

module.exports = router;
const express = require('express');
const router = express.Router();
const ShoppingCartController = require('../controllers/shoppingcart_controller');

router.get('/');

router.post('/insert/:email_user/:cd_prod/:qt_prod', ShoppingCartController.postCategory)

module.exports = router;
const express = require('express');
const router = express.Router();
const ShoppingCartController = require('../controllers/shoppingcart_controller');

router.get('/:email_user', ShoppingCartController.getCartOffUser);

router.post('/insert/:email_user/:cd_prod/:qt_prod', ShoppingCartController.postIntenOnCart)


router.patch('/updatecart/:email_user/:cd_prod/:qt_prod', ShoppingCartController.patchItenCard)


router.delete('/deleteItenCart/:email_user/:cd_prod/', ShoppingCartController.deleteItenCart)

module.exports = router;
const express = require('express');
const router = express.Router();
const ShoppingCartController = require('../controllers/shoppingcart_controller');

router.get('/:email_user', ShoppingCartController.getCartOffUser);

router.post('/insert/:id_user/:email_user/:cd_prod/:nm_prod/:img_prod/:qt_prod/:price_unit_prod/:full_price_prod', ShoppingCartController.postIntenOnCart)

router.patch('/updatecart/:email_user/:cd_prod/:qt_prod/:full_price_prod', ShoppingCartController.patchItenCard)


router.delete('/deleteItenCart/:email_user/:cd_prod/', ShoppingCartController.deleteItenCart)

module.exports = router;
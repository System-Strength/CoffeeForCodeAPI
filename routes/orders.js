const express = require('express');
const router = express.Router();
const OrdersControler = require('../controllers/orders-controller');

// Retorna todos os pedidos
router.get('/:email_user', OrdersControler.getOrders);

// Insere um pedidos
router.post('/insert/:email_user/:zipcode/:address_user/:complement/:cd_prods/:PayFormat_user/:status', OrdersControler.postOrder);

// Retona os dados de 1 pedido
router.get('/:orderId', OrdersControler.getOrderDetail );

//  Exclui um pedido
router.delete('/:orderId', OrdersControler.deleteOrder);


module.exports = router;
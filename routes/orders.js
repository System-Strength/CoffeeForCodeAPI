const express = require('express');
const router = express.Router();
const OrdersControler = require('../controllers/orders-controller');

// Retorna todos os pedidos
router.get('/', OrdersControler.getOrders);

// Insere um pedidos
router.post('/', OrdersControler.postOrder);

// Retona os dados de 1 pedido
router.get('/:orderId', OrdersControler.getOrderDetail );

//  Exclui um pedido
router.delete('/:orderId', OrdersControler.deleteOrder);


module.exports = router;
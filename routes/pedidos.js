const express = require('express');
const router = express.Router();
const PedidosControler = require('../controllers/pedidos-controller');

// Retorna todos os pedidos
router.get('/', PedidosControler.getpedidos);

// Insere um pedidos
router.post('/', PedidosControler.postPedidos);

// Retona os dados de 1 pedido
router.get('/:id_pedido', PedidosControler.getUmPedido);

//  Exclui um pedido
router.delete('/', PedidosControler.deletePedido);


module.exports = router;
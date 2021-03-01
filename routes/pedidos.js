const express = require('express');
const router = express.Router();

// Retorna todos os pedidos
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: "Retorna os pedidos"
    });
});

// Insere um pedidos
router.post('/', (req, res, next ) => {
    const pedido = {
        id_produto: req.body.id_produto,
        quantidade: req.body.quantidade
    }
    res.status(201).send({
        mensgem: 'O pedido foi criado',
        pedidoCriado: pedido
    });
});

// Retona os dados de 1 pedido
router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido

    res.status(200).send({
        mensagem: 'Detalhes do pedido',
        id_pedido: id
    });
});

//  Exclui um pedido
router.delete('/', (req, res, next ) => {
    res.status(201).send({
        mensgem: 'Pedido excluido'
    });
});


module.exports = router;
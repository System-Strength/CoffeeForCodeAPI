const express = require('express');
const router = express.Router();

// Retorna todos os produtos
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: "Retorna todos os produtos"
    });
});

// Insere um produto
router.post('/', (req, res, next ) => {
const produto = {
    nome: req.body.nome,
    preco: req.body.preco
};

    res.status(201).send({
        mensgem: 'Insere um produto',
        produtoCriado: produto
    });
});

// Retona os dados de 1 produto
router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto

    if(id === 'especial'){
        res.status(200).send({
            mensagem: 'Voce descobriu o ID especial',
            id: id
        });
    }else {
        res.status(200).send({
            mensagem: 'Voce passou um ID',
        })
    }
});

//  Altera um produto
router.patch('/', (req, res, next ) => {
    res.status(201).send({
        mensgem: 'Produto alterado'
    });
});

//  Exclui um produto
router.delete('/', (req, res, next ) => {
    res.status(201).send({
        mensgem: 'Produto excluido'
    });
});


module.exports = router;
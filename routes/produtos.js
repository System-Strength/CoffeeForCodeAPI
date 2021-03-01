const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

// Retorna todos os produtos
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){ return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM produtos',
            (error, result, fields) => {
                if(error){ return res.status(500).send({error: error})}
                const response = {
                    quantidade: result.length,
                    produtos: result.map(prod => {
                        return {
                            id_produtos: prod.id_produtos,
                            nome_produto: prod.nome_produto,
                            preco_produto: prod.preco_produto,
                            request: {
                                tipo: 'GET',
                                descicao: 'Retorna os detalhes de um produto especifico',
                                url: 'http://localhost:3000/produtos/' + prod.id_produtos
                            }
                        }
                    })
                }
                return res.status(200).send({ response })
            }
        )
    });
});

// Insere um produto
router.post('/', (req, res, next ) => {
    mysql.getConnection((error, conn) => {
        if(error){ return res.status(500).send({error: error})}
        conn.query(
            'INSERT INTO produtos(nome_produto, preco_produto) VALUES (?,?)',
            [req.body.nome_produto, req.body.preco_produto],
            (error, result, field) => {
                conn.release();
                if(error){ return res.status(500).send({error: error})}
                const response = {
                    mensagem: 'Produto inserido com sucesso!!',
                    produtoCriado: {
                        id_produtos: result.insertId,
                        nome_produto: req.body.nome_produto,
                        preco_produto: req.body.preco_produto,
                        request: {
                            tipo: 'GET',
                            descicao: 'Retorna todos os produtos',
                            url: 'http://localhost:3000/produtos'
                        }
                    }
                }
                return res.status(201).send(response);
        }
    )
});
});

// Retona os dados de 1 produto
router.get('/:id_produtos', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){ return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM produtos WHERE id_produtos = ?;',
            [req.params.id_produtos],
            (error, result, fields) => {
                if(error){ return res.status(500).send({error: error})}
                if(result.length == 0){
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado produto com esse ID'
                    })
                }
                const response = {
                    produto: {
                        id_produtos: result[0].id_produtos,
                        nome_produto: result[0].nome_produto,
                        preco_produto: result[0].preco_produto,
                        request: {
                            tipo: 'GET',
                            descicao: 'Retorna todos os produtos',
                            url: 'http://localhost:3000/produtos'
                        }
                    }
                }
                return res.status(201).send(response);
            }
        )
    });
});

//  Altera um produto
router.patch('/', (req, res, next ) => {
    mysql.getConnection((error, conn) => {
        if(error){ return res.status(500).send({error: error})}
        conn.query(
            `UPDATE produtos
                SET nome_produto = ?,
                    preco_produto = ?
                WHERE id_produtos = ?`,
            [req.body.nome_produto, req.body.preco_produto, req.body.id_produtos],
            (error, result, field) => {
                conn.release();
                if(error){ return res.status(500).send({error: error})}
                const response = {
                    mensagem: 'Produto atualizado com sucesso!!',
                    produtoAtualizado: {
                        id_produtos: req.body.insertId,
                        nome_produto: req.body.nome_produto,
                        preco_produto: req.body.preco_produto,
                        request: {
                            tipo: 'GET',
                            descicao: 'Retorna os detalhes de um produto especifico',
                            url: 'http://localhost:3000/produtos/' + req.body.id_produtos
                        }
                    }
                }
                return res.status(202).send(response);
        }
    )
});
});

//  Exclui um produto
router.delete('/', (req, res, next ) => {
    mysql.getConnection((error, conn) => {
        if(error){ return res.status(500).send({error: error})}
        conn.query(
            'DELETE FROM produtos WHERE id_produtos = ?', [req.body.id_produtos],
            (error, result, field) => {
                conn.release();
                if(error){ return res.status(500).send({error: error})}
                const response = {
                    mensagem: 'Produto removido com sucesso',
                    request: {
                        tipo: 'POST',
                        descricao: 'Insere um produto',
                        url: 'http://localhost:3000/produtos',
                        body: {
                            nome_produto: 'String',
                            preco_produto: 'Number'
                        }
                    }
                }
            return res.status(202).send(response);
        }
    )
});
});


module.exports = router;
const mysql = require('../mysql').pool;


exports.getProdutos = (req, res, next) => {
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
                            id_produto: prod.id_produto,
                            nome_produto: prod.nome_produto,
                            preco_produto: prod.preco_produto,
                            imagem_produto: prod.imagem_produto,
                            request: {
                                tipo: 'GET',
                                descicao: 'Retorna os detalhes de um produto especifico',
                                url: process.env.URL_API + 'produtos/' + prod.id_produto
                            }
                        }
                    })
                }
                return res.status(200).send({ response })
            }
        )
    });
};

exports.postProduto = (req, res, next ) => {
    console.log(req.file);
    mysql.getConnection((error, conn) => {
        if(error){ return res.status(500).send({error: error})}
        conn.query(
            'INSERT INTO produtos(nome_produto, preco_produto, imagem_produto) VALUES (?,?,?)',
            [
                req.body.nome_produto,
                req.body.preco_produto,
                req.file.path,
            ],
            (error, result, field) => {
                conn.release();
                if(error){ return res.status(500).send({error: error})}
                const response = {
                    mensagem: 'Produto inserido com sucesso!!',
                    produtoCriado: {
                        id_produto: result.insertId,
                        nome_produto: req.body.nome_produto,
                        preco_produto: req.body.preco_produto,
                        imagem_produto: req.file.path,
                        request: {
                            tipo: 'GET',
                            descicao: 'Retorna todos os produtos',
                            url: process.env.URL_API + 'produtos'
                        }
                    }
                }
                return res.status(201).send(response);
        }
    )
});
};

exports.getUmProduto = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){ return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM produtos WHERE id_produto = ?;',
            [req.params.id_produto],
            (error, result, fields) => {
                if(error){ return res.status(500).send({error: error})}
                if(result.length == 0){
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado produto com esse ID'
                    })
                }
                const response = {
                    produto: {
                        id_produto: result[0].id_produto,
                        nome_produto: result[0].nome_produto,
                        preco_produto: result[0].preco_produto,
                        imagem_produto: result[0].imagem_produto,
                        request: {
                            tipo: 'GET',
                            descicao: 'Retorna todos os produtos',
                            url: process.env.URL_API + 'produtos'
                        }
                    }
                }
                return res.status(201).send(response);
            }
        )
    });
};

exports.patchProduto = (req, res, next ) => {
    mysql.getConnection((error, conn) => {
        if(error){ return res.status(500).send({error: error})}
        conn.query(
            `UPDATE produtos
                SET nome_produto = ?,
                    preco_produto = ?
                WHERE id_produto = ?`,
            [req.body.nome_produto, req.body.preco_produto, req.body.id_produto],
            (error, result, field) => {
                conn.release();
                if(error){ return res.status(500).send({error: error})}
                const response = {
                    mensagem: 'Produto atualizado com sucesso!!',
                    produtoAtualizado: {
                        id_produto: req.body.insertId,
                        nome_produto: req.body.nome_produto,
                        preco_produto: req.body.preco_produto,
                        request: {
                            tipo: 'GET',
                            descicao: 'Retorna os detalhes de um produto especifico',
                            url: process.env.URL_API + 'produtos/' + req.body.id_produto
                        }
                    }
                }
                return res.status(202).send(response);
        }
    )
});
}

exports.deleteProduto = (req, res, next ) => {
    mysql.getConnection((error, conn) => {
        if(error){ return res.status(500).send({error: error})}
        conn.query(
            'DELETE FROM produtos WHERE id_produto = ?', [req.body.id_produto],
            (error, result, field) => {
                conn.release();
                if(error){ return res.status(500).send({error: error})}
                const response = {
                    mensagem: 'Produto removido com sucesso',
                    request: {
                        tipo: 'POST',
                        descricao: 'Insere um produto',
                        url: process.env.URL_API + 'produtos',
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
}
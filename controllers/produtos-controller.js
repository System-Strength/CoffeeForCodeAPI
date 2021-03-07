const mysql = require('../mysql');

exports.getProdutos = async (req, res, next) => {
    try{
        const result = await mysql.execute('SELECT * FROM produtos;');
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
    }catch (error){
        return res.status(500).send({error: error})
    }
}

exports.postProduto = async (req, res, next ) => {
    try {
    console.log(req.file);
    const query = 'INSERT INTO produtos(nome_produto, preco_produto, imagem_produto) VALUES (?,?,?)'
    const result = await mysql.execute(query, [
        req.body.nome_produto,
        req.body.preco_produto,
        req.file.path,
    ])
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
    } catch (error) {
        return res.status(500).send({error: error})
    }
};

exports.getUmProduto = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM produtos WHERE id_produto = ?;';
        const result = await mysql.execute(query, [req.params.id_produto]);
        if (result.length == 0) {
            return res.status(404).send({
                message: 'Não foi encontrado produto com este ID'
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
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.patchProduto = async (req, res, next ) => {
    try {
        const query = `UPDATE produtos
        SET nome_produto = ?,
            preco_produto = ?
        WHERE id_produto = ?`
        await mysql.execute(query, [ req.body.nome_produto, req.body.preco_produto, req.body.id_produto ])
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
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

exports.deleteProduto = async (req, res, next ) => {
    try {
        const query = 'DELETE FROM produtos WHERE id_produto = ?;'
        await mysql.execute(query, [
            req.body.id_produto
        ]);
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
    } catch (error) {
        return res.status(500).send({error: error})
    }
}

exports.getImagens = async (req, res, next) => {
    try{
        const query = 'SELECT * FROM images_produtos WHERE id_produto = ?;'
        const result = await mysql.execute(query, [req.params.id_produto]);
        const response = {
            quantidade: result.length,
            imagens: result.map(img => {
                return {
                    id_produto: parseInt(req.params.id_produto),
                    id_imagem: img.id_imagem,
                    caminho: process.env.URL_API + img.caminho,
                    /* request: {
                        tipo: 'GET',
                        descicao: 'Retorna os detalhes de um produto especifico',
                        url: process.env.URL_API + 'produtos/' + img.id_produto
                    } */
                }
            })
        }
        return res.status(200).send({ response })
    }catch (error){
        return res.status(500).send({error: error})
    }
}

exports.postImagem = async (req, res, next ) => {
    try {
    console.log(req.file);
    const query = 'INSERT INTO images_produtos(id_produto, caminho) VALUES (?,?)'
    const result = await mysql.execute(query, [
        req.params.id_produto,
        req.file.path
    ])
    const response = {
        mensagem: 'Imagem inserida com sucesso!!',
        imagemCriada: {
            id_produto: parseInt(req.params.id_produto),
            id_imagem: result.insertId,
            imagem_produto: req.file.path,
            request: {
                tipo: 'GET',
                descicao: 'Retorna todos as imagens',
                url: process.env.URL_API + 'produtos/' + req.params.id_produto + '/imagens'
            }
        }
    }
    return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({error: error})
    }
};
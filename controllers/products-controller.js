const mysql = require('../mysql');

exports.getProducts = async (req, res, next) => {
    try{
        const result = await mysql.execute('SELECT * FROM products;');
        const response = {
            quantidade: result.length,
            produtos: result.map(prod => {
                return {
                    productId: prod.productId,
                    name: prod.name,
                    price: prod.price,
                    productImage: prod.productImage,
                    request: {
                        tipo: 'GET',
                        descicao: 'Return more information about one product',
                        url: process.env.URL_API + 'products/' + prod.productId
                    }
                }
            })
        }
        return res.status(200).send({ response })
    }catch (error){
        return res.status(500).send({error: error})
    }
}

exports.postProducts = async (req, res, next ) => {
    try {
    console.log(req.file);
    const query = 'INSERT INTO products(name, price, productImage) VALUES (?,?,?)'
    const result = await mysql.execute(query, [
        req.body.name,
        req.body.price,
        req.file.path,
    ])
    const response = {
        mensagem: 'Product successfully inserted !!',
        produtoCriado: {
            id_produto: result.insertId,
            name: req.body.name,
            price: req.body.price,
            imagem_produto: req.file.path,
            request: {
                tipo: 'GET',
                descicao: 'Return all products',
                url: process.env.URL_API + 'products'
            }
        }
    }
    return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({error: error})
    }
};

exports.getOneProducts = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM products WHERE productId = ?;';
        const result = await mysql.execute(query, [req.params.productId]);
        if (result.length == 0) {
            return res.status(404).send({
                message: 'No product found with this ID'
            })
        }
        const response = {
            produto: {
                productId: result[0].productId,
                name: result[0].name,
                price: result[0].price,
                productImage: result[0].productImage,
                request: {
                    tipo: 'GET',
                    descicao: 'Returns all products',
                    url: process.env.URL_API + 'products'
                }
            }
        }
        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.updateProducts = async (req, res, next ) => {
    try {
        const query = `UPDATE products
        SET name = ?,
            price = ?
        WHERE productId = ?`
        await mysql.execute(query, [ req.body.name, req.body.price, req.params.productId ])
        const response = {
            mensagem: 'Product updated successfully !!',
            productsUpdated: {
                name: req.body.name,
                price: req.body.price,
                productId: req.params.productId,
                request: {
                    tipo: 'GET',
                    descicao: 'Returns the details of a specific product',
                    url: process.env.URL_API + 'products/' + req.body.productId
                }
            }
        }
        return res.status(202).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
}

exports.deleteProducts = async (req, res, next ) => {
    try {
        const query = 'DELETE FROM products WHERE productId = ?;'
        await mysql.execute(query, [
            req.params.productId
        ]);
        const response = {
            mensagem: 'Product successfully removed',
            request: {
                tipo: 'POST',
                descricao: 'Insert a product',
                url: process.env.URL_API + 'products',
                body: {
                    name: 'String',
                    price: 'Number'
                }
            }
        }
    return res.status(202).send(response);
    } catch (error) {
        return res.status(500).send({error: error})
    }
}

exports.getImages = async (req, res, next) => {
    try {
        const query  = "SELECT * FROM productImages WHERE productId = ?;"
        const result = await mysql.execute(query, [req.params.productId])
        const response = {
            length: result.length,
            images: result.map(img => {
                return {
                    productId: parseInt(req.params.productId),
                    imageId: img.imageId,
                    path: process.env.URL_API + img.path
                }
            })
        }
        return res.status(200).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.postImagem = async (req, res, next ) => {
    try {
        const query = 'INSERT INTO productImages (productId, path) VALUES (?,?)';
        const result = await mysql.execute(query, [
            req.params.productId,
            req.file.path
        ]);

        const response = {
            message: 'Image inserted successfully',
            createdImage: {
                productId: parseInt(req.params.productId),
                imageId: result.insertId,
                path: req.file.path,
                request: {
                    type: 'GET',
                    description: 'Return all images',
                    url: process.env.URL_API + 'produtos/' + req.params.productId + '/images'
                }
            }
        }
        return res.status(201).send(response);
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};
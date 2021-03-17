const mysql = require('../mysql');

exports.getProducts = async (req, res, next) => {
    try{
        const results = await mysql.execute('SELECT * FROM tbl_menu;');

        if (results.length < 1) {
            return res.status(204).send({ message: 'No Products registerd' })
        }else{
            const response = {
                Products: results.map(prods => {
                    return {
                        cd_prod: prods.cd_prod,
                        img_prod: process.env.URL_API + prods.img_prod,
                        nm_prod: prods.nm_prod,
                        price_prod: parseFloat(prods.price_prod),
                        qntd_prod: prods.qntd_prod,
                        size: prods.size,
                        bonusDesc: prods.bonusDesc,
                        cd_cat: prods.cd_cat,
                        date_prod: prods.date_prod,
                        popular: prods.popular

            }
        })
    }
            return res.status(200).send(response)
            }
    }catch (error){
        return res.status(500).send({error: error})
    }
}

//  Get all products with same Category
exports.getProductsByCaterory = async (req, res, next) => {
    try{
        const query = 'SELECT * FROM tbl_menu where cd_cat = ?';
        var results = await mysql.execute(query, [req.params.cd_cat]);

        if (results.length < 1) {
            return res.status(204).send({ message: 'Nothing products with this category' })
        }else{
            const response = {
                Products: results.map(prods => {
                    return {
                        cd_prod: prods.cd_prod,
                        img_prod: process.env.URL_API + prods.img_prod,
                        nm_prod: prods.nm_prod,
                        price_prod: parseFloat(prods.price_prod),
                        qntd_prod: prods.qntd_prod,
                        size: prods.size,
                        bonusDesc: prods.bonusDesc,
                        cd_cat: prods.cd_cat,
                        date_prod: prods.date_prod,
                        popular: prods.popular
                    }
                })
            }
            return res.status(200).send(response)
        }

    }catch (error){
        return res.status(500).send({error: error})
    }
}

//  Get all products with same Category
exports.getProductsByPopular = async (req, res, next) => {
    try{
        const results = await mysql.execute('SELECT * FROM tbl_menu WHERE popular = 1;');

        if (results.length == 0) {
            return res.status(204).send({ message: 'No Products popular' })
        }else{
            const response ={ 
            PopularProducts: results.map(prods => {
                    return {
                        cd_prod: prods.cd_prod,
                        img_prod: process.env.URL_API + prods.img_prod,
                        nm_prod: prods.nm_prod,
                        price_prod: parseFloat(prods.price_prod),
                        qntd_prod: prods.qntd_prod,
                        size: prods.size,
                        bonusDesc: prods.bonusDesc,
                        cd_cat: prods.cd_cat,
                        date_prod: prods.date_prod,
                        popular: prods.popular
                }
        })
        }
        return res.status(200).send(response);
        }

    }catch (error){
        return res.status(500).send({error: error})
    }
}

//  Insert new product
exports.postProducts = async (req, res, next ) => {
    try {
    console.log(req.file);
    let data = new Date();
    var dataFormat = data.toISOString().substring(0, 10);
    const query = 'INSERT INTO tbl_menu(img_prod, nm_prod, price_prod, qntd_prod, size, bonusDesc, cd_cat, date_prod, popular) VALUES (?,?,?,?,?,?,?,?,?)'
    const result = await mysql.execute(query, [
        req.file.path,
        req.body.nm_prod,
        req.body.price_prod,
        req.body.qntd_prod,
        req.body.size,
        req.body.bonusDesc,
        req.body.cd_cat,
        dataFormat,
        req.body.popular
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

//  Get just one Product
exports.getOneProducts = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM tbl_menu WHERE cd_prod = ?;';
        const result = await mysql.execute(query, [req.params.cd_prod]);
        if (result.length == 0) {
            return res.status(404).send({
                message: 'No product found with this ID'
            })
        }
        return res.status(200).send({
            cd_prod: result[0].cd_prod,
            img_prod: process.env.URL_API + result[0].img_prod,
            nm_prod: result[0].nm_prod,
            price_prod: parseFloat(result[0].price_prod),
            qntd_prod: result[0].qntd_prod,
            size: result[0].size,
            cd_cat: result[0].cd_cat,
            date_prod: result[0].date_prod,
            popular: result[0].popular
        });
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.updateProducts = async (req, res, next ) => {
    let data = new Date();
    var dataFormat = data.toISOString().substring(0, 10);
    try {
        const query = `UPDATE tbl_menu
        SET nm_prod = ?,
            price_prod = ?,
            qntd_prod = ?,
            size = ?,
            bonusDesc =?,
            cd_cat = ?,
            date_prod = ?,
            popular = ?
                WHERE cd_prod = ?`
        await mysql.execute(query, [ req.body.nm_prod, req.body.price_prod, 
            req.body.qntd_prod, req.body.size, req.body.bonusDesc, req.body.cd_cat, dataFormat, req.body.popular,req.params.cd_prod ])
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
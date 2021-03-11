const mysql = require('../mysql')


exports.getCategory = async (req, res, next ) => {
    try {
    const results = await mysql.execute('SELECT * FROM tbl_category;')
    if (results.length < 1) {
        return res.status(204).send({ message: 'No Category registerd' })
    }else{
        return res.status(200).send(results.map(cat => {
            return {
                cd_cat: cat.cd_cat,
                nm_cat: cat.nm_cat
            }
        }))
    }
    
    } catch (error) {
        return res.status(500).send({error: error})
    }
};

exports.postCategory = async (req, res, next ) => {
    try {
    const query = 'INSERT INTO tbl_category(nm_cat) VALUES (?)'
    const result = await mysql.execute(query, [ req.params.nm_cat ])
    return res.status(201).send({
        cd_cat: result.insertId,
        nm_cat: req.params.nm_cat
    });
    } catch (error) {
        return res.status(500).send({error: error})
    }
};

exports.updateCategory = async (req, res, next) => {
    try {
        const query = `UPDATE tbl_category set nm_cat = ? WHERE cd_cat = ?`
        await mysql.execute(query, [req.params.nm_cat, req.params.cd_cat])
        return res.status(202).send({
            cd_cat: parseInt(req.params.cd_cat),
            nm_cat: req.params.nm_cat
        });
    } catch (error) {
        return res.status(500).send({ error: error });        
    }
};
const mysql = require('../mysql');

exports.getMobileVersion = async (req, res, next) => {
    try {
        const query = `select * from tbl_versionMobile;`;
        var results = await mysql.execute(query, [req.params.email]);

        if (results.length < 1) {
            return res.status(401).send({ message: 'No version found'})
        }else{
            return res.status(200).send({
                versionCode: results[0].versionCode,
                versionName: results[0].versionName
            });
        }

    } catch (error) {
        return res.status(500).send({ message: 'Error: ' + error });
    }
};
const mysql = require('../mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.RegisterUsers = async (req, res, next) => {
    try {
        var query = `SELECT * FROM tbl_account WHERE email = ?`;
        var result = await mysql.execute(query, [req.body.email]);

        if (result.length > 0) {
            return res.status(409).send({ message: 'User already registered' })
        }

        const hash = await bcrypt.hashSync(req.body.password, 12);

        query = 'INSERT INTO tbl_account (email, nm_user, rg_user, password) VALUES (?,?,?,?)';
        const results = await mysql.execute(query, [req.body.email, req.body.nm_user, req.body.rg_user, hash]);

        //console.log("Email: " + req.body.email + "\nRg: " + req.body.rg_user + "\nPassword: " + hash)
        const response = {
            message: 'User created successfully',
            createdUser: {
                userId: results.insertId,
                nm_user: req.body.nm_user,
                email: req.body.email
            }
        }
        return res.status(201).send(response);

    } catch (error) {
        return res.status(500).send({ error: error });
    }
};


exports.UserLogin = async (req, res, next) => {
    try {
        const query = `SELECT * FROM tbl_account WHERE email = ?`;
        var results = await mysql.execute(query, [req.body.email]);

        if (results.length < 1) {
            return res.status(401).send({ message: 'Authentication failed' })
        }

        if (await bcrypt.compareSync(req.body.password, results[0].password)) {
            
            return res.status(200).send({
                    id_user: results[0].id_user,
                    email: results[0].email,
                    phone_user: results[0].phone_user,
                    rg_user: results[0].rg_user,
                    password: results[0].password

                }
            );
        }
        return res.status(401).send({ message: 'Authentication failed' })
    } catch (error) {
        return res.status(500).send({ message: 'Authentication failed ' + error });
    }
};

exports.InfoUser = async (req, res, next) => {
    try {
        const query = `SELECT * FROM tbl_account WHERE email = ?`;
        var results = await mysql.execute(query, [req.params.email]);

        if (results.length < 1) {
            return res.status(401).send({ message: 'No user with this email: ' + req.params.email })
        }else{
            return res.status(200).send({
                message: 'Successfully result',
                response: {
                    id_user: results[0].id_user,
                    email: results[0].email,
                    phone_user: results[0].phone_user,
                    rg_user: results[0].rg_user,
                    password: results[0].password
                }
            });
        }

    } catch (error) {
        return res.status(500).send({ message: 'Error: ' + error });
    }
};
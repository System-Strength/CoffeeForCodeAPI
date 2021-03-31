const { text } = require('body-parser');
const mysql = require('../mysql');

exports.getOrders = async (req, res, next) => {
    try {
        const query = `SELECT * FROM tbl_orders where email_user = ?`
        const result = await mysql.execute(query, [req.params.email_user] );
        if(result.length <= 0){
            return res.status(410).send({ warning: "this user don't have any order" });            
        }else{
            const response = {
                length: result.length,
                orders: result.map(order => {
                    return {
                        cd_order: parseInt(order.cd_order),
                        email_user: order.email_user,
                        zipcode: order.zipcode,
                        address_user: order.address_user,
                        complement: order.complement,
                        cd_prods: order.cd_prods,
                        PayFormat_user: order.PayFormat_user,
                        status: order.status,
                        held_in: order.held_in,
                        delivery_time: order.delivery_time
                    }
                })
            }
            return res.status(200).send(response);
        }        
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.postOrder = async (req, res, next) => {
    try {
        //  Get Shopping cart Products Code
        let json;
        let myArrayCds = [];
        let myArrayQtd = [];
        armaCds = [];
        armaQtd = [];
        const query = `SELECT * FROM tbl_shoppingcart where email_user = ?`
        const result = await mysql.execute(query, [ req.params.email_user ] );
        if(result.length <= 0){
            return res.status(410).send({ warning: "This user don't have any order" });            
        }else{
                const orders = result.map(shoppingcart => {
                    return {
                        id_user: parseInt(shoppingcart.id_user),
                        email_user: shoppingcart.email_user,
                        cd_prod: shoppingcart.cd_prod,
                        qt_prod: shoppingcart.qt_prod
                    }
                })
            json = JSON.parse(JSON.stringify(orders))
            for (let i = 0; i < json.length; i++) {
                myArrayCds.push(json[i].cd_prod);
                //  Set Qtd in array
                myArrayQtd.push(json[i].qt_prod);
            }
            let myStringCds = myArrayCds.toString();
            let myStringQtd = myArrayQtd.toString();

            let newArrayCds = myStringCds.trim();
            let newArrayQtd = myStringQtd.trim();
            //console.log(newArrayCds);
            let selectQtd = newArrayQtd.split(",")
            let selectCDS = newArrayCds.split(",")
            //console.log(a[0]);


            for (let i = 0; i < selectQtd.length; i++) {
                armaQtd.push(selectQtd[i]);
                armaCds.push(selectCDS[i]);
                const querypt = `SELECT * FROM tbl_menu where cd_prod = ?`
                const resultpt = await mysql.execute(querypt, [ armaCds ] );
                let qrdAtt =  resultpt[0].qntd_prod;
                if(qrdAtt <= 0 || armaQtd > qrdAtt){
                    return res.status(409).send({ error: "Out of stock" });
                }else{
                    newValue = qrdAtt - armaQtd;
                    await mysql.execute('update  tbl_menu set qntd_prod = '+ newValue +' where cd_prod = ' + armaCds);
                    //console.log('update  tbl_menu set qntd_prod = '+ newValue +' where cd_prod = ' + armaCds);
                    armaQtd.pop(i)
                    armaCds.pop(i)
                    
                }
            }
        const QueryRemoveCart = `delete from tbl_shoppingcart where email_user = ?`
        await mysql.execute(QueryRemoveCart, [ req.params.email_user ])
        var date = new Date()
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        var formatterDay;	
        if (day < 10) {
        formatterDay = '0'+ day;
        } else {
        formatterDay = day;
        }
		
        var formatterMonth;	
        if (month < 10) {
            formatterMonth = '0'+ month;
        } else {
        formatterMonth = month;
        }

        var held_in = formatterDay +'/'+ formatterMonth +'/'+ year;

        const queryOrder  = `insert into tbl_orders (email_user, zipcode, address_user, complement, cd_prods, PayFormat_user, status, held_in)
        values (?, ?, ?, ?, ?, ?, ?, ?);`
        const resultOrder = await mysql.execute(queryOrder, [req.params.email_user, req.params.zipcode, req.params.address_user, req.params.complement,
            newArrayCds, req.params.PayFormat_user, req.params.status, held_in]);
            const response = {
                cd_order: resultOrder.insertId,
                email_user: req.params.email_user,
                status: req.params.status,
                held_in: held_in
        }
        
        console.log("New order in: " + held_in)
        return res.status(201).send(response);

        }          
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.patchOrderStatus = async (req, res, next)=> {
    console.log("Chegou aqui")
    try {
        const query = 'SELECT * FROM tbl_orders WHERE cd_order = ?;';
        const result = await mysql.execute(query, [req.params.cd_order]);

        if (result.length == 0) {
            return res.status(304).send({
                message: 'Order not found'
            })
        }else{
            const query = `UPDATE tbl_orders
        SET status = ?
                WHERE cd_order = ?`
        await mysql.execute(query, [ req.params.status, parseInt(req.params.cd_order) ])
        const response = {
            cd_order: req.params.cd_order,
            email_user: result[0].email_user,
            held_in: result[0].held_in,
            status: req.params.status,
        }
        return res.status(202).send(response);
        }
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

exports.getOrderByCd = async (req, res, next) => {
    try {
        const query = `SELECT * FROM tbl_orders where cd_order = ?`
        const result = await mysql.execute(query, [req.params.cd_order] );
        if(result.length <= 0){
            return res.status(410).send({ warning: "this user don't have this order" });            
        }else{
            const response ={
                cd_order: parseInt(result[0].cd_order),
                        email_user: result[0].email_user,
                        zipcode: result[0].zipcode,
                        address_user: result[0].address_user,
                        complement: result[0].complement,
                        cd_prods: result[0].cd_prods,
                        PayFormat_user: result[0].PayFormat_user,
                        status: result[0].status,
                        held_in: result[0].held_in
            }
            return res.status(200).send(response);
    } 

    }catch (error) {
        return res.status(500).send({ error: error });
    }
};
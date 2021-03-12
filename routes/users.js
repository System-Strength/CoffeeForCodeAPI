const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users-controller')


//  Register User
router.post('/register', UsersController.RegisterUsers);

//  Login User
router.get('/login/:email/:password', UsersController.UserLogin);

router.patch('/updateaddress/:id_user', UsersController.updateAddress)

//  Get Informatio nof user
router.get('/info/:email', UsersController.InfoUser);

module.exports = router;
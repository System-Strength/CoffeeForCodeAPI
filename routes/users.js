const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users-controller')


//  Register User
router.post('/register', UsersController.RegisterUsers);

//  Login User
router.post('/login', UsersController.UserLogin);

//  Get Informatio nof user
router.get('/info/:email', UsersController.InfoUser);

module.exports = router;
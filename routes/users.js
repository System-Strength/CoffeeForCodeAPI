const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users-controller')


//  Register User
router.post('/register', UsersController.RegisterUsers);

router.get('/login/:email&:password', UsersController.UserLogin);

module.exports = router;
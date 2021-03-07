const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users-controller')


//  Register User
router.post('/', UsersController.RegisterUsers);

router.post('/login', UsersController.UserLogin);

module.exports = router;
const express = require('express');
const router = express.Router();
const MobileController = require('../controllers/mobile-controller')

router.get('/version', MobileController.getMobileVersion);

module.exports = router;
const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const ImageController = require('../controllers/images-controller');

//  Exclui uma imagem
router.delete('/:imageId', login.required, ImageController.deleteImage);


module.exports = router;
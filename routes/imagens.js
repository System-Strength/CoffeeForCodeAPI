const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const ImagensController = require('../controllers/imagens-controller');

//  Exclui uma imagem
router.delete('/delete', login.obrigatorio, 
                                ImagensController.deleteImagem);


module.exports = router;
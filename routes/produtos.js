const express = require('express');
const router = express.Router();
const multer = require('multer');
const login = require('../middleware/login');
const ProdutosController = require('../controllers/produtos-controller');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    filename: function( req, file, cb ){
        let data = new Date().toISOString().replace(/:/g, '-');
        cb(null,file.originalname );
}
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

// Retorna todos os produtos
router.get('/', ProdutosController.getProdutos);

// Insere um produto
router.post('/', login.obrigatorio, 
                        upload.single('imagem_produto'),
                            ProdutosController.postProduto );

//  Images
router.post('/:id_produto/imagem', login.obrigatorio, 
                                        upload.single('imagem_produto'),
                                            ProdutosController.postImagem)

//  Images 
router.get('/:id_produto/imagens', ProdutosController.getImagens)

// Retona os dados de 1 produto
router.get('/:id_produto', 
                            ProdutosController.getUmProduto);

//  Altera um produto
router.patch('/', login.obrigatorio, 
                            ProdutosController.patchProduto);

//  Exclui um produto
router.delete('/', login.obrigatorio, 
                            ProdutosController.deleteProduto);


module.exports = router;
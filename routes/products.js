const express = require('express');
const router = express.Router();
const multer = require('multer');
const login = require('../middleware/login');
const ProductsController = require('../controllers/products-controller');

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
router.get('/', ProductsController.getProducts);

// Retorna todos os produtos pela categoria
router.get('/category/:cd_cat', ProductsController.getProductsByCaterory);

// Retorna todos os produtos pela populariedade
router.get('/popular', ProductsController.getProductsByPopular);

// Insere um produto
router.post('/',upload.single('img_prod'),
                            ProductsController.postProducts );

// Retona os dados de 1 produto
router.get('/:cd_prod', 
                            ProductsController.getOneProducts);

//  Altera um produto
router.patch('/:cd_prod', ProductsController.updateProducts);

//  Exclui um produto
router.delete('/:cd_prod', login.required, 
                            ProductsController.deleteProducts);

                            
//  Images
router.post('/:productId/image', login.required, 
                                    upload.single('productImage'),
                                        ProductsController.postImagem)

//  Images 
router.get('/:productId/images', ProductsController.getImages)


module.exports = router;
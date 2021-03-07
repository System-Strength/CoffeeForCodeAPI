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

// Insere um produto
router.post('/', login.required, 
                        upload.single('productImage'),
                            ProductsController.postProducts );

// Retona os dados de 1 produto
router.get('/:productId', 
                            ProductsController.getOneProducts);

//  Altera um produto
router.patch('/:productId', login.required, 
                                ProductsController.updateProducts);

//  Exclui um produto
router.delete('/:productId', login.required, 
                            ProductsController.deleteProducts);

                            
//  Images
router.post('/:productId/image', login.required, 
                                    upload.single('productImage'),
                                        ProductsController.postImagem)

//  Images 
router.get('/:productId/images', ProductsController.getImages)


module.exports = router;
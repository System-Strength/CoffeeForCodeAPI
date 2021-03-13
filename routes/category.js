const express = require('express');
const router = express.Router();
const multer = require('multer');
const CategoryController = require('../controllers/category-controller');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/category');
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


//  Get all category
router.get('/', CategoryController.getCategory)

//  Insert new category
router.post('/insert/:nm_cat', upload.single('img_cat'),
                                    CategoryController.postCategory)

//  Update category
router.patch('/update/:nm_cat/:cd_cat', CategoryController.updateCategory)


module.exports = router;
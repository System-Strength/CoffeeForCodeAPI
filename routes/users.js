const express = require('express');
const router = express.Router();
const multer = require('multer');
const UsersController = require('../controllers/users-controller')


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/user');
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


//  Register User
router.post('/register', UsersController.RegisterUsers);

//  Login User
router.get('/login/:email/:password', UsersController.UserLogin);

router.patch('/updateaddress/:id_user', UsersController.updateAddress)

router.patch('/updateimg/:id_user', UsersController.UpdateImg)

//  Get Informatio nof user
router.get('/info/:email', UsersController.InfoUser);

router.patch('/update/:id_user', UsersController.updateUser);

module.exports = router;
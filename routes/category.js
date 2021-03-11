const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/category-controller');

//  Get all category
router.get('/', CategoryController.getCategory)

//  Insert new category
router.post('/insert/:nm_cat', CategoryController.postCategory)

//  Update category
router.patch('/update/:nm_cat/:cd_cat', CategoryController.updateCategory)


module.exports = router;
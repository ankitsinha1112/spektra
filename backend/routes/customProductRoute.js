const express = require('express');
const { deleteProduct, createProduct, getAdminProducts } = require('../controllers/customProductController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

router.route('/admin/customproducts').get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);
router.route('/customproduct/new').post(createProduct);
// router.route('/customproduct/new').post(isAuthenticatedUser, authorizeRoles("user"), createProduct);

router.route('/admin/customproduct/:id')
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

module.exports = router;
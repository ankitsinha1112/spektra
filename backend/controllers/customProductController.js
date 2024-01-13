const CustomProduct = require('../models/customProductModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
// const SearchFeatures = require('../utils/searchFeatures');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require('cloudinary');

// Get All Products


// exports.getAllProducts = asyncErrorHandler(async (req, res, next) => {

//     const resultPerPage = 12;
//     const productsCount = await Product.countDocuments();
//     // console.log(req.query);

//     const searchFeature = new SearchFeatures(Product.find(), req.query)
//         .search()
//         .filter();

//     let products = await searchFeature.query;
//     let filteredProductsCount = products.length;

//     searchFeature.pagination(resultPerPage);

//     products = await searchFeature.query.clone();

//     res.status(200).json({
//         success: true,
//         products,
//         productsCount,
//         resultPerPage,
//         filteredProductsCount,
//     });
// });

// Get All Products ---Product Sliders
// exports.getProducts = asyncErrorHandler(async (req, res, next) => {
//     const products = await Product.find();

//     res.status(200).json({
//         success: true,
//         products,
//     });
// });

// Get Product Details
// exports.getProductDetails = asyncErrorHandler(async (req, res, next) => {

//     const product = await Product.findById(req.params.id);

//     if (!product) {
//         return next(new ErrorHandler("Product Not Found", 404));
//     }

//     res.status(200).json({
//         success: true,
//         product,
//     });
// });

// Get All Products ---ADMIN
exports.getAdminProducts = asyncErrorHandler(async (req, res, next) => {
    const products = await CustomProduct.find();

    res.status(200).json({
        success: true,
        products,
    });
});

// Create Product ---ADMIN
exports.createProduct = asyncErrorHandler(async (req, res, next) => {

    // let images = [];
    
    // if (typeof req.body.images === "string") {
    //     images.push(req.body.images);
    // } else {
    //     images = req.body.images;
    // }

    // const imagesLink = [];

    // for (let i = 0; i < images.length; i++) {
    //     const result = await cloudinary.v2.uploader.upload(images[i], {
    //         folder: "customproducts",
    //     });

    //     imagesLink.push({
    //         public_id: result.public_id,
    //         url: result.secure_url,
    //     });
    // }
    const imagesLink = [];
    imagesLink.push({
        public_id: '2',
        url: req.body.images,
    });
    req.body.images = imagesLink;
    req.body.user = "65a1cbdea683c9f2c7bec635";
    // req.body.user = req.user.id;

    const product = await CustomProduct.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
});

// Update Product ---ADMIN
// exports.updateProduct = asyncErrorHandler(async (req, res, next) => {

//     let product = await Product.findById(req.params.id);

//     if (!product) {
//         return next(new ErrorHandler("Product Not Found", 404));
//     }

//     if (req.body.images !== undefined) {
//         let images = [];
//         if (typeof req.body.images === "string") {
//             images.push(req.body.images);
//         } else {
//             images = req.body.images;
//         }
//         for (let i = 0; i < product.images.length; i++) {
//             await cloudinary.v2.uploader.destroy(product.images[i].public_id);
//         }

//         const imagesLink = [];

//         for (let i = 0; i < images.length; i++) {
//             const result = await cloudinary.v2.uploader.upload(images[i], {
//                 folder: "products",
//             });

//             imagesLink.push({
//                 public_id: result.public_id,
//                 url: result.secure_url,
//             });
//         }
//         req.body.images = imagesLink;
//     }

//     if (req.body.logo.length > 0) {
//         await cloudinary.v2.uploader.destroy(product.brand.logo.public_id);
//         const result = await cloudinary.v2.uploader.upload(req.body.logo, {
//             folder: "brands",
//         });
//         const brandLogo = {
//             public_id: result.public_id,
//             url: result.secure_url,
//         };

//         req.body.brand = {
//             name: req.body.brandname,
//             logo: brandLogo
//         }
//     }

//     let specs = [];
//     req.body.specifications.forEach((s) => {
//         specs.push(JSON.parse(s))
//     });
//     req.body.specifications = specs;
//     req.body.user = req.user.id;

//     product = await Product.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true,
//         useFindAndModify: false,
//     });

//     res.status(201).json({
//         success: true,
//         product
//     });
// });

// Delete Product ---ADMIN
exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {

    const product = await CustomProduct.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await product.remove();

    res.status(201).json({
        success: true
    });
});

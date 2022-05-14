var express = require('express');
const { append } = require('express/lib/response');
var router = express.Router();

// Database Schema for Product 
const Product = require('../models/Product');

//Main routes
router.post('/addProduct', (req, res, next) => {
  var newProduct = new Product({
    title: req.body.title,
    price: req.body.price,
    category: req.body.category,
    stock: 20
  });

  newProduct.save()
    .then(result => {
      console.log(result);
      res.json(result);
    })
    .catch(err => {
      console.log(err.data);
      res.json(err.data);
    });
})

router.get('/all', (req, res, next) => {
  Product.find()
    .then(result => {
      console.log(result.data)
      res.json(result.data)
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
})

module.exports = router;

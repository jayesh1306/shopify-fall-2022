var express = require('express');
var router = express.Router();

// Database Schema for Product 
const Product = require('../models/Product');

//Main routes
router.post('/addProduct', (req, res, next) => {

  var { title, price, category, stock } = req.body;

  if (!title && !price && !category && !stock) {
    return res.json({ message: "All fields are required" });
  }

  var newProduct = new Product({
    title,
    price,
    category,
    stock
  });

  // Storing product in database
  newProduct.save()
    .then(result => {
      console.log(result);
      res.json({ message: "Successfully Added Product", result });

    })
    .catch(err => {
      console.log(err.data);
      res.json(err);
    });
})

// Edit Inventory Product
router.put('/edit/:productId', (req, res, next) => {
  Product.updateOne({ _id: req.params.productId }, req.body, { new: true })
    .then(result => {
      if (result.acknowledged) { //  1 == Edited, 0 == Not Edited
        res.json({ message: "Updated Successfully" });
      }
    })
    .catch(err => {
      console.log("Cannot updated Product : Something went wrong");
      res.json(err.data)
    });

  res.json({ message: "Edited", id: req.params.productId });
});

// Test api to get all products
router.get('/all', (req, res, next) => {
  Product.find()
    .then(result => {
      console.log(result)
      res.json(result)
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

module.exports = router;

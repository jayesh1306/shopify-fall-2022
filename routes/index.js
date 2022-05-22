var express = require('express');
var router = express.Router();

// Models
var Products = require('../models/Product');

// Get all Inventory Products
router.get('/getAllProducts', (req, res, next) => {
  console.log("Products");

  Products.find()
    .then(products => {
      if (products.length == 0) {
        res.json({ message: "No Products found in Inventory" });
      } else {
        console.log(products);
        res.json(products);
      }
    })
    .catch(err => {
      console.log("Error : ", err);
      res.json(err);
    });

})

// Add Product in Inventory
router.post('/addProduct', (req, res, next) => {
  console.log("Add Product");

  var { title, price, category, stock } = req.body;

  var product = new Products({ title, price, category, stock });

  // Conditions for Empty Values
  if (title && price && category && stock) {
    return res.json({ message: "All values are required" });
  }

  product
    .save()
    .then(result => {
      if (result) {
        console.log(result);
        return res.json(result)
      } else {
        return res.json({ message: "Cannot save Product. Something went Wrong" });
      }
    })
    .catch(err => {
      console.log(err);
      return res.json(err)
    });



  console.log(title, price, category, stock);
});


router.delete('/delete/:productId', (req, res, next) => {
  console.log(req.params.productId);

  if (req.params.productId) {
    // Delete Product
    Products.findOneAndDelete({ _id: req.params.productId })
      .then(result => {
        console.log(result, "NULL")

        if (result == null) {
          return res.json({ message: "No Product to delete" });
        }
        return res.json({ message: "Deleted Product", result });
      })
      .catch(err => {
        console.log(err);
        return res.json(err);
      });
  }
});


module.exports = router;

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');


// Connection with DB
mongoose.connect("mongodb://localhost:27017/shopify-task", (err, result) => {
  if (err) { console.log(err) }
  else console.log("Connected DB");
})

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/app', indexRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Listening on port 3000");
});

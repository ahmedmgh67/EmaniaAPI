//hospital management
var mongoose = require('mongoose');
var express = require('express'),app = express(), port = 5000;
var bodyParser = require('body-parser');
var Schema = mongoose.Schema;
//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Connect to MongoDB
mongoose.Promise = global.Promise;
// TODO:Change for container 
mongoose
  .connect(
    'mongodb://mongo-emania:27017/emania',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
//starting the app
app.listen(
  port, () => console.log(
    'Emania RESTful API server started on: ' + port
  )
);
//schema
var ProductSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  price:{
    type: String,
    required: false
  },
  images:{
    type: [{type:String}],
    required: true
  },
  desc:{
    type: String,
    required: true
  },
  category:{
    type: String,
    required: true
  },
  payment:{
    type: String,
    required: true
  },
})
mongoose.model("products", ProductSchema);
var Product = mongoose.model("products");
listProducts = function(req, res){
  Product.find({}, function(err, products) {
    if (err)
      res.send(err);
    res.json(products);
  });
}
createProduct= function(req, res) {
  var newProduct = new Product(req.body);
  newProduct.save(function(err, product) {
    if (err)
      res.send(err);
    res.json(product);
  });
};

updateProduct = function(req, res) {
  Product.findOneAndUpdate({_id: req.params.product}, req.body, {new: true}, function(err, product) {
    if (err)
      res.send(err);
    res.json(product);
  });
};

deleteProduct = function(req, res) {
  Product.remove({
    _id: req.params.product
  }, function(err, product) {
    if (err)
      res.send(err);
    res.json({ message: 'Product successfully deleted' });
  });
};
// handling the routes
app.route('/api/products')
  .get(listProducts)
app.route('/api/products')
  .post(createProduct);
app.route('/api/products/:product')
  .put(updateProduct)
  .delete(deleteProduct);


//orders
var OrderSchema = new Schema({
  user:{
    type: String,
    required: true
  },
  address:{
    type: String,
    required: false
  },
  phone:{
    type: String,
    required: true
  },
  price:{
    type: String,
    required: true
  },
  products:[{
    type: String
  }],
})
mongoose.model("orders", OrderSchema);
var Order = mongoose.model("orders");
listOrders = function(req, res){
  Order.find({}, function(err, orders) {
    if (err)
      res.send(err);
    res.json(orders);
  });
}
createOrder= function(req, res) {
  var newOrder = new Order(req.body);
  newProduct.save(function(err, order) {
    if (err)
      res.send(err);
    res.json(order);
  });
};

updateOrder = function(req, res) {
  Order.findOneAndUpdate({_id: req.params.order}, req.body, {new: true}, function(err, order) {
    if (err)
      res.send(err);
    res.json(order);
  });
};

deleteOrder = function(req, res) {
  Order.remove({
    _id: req.params.order
  }, function(err, order) {
    if (err)
      res.send(err);
    res.json({ message: 'Order successfully deleted' });
  });
};
// handling the routes
app.route('/api/orders')
  .get(listProducts)
app.route('/api/orders')
  .post(createProduct);
app.route('/api/orders/:order')
  .put(updateProduct)
  .delete(deleteProduct);

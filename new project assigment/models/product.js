const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  // Add any other product fields as needed
});

module.exports = mongoose.model('Product', productSchema);

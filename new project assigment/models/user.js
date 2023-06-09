const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  // Add any other user fields as needed
});






// Define the verifyPassword method
userSchema.methods.verifyPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

// module.exports = mongoose.model('User', userSchema);


module.exports = mongoose.model('User', userSchema);

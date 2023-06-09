// const express = require('express');
// const router = express.Router();

// router.get('/dashboard', (req, res) => {
//   // Render the user's dashboard
//   res.render('dashboard');
// });

// module.exports = router;
// const express = require('express');
// const router = express.Router();
// const User = require('../models/user'); // Make sure the path to the User model is correct

// // Your other routes and code...

// module.exports = router;


const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Define your routes below

router.post('/signup', async (req, res) => {
  // Extract the required information from the request body
  const { email, businessName, password, confirmPassword } = req.body;

  // Validation: Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match');
  }

  try {
    // Validation: Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User with this email already exists');
    }

    // Create a new user
    const newUser = new User({
      email,
      businessName,
      password,
    });

    // Save the user to the database
    await newUser.save();

    // Redirect or render a success page
    res.redirect('/user/dashboard');
  } catch (error) {
    console.error('Error occurred during signup:', error);
    res.status(500).send('An error occurred during signup');
  }
});

router.post('/login', async (req, res) => {
  // Extract the email and password from the request body
  const { email, password } = req.body;

  try {
    // Find the user in the database based on the email
    const user = await User.findOne({ email });

    // Check if the user exists and if the password is correct
    if (!user || !user.verifyPassword(password)) {
      return res.status(401).send('Invalid email or password');
    }

    // Set the user session or perform any other login-related actions
    req.session.userId = user._id;

    // Redirect to the user's dashboard or any other desired page
    res.redirect('/user/dashboard');
  } catch (error) {
    console.error('Error occurred during login:', error);
    res.status(500).send('An error occurred during login');
  }
});

// Export the router
module.exports = router;

const express = require('express');
const router = express.Router();

const Product = require('../models/product');

const User = require('../models/user');

router.get('/', (req, res) => {
  res.render('signup');
});

router.post('/signup', async (req, res) => {
  console.log('Signup request received:', req.body);

  const { email, businessName, password, confirmPassword } = req.body;

  // Validation: Check if passwords match
  if (password !== confirmPassword) {
    console.log('Passwords do not match');
    return res.status(400).send('Passwords do not match');
  }

  try {
    // Validation: Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User with this email already exists');
      return res.status(400).send('User with this email already exists');
    }

    // Create a new user
    const newUser = new User({
      email,
      businessName,
      password,
    });

    console.log('New user:', newUser);

    // Save the user to the database
    await newUser.save();

    console.log('User saved to the database');

    // Redirect or render a success page
    res.redirect('/user/dashboard');
  } catch (error) {
    console.error('Error occurred during signup:', error);
    res.status(500).send('An error occurred during signup');
  }
});


router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  console.log('Login request received:', req.body);

  const { email, password } = req.body;

  try {
    // Find the user in the database based on the email
    const user = await User.findOne({ email });

    console.log('User found:', user);

    // Check if the user exists and if the password is correct
    if (!user || !user.verifyPassword(password)) {
      console.log('Invalid email or password');
      return res.status(401).send('Invalid email or password');
    }

    // Set the user session or perform any other login-related actions
    req.session.userId = user._id;

    console.log('Login successful');

    // Redirect to the user's dashboard or any other desired page
    res.redirect('/user/dashboard');
  } catch (error) {
    console.error('Error occurred during login:', error);
    res.status(500).send('An error occurred during login');
  }
});


// Dashboard route


router.get('/user/dashboard', async (req, res) => {
  try {
    // Retrieve the products from the database
    const products = await Product.find();

    // Render the dashboard view and pass the products variable
    res.render('dashboard', { products });
  } catch (error) {
    console.error('Error occurred while retrieving products:', error);
    res.status(500).send('An error occurred while retrieving products');
  }
});




router.post('/dashboard', async (req, res) => {
  try {
    // Retrieve all products from the database
    const products = await Product.find();

    // Render the dashboard view and pass the products as data
    res.render('dashboard', { products });
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).send('An error occurred');
  }
});

// User search route
router.get('/search', async (req, res) => {
  const { query } = req.query;

  try {
    // Perform a case-insensitive search for users matching the query
    const users = await User.find({ email: { $regex: query, $options: 'i' } });

    // Render the search results view and pass the users as data
    res.render('search-results', { users, query });
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).send('An error occurred');
  }
});




module.exports = router;

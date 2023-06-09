const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');

// const indexRoutes = require('./routes/index');

// Register route handlers




 const db = require('./config/mongoose');

const app = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the public directory
app.use(express.static('public'));

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/shopping', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Import routes
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');

// const user = require('./models/user');

app.use(session({
  secret: 'your-secret-key', // Replace with your own secret key
  resave: false,
  saveUninitialized: true,
}));





// Use routes
app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use('/product', productRoutes);


// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const express = require('express');
const router = express.Router();

router.get('/search', async (req, res) => {
    const searchQuery = req.query.q;
  
    try {
      // Perform the search logic using the searchQuery
      const results = await Product.find({
        $or: [
          { name: { $regex: searchQuery, $options: 'i' } },
          { category: { $regex: searchQuery, $options: 'i' } },
          { subCategory: { $regex: searchQuery, $options: 'i' } },
        ],
      });
  
      // Render the search results
      res.render('search', { searchQuery, results });
    } catch (error) {
      console.error('Error occurred during search:', error);
      res.status(500).send('An error occurred during search');
    }
  });
  

router.get('/add-to-cart/:productId', async (req, res) => {
    const productId = req.params.productId;
    const userId = req.session.userId;
  
    try {
      // Find the user based on the userId stored in the session
      const user = await User.findById(userId);
  
      // Find the product based on the productId
      const product = await Product.findById(productId);
  
      // Check if the user and product exist
      if (!user || !product) {
        return res.status(404).send('User or product not found');
      }
  
      // Add the product to the user's shopping cart
      user.cart.push(product);
  
      // Save the updated user to the database
      await user.save();
  
      // Redirect to the user's dashboard or any other desired page
      res.redirect('/user/dashboard');
    } catch (error) {
      console.error('Error occurred while adding to cart:', error);
      res.status(500).send('An error occurred while adding to cart');
    }
  });
  

module.exports = router;

const {body} = require('express-validator');
const {register} = require('../controllers/registerController');
const {login} = require('../controllers/loginController');

module.exports = app => {
  const customers = require("../controllers/customer.controller.js");


  // Create a new Customer
  app.post("/customers", customers.create);

  // Retrieve all Customers
  app.get("/customers", customers.findAll);

  // Retrieve a single Customer with customerId
  app.get("/customers/:customerId", customers.findOne);

  // Update a Customer with customerId
  app.put("/customers/:customerId", customers.update);

  // Delete a Customer with customerId
  app.delete("/customers/:customerId", customers.delete);

  // Create a new Customer
  app.delete("/customers", customers.deleteAll);
  
  app.post('/login',[
		body('email',"Invalid email address")
		.notEmpty()
		.escape()
		.trim().isEmail(),
		body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
	],login);
  
  
  app.post('/register', [
		body('name',"The name must be of minimum 3 characters length")
		.notEmpty()
		.escape()
		.trim()
		.isLength({ min: 3 }),
		body('email',"Invalid email address")
		.notEmpty()
		.escape()
		.trim().isEmail(),
		body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
	], register);
  
  
};
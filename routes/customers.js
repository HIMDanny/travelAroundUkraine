const express = require('express');
const router = express.Router();
const passport = require('passport');

const CustomerService = require('../services/customer');
const CustomerRepository = require('../repositories/customer');
const CustomerController = require('../controllers/customers');

const customerRepository = new CustomerRepository();
const customerService = new CustomerService(customerRepository);
const customerController = new CustomerController(customerService);

// @route   POST /customers
// @desc    Register customer
// @access  Public
router.post('/', customerController.create.bind(customerController));

// @route   POST /customers/login
// @desc    Login Customer / Returning JWT Token
// @access  Public
router.post('/login', customerController.login.bind(customerController));

// @route   GET /customers
// @desc    Get all customers
// @access  Private (Admin only)
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  customerController.getAll.bind(customerController),
);

// @route   GET /customers/customer
// @desc    Get current customer profile
// @access  Private
router.get(
  '/customer',
  passport.authenticate('jwt', { session: false }),
  customerController.getCurrentCustomer.bind(customerController),
);

// @route   PUT /customers/password
// @desc    Update customer password
// @access  Private
router.put(
  '/password',
  passport.authenticate('jwt', { session: false }),
  customerController.updatePassword.bind(customerController),
);

// @route   GET /customers/:id
// @desc    Get customer by ID
// @access  Private (Admin only)
router.get(
  '/:id',
  passport.authenticate('jwt-admin', { session: false }),
  customerController.getOne.bind(customerController),
);

// @route   PUT /customers/:id
// @desc    Update customer
// @access  Private (Admin only) or Customer (own profile)
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  customerController.update.bind(customerController),
);

// @route   DELETE /customers/:id
// @desc    Delete customer
// @access  Private (Admin only)
router.delete(
  '/:id',
  passport.authenticate('jwt-admin', { session: false }),
  customerController.delete.bind(customerController),
);

module.exports = router;

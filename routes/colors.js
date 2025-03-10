const express = require('express');
const router = express.Router();
const passport = require('passport'); // multer for parsing multipart form data (files)
const colorController = require('../controllers/colors');

// @route   POST /colors
// @desc    Create new color
// @access  Private (Admin only)
router.post(
  '/',
  passport.authenticate('jwt-admin', { session: false }),
  colorController.create.bind(colorController),
);

// @route   GET /colors
// @desc    Get all colors
// @access  Public
router.get('/', colorController.getAll.bind(colorController));

// @route   GET /colors/:id
// @desc    Get color by ID
// @access  Public
router.get('/:id', colorController.getOne.bind(colorController));

// @route   PUT /colors/:id
// @desc    Update existing color
// @access  Private (Admin only)
router.put(
  '/:id',
  passport.authenticate('jwt-admin', { session: false }),
  colorController.update.bind(colorController),
);

// @route   DELETE /colors/:id
// @desc    Delete existing color
// @access  Private (Admin only)
router.delete(
  '/:id',
  passport.authenticate('jwt-admin', { session: false }),
  colorController.delete.bind(colorController),
);

module.exports = router;

const BaseController = require('./baseController');
const Color = require('../models/Color');
const ValidationUtils = require('../utils/validationUtils');
const {
  ValidationError,
  NotFoundError,
  DuplicateError,
} = require('../utils/errors');

class ColorController extends BaseController {
  constructor() {
    super(Color);
  }

  // Реалізація методу create
  async create(req, res, next) {
    try {
      // Валідація обов'язкових полів
      const requiredFields = ['name', 'hexCode'];
      const validationResult = ValidationUtils.validateRequiredFields(
        req.body,
        requiredFields,
      );

      if (!validationResult.isValid) {
        throw new ValidationError(validationResult.errors);
      }

      // Валідація hex коду
      const hexCodeRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      if (!hexCodeRegex.test(req.body.hexCode)) {
        throw new ValidationError({ hexCode: 'Invalid hex color code' });
      }

      // Перевірка на існуючий колір
      const existingColor = await this.model.findOne({ name: req.body.name });
      if (existingColor) {
        throw new DuplicateError(
          `Color with name "${req.body.name}" already exists`,
          'name',
        );
      }

      const color = new this.model(req.body);
      const savedColor = await color.save();
      return res.status(201).json(savedColor);
    } catch (error) {
      next(error);
    }
  }

  // Реалізація методу getAll
  async getAll(req, res, next) {
    try {
      const colors = await this.model.find().sort({ name: 1 });
      return res.json(colors);
    } catch (error) {
      next(error);
    }
  }

  // Реалізація методу getOne
  async getOne(req, res, next) {
    try {
      const color = await this.model.findById(req.params.id);
      if (!color) {
        throw new NotFoundError(`Color with id "${req.params.id}" not found`);
      }
      return res.json(color);
    } catch (error) {
      next(error);
    }
  }

  // Реалізація методу update
  async update(req, res, next) {
    try {
      if (req.body.hexCode) {
        const hexCodeRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        if (!hexCodeRegex.test(req.body.hexCode)) {
          throw new ValidationError({ hexCode: 'Invalid hex color code' });
        }
      }

      if (req.body.name) {
        const existingColor = await this.model.findOne({
          name: req.body.name,
          _id: { $ne: req.params.id },
        });
        if (existingColor) {
          throw new DuplicateError(
            `Color with name "${req.body.name}" already exists`,
            'name',
          );
        }
      }

      const color = await this.model.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true },
      );

      if (!color) {
        throw new NotFoundError(`Color with id "${req.params.id}" not found`);
      }

      return res.json(color);
    } catch (error) {
      next(error);
    }
  }

  // Реалізація методу delete
  async delete(req, res, next) {
    try {
      const color = await this.model.findById(req.params.id);
      if (!color) {
        throw new NotFoundError(`Color with id "${req.params.id}" not found`);
      }

      await this.model.findByIdAndDelete(req.params.id);
      return res.json({
        message: `Color "${color.name}" successfully deleted`,
        deletedColor: color,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ColorController();

const BaseController = require('./baseController');
const Customer = require('../models/Customer');
const AuthUtils = require('../utils/authUtils');
const ValidationUtils = require('../utils/validationUtils');
const uniqueRandom = require('unique-random');
const rand = uniqueRandom(10000000, 99999999);
const {
  ValidationError,
  NotFoundError,
  DuplicateError,
  AuthenticationError,
} = require('../utils/errors');

class CustomerController extends BaseController {
  constructor() {
    super(Customer);
  }

  // Реалізація методу create
  async create(req, res, next) {
    try {
      // Валідація обов'язкових полів
      const requiredFields = [
        'email',
        'password',
        'firstName',
        'lastName',
        'login',
      ];
      const validationResult = ValidationUtils.validateRequiredFields(
        req.body,
        requiredFields,
      );

      if (!validationResult.isValid) {
        throw new ValidationError(validationResult.errors);
      }

      // Валідація email
      if (!ValidationUtils.validateEmail(req.body.email)) {
        throw new ValidationError({ email: 'Invalid email format' });
      }

      // Валідація пароля
      const passwordValidation = ValidationUtils.validatePassword(
        req.body.password,
      );
      if (!passwordValidation.isValid) {
        throw new ValidationError(passwordValidation.errors);
      }

      // Валідація login
      if (req.body.login.length < 3 || req.body.login.length > 10) {
        throw new ValidationError({
          login: 'Login must be between 3 and 10 characters',
        });
      }

      // Перевірка на існуючого користувача
      const existingCustomer = await this.model.findOne({
        $or: [{ email: req.body.email }, { login: req.body.login }],
      });

      if (existingCustomer) {
        if (existingCustomer.email === req.body.email) {
          throw new DuplicateError(
            `Email ${req.body.email} already exists`,
            'email',
          );
        }
        if (existingCustomer.login === req.body.login) {
          throw new DuplicateError(
            `Login ${req.body.login} already exists`,
            'login',
          );
        }
      }

      // Хешування пароля
      const hashedPassword = await AuthUtils.hashPassword(req.body.password);

      // Створення нового користувача
      const customerData = {
        ...req.body,
        password: hashedPassword,
        customerNo: rand(),
      };

      const customer = new this.model(customerData);
      const savedCustomer = await customer.save();
      delete savedCustomer.password;

      // Створення токена
      const payload = AuthUtils.createTokenPayload(savedCustomer);
      const token = AuthUtils.generateToken(payload);

      return res.status(201).json({
        customer: savedCustomer,
        token: `Bearer ${token}`,
      });
    } catch (error) {
      next(error);
    }
  }

  // Реалізація методу getAll
  async getAll(req, res, next) {
    try {
      const customers = await this.model
        .find()
        .select('-password')
        .sort({ firstName: 1, lastName: 1 });
      return res.json(customers);
    } catch (error) {
      next(error);
    }
  }

  // Реалізація методу getOne
  async getOne(req, res, next) {
    try {
      const customer = await this.model
        .findById(req.params.id)
        .select('-password');
      if (!customer) {
        throw new NotFoundError('Customer not found');
      }
      return res.json(customer);
    } catch (error) {
      next(error);
    }
  }

  // Реалізація методу update
  async update(req, res, next) {
    try {
      const customer = await this.model.findById(req.params.id);
      if (!customer) {
        throw new NotFoundError('Customer not found');
      }

      // Валідація email якщо він змінюється
      if (req.body.email && req.body.email !== customer.email) {
        if (!ValidationUtils.validateEmail(req.body.email)) {
          throw new ValidationError({ email: 'Invalid email format' });
        }

        const existingCustomer = await this.model.findOne({
          email: req.body.email,
        });
        if (existingCustomer) {
          throw new DuplicateError(
            `Email ${req.body.email} already exists`,
            'email',
          );
        }
      }

      // Валідація login якщо він змінюється
      if (req.body.login && req.body.login !== customer.login) {
        const existingCustomer = await this.model.findOne({
          login: req.body.login,
        });
        if (existingCustomer) {
          throw new DuplicateError(
            `Login ${req.body.login} already exists`,
            'login',
          );
        }
      }

      // Оновлення даних
      const updatedCustomer = await this.model
        .findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .select('-password');

      return res.json(updatedCustomer);
    } catch (error) {
      next(error);
    }
  }

  // Реалізація методу delete
  async delete(req, res, next) {
    try {
      const customer = await this.model.findById(req.params.id);
      if (!customer) {
        throw new NotFoundError('Customer not found');
      }

      await this.model.findByIdAndDelete(req.params.id);
      return res.json({
        message: `Customer "${customer.firstName} ${customer.lastName}" successfully deleted`,
        deletedCustomer: {
          id: customer.id,
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // Додатковий метод для логіну
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      // Валідація обов'язкових полів
      const validationResult = ValidationUtils.validateRequiredFields(
        req.body,
        ['email', 'password'],
      );
      if (!validationResult.isValid) {
        throw new ValidationError(validationResult.errors);
      }

      // Пошук користувача
      const customer = await this.model.findOne({ email });
      if (!customer) {
        throw new NotFoundError('Customer not found');
      }

      // Перевірка пароля
      const isMatch = await AuthUtils.comparePassword(
        password,
        customer.password,
      );
      if (!isMatch) {
        throw new AuthenticationError('Invalid password');
      }

      // Створення токена
      const payload = AuthUtils.createTokenPayload(customer);
      const token = AuthUtils.generateToken(payload);

      return res.json({
        success: true,
        token: `Bearer ${token}`,
        customer: {
          id: customer.id,
          email: customer.email,
          firstName: customer.firstName,
          lastName: customer.lastName,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // Додатковий метод для оновлення пароля
  async updatePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;
      const customer = await this.model.findById(req.user.id);

      if (!customer) {
        throw new NotFoundError('Customer not found');
      }

      // Перевірка поточного пароля
      const isMatch = await AuthUtils.comparePassword(
        currentPassword,
        customer.password,
      );
      if (!isMatch) {
        throw new AuthenticationError('Current password is incorrect');
      }

      // Валідація нового пароля
      const passwordValidation = ValidationUtils.validatePassword(newPassword);
      if (!passwordValidation.isValid) {
        throw new ValidationError(passwordValidation.errors);
      }

      // Хешування нового пароля
      const hashedPassword = await AuthUtils.hashPassword(newPassword);

      // Оновлення пароля
      customer.password = hashedPassword;
      await customer.save();

      return res.json({ message: 'Password updated successfully' });
    } catch (error) {
      next(error);
    }
  }

  // Додатковий метод для отримання поточного користувача
  getCurrentCustomer(req, res, next) {
    try {
      if (!req.user) {
        throw new AuthenticationError('User not authenticated');
      }
      return res.json(req.user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CustomerController();

const BaseController = require('./baseController');
const AuthUtils = require('../utils/authUtils');
const ValidationUtils = require('../utils/validationUtils');
const {
  ValidationError,
  AuthenticationError,
} = require('../core/error-handling/errors');

class CustomerController extends BaseController {
  constructor(customerService) {
    super();
    this.customerService = customerService;
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
        throw new ValidationError(
          'Required fields are missing',
          validationResult.errors,
        );
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

      const customer = await this.customerService.createCustomer(req.body);

      // Створення токена
      const payload = AuthUtils.createTokenPayload(customer);
      const token = AuthUtils.generateToken(payload);

      return res.status(201).json({
        customer: customer,
        token: `Bearer ${token}`,
      });
    } catch (error) {
      next(error);
    }
  }

  // Реалізація методу getAll
  async getAll(req, res, next) {
    try {
      const customers = await this.customerService.getAllCustomers();

      return res.json(customers);
    } catch (error) {
      next(error);
    }
  }

  // Реалізація методу getOne
  async getOne(req, res, next) {
    try {
      const customer = await this.customerService.getCustomerById(
        req.params.id,
      );

      return res.json(customer);
    } catch (error) {
      next(error);
    }
  }

  // Реалізація методу update
  async update(req, res, next) {
    try {
      const customer = await this.customerService.updateCustomer(
        req.params.id,
        req.body,
      );

      return res.json(customer);
    } catch (error) {
      next(error);
    }
  }

  // Реалізація методу delete
  async delete(req, res, next) {
    try {
      const customer = await this.customerService.deleteCustomer(req.params.id);
      return res.json({
        message: `Customer "${customer.firstName} ${customer.lastName}" successfully deleted`,
        deletedCustomer: customer,
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
        throw new ValidationError(
          'Invalid credentials',
          validationResult.errors,
        );
      }

      const loginInfo = await this.customerService.loginCustomer(
        email,
        password,
      );

      return res.json(loginInfo);
    } catch (error) {
      next(error);
    }
  }

  // Додатковий метод для оновлення пароля
  async updatePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;

      // Валідація нового пароля
      const passwordValidation = ValidationUtils.validatePassword(newPassword);
      if (!passwordValidation.isValid) {
        throw new ValidationError(
          'Invalid password',
          passwordValidation.errors,
        );
      }

      await this.customerService.updatePassword(
        req.user.id,
        currentPassword,
        newPassword,
      );

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

module.exports = CustomerController;

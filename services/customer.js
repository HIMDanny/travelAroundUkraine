const AuthUtils = require('../utils/authUtils');
const {
  ValidationError,
  NotFoundError,
  AuthenticationError,
  DuplicateError,
} = require('../core/error-handling/errors');

const uniqueRandom = require('unique-random');
const rand = uniqueRandom(10000000, 99999999);

class CustomerService {
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }

  async getAllCustomers() {
    return await this.customerRepository.findAll();
  }

  async getCustomerById(id) {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new NotFoundError('Customer not found');
    }

    return customer;
  }

  async createCustomer(customerData) {
    const { email, login } = customerData;

    // Check if customer exists
    const existingCustomer = await this.customerRepository.findByEmailOrLogin(
      email,
      login,
    );

    if (existingCustomer) {
      if (existingCustomer.email === email) {
        throw new DuplicateError(`Email ${email} already exists`);
      }
      if (existingCustomer.login === login) {
        throw new DuplicateError(`Login ${login} already exists`);
      }
    }

    // Hash password
    const hashedPassword = await AuthUtils.hashPassword(customerData.password);

    // Create customer
    const customer = await this.customerRepository.create({
      ...customerData,
      password: hashedPassword,
      customerNo: rand(),
    });

    return customer;
  }

  async loginCustomer(email, password) {
    const customer = await this.customerRepository.findByEmail(email);

    if (!customer) {
      throw new NotFoundError('Customer not found');
    }

    const isMatch = await AuthUtils.comparePassword(
      password,
      customer.password,
    );

    if (!isMatch) {
      throw new AuthenticationError('Incorrect credentials');
    }

    const payload = {
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      isAdmin: customer.isAdmin,
    };

    const token = AuthUtils.generateToken(payload);

    return {
      success: true,
      token: `Bearer ${token}`,
      customer: {
        id: customer.id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
      },
    };
  }

  async updateCustomer(id, customerData) {
    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      throw new NotFoundError('Customer not found');
    }

    const { email, login } = customerData;
    if (email && email !== customer.email) {
      const existingCustomer = await this.customerRepository.findByEmail(email);
      if (existingCustomer) {
        throw new ValidationError(`Email ${email} already exists`);
      }
    }

    if (login && login !== customer.login) {
      const existingCustomer = await this.customerRepository.findByLogin(login);
      if (existingCustomer) {
        throw new ValidationError(`Login ${login} already exists`);
      }
    }

    return await this.customerRepository.update(id, customerData);
  }

  async updatePassword(id, oldPassword, newPassword) {
    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      throw new NotFoundError('Customer not found');
    }

    const isMatch = await AuthUtils.comparePassword(
      oldPassword,
      customer.password,
    );

    if (!isMatch) {
      throw new AuthenticationError('Current password is incorrect');
    }

    const hashedPassword = await AuthUtils.hashPassword(newPassword);

    return await this.customerRepository.updatePassword(id, hashedPassword);
  }

  async deleteCustomer(id) {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new NotFoundError('Customer not found');
    }

    await this.customerRepository.delete(id);

    return {
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
    };
  }
}

module.exports = CustomerService;

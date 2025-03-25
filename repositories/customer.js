const Customer = require('../models/Customer');
const CustomerRepository = require('../interfaces/customer/customer-repository');

class CustomerRepositoryImpl extends CustomerRepository {
  async findAll() {
    return await Customer.find()
      .select('-password')
      .sort({ firstName: 1, lastName: 1 });
  }

  async create(customerData) {
    const customer = new Customer(customerData);
    const savedCustomer = await customer.save();
    const customerWithoutPassword = savedCustomer.toObject();

    // Remove the password before returning
    delete customerWithoutPassword.password;

    return customerWithoutPassword;
  }

  async findByEmail(email) {
    return await Customer.findOne({ email });
  }

  async findByLogin(login) {
    return await Customer.findOne({ login });
  }

  async findByEmailOrLogin(email, login) {
    return await Customer.findOne({ $or: [{ email }, { login }] });
  }

  async findById(id) {
    return await Customer.findById(id);
  }

  async update(id, customerData) {
    return await Customer.findByIdAndUpdate(
      id,
      { $set: customerData },
      { new: true },
    ).select('-password');
  }

  async updatePassword(id, hashedPassword) {
    return await Customer.findByIdAndUpdate(
      id,
      { $set: { password: hashedPassword } },
      { new: true },
    ).select('-password');
  }

  async delete(id) {
    return await Customer.findByIdAndDelete(id);
  }
}

module.exports = CustomerRepositoryImpl;

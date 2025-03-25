class CustomerRepository {
  async findAll() {
    throw new Error('Method not implemented');
  }

  async create(customerData) {
    throw new Error('Method not implemented');
  }

  async findByEmail(email) {
    throw new Error('Method not implemented');
  }

  async findByLogin(login) {
    throw new Error('Method not implemented');
  }

  async findByEmailOrLogin(email, login) {
    throw new Error('Method not implemented');
  }

  async findById(id) {
    throw new Error('Method not implemented');
  }

  async update(id, customerData) {
    throw new Error('Method not implemented');
  }

  async updatePassword(id, hashedPassword) {
    throw new Error('Method not implemented');
  }

  async delete(id) {
    throw new Error('Method not implemented');
  }
}

module.exports = CustomerRepository;

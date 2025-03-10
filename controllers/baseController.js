class BaseController {
  constructor(model) {
    if (this.constructor === BaseController) {
      throw new Error(
        'BaseController is an abstract class and cannot be instantiated directly',
      );
    }
    this.model = model;
  }

  // Абстрактні методи, які мають бути реалізовані в дочірніх класах
  async create(req, res) {
    throw new Error('Method create() must be implemented');
  }

  async getAll(req, res) {
    throw new Error('Method getAll() must be implemented');
  }

  async getOne(req, res) {
    throw new Error('Method getOne() must be implemented');
  }

  async update(req, res) {
    throw new Error('Method update() must be implemented');
  }

  async delete(req, res) {
    throw new Error('Method delete() must be implemented');
  }
}

module.exports = BaseController;

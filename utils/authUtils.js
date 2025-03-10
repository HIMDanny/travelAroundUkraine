const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

class AuthUtils {
  // Генерація хешу пароля
  static async hashPassword(password, saltRounds = 10) {
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }

  // Порівняння пароля з хешем
  static async comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

  // Генерація JWT токена
  static generateToken(payload, expiresIn = '24h') {
    return jwt.sign(payload, keys.secretOrKey, { expiresIn });
  }

  // Верифікація JWT токена
  static verifyToken(token) {
    try {
      return jwt.verify(token, keys.secretOrKey);
    } catch (error) {
      return null;
    }
  }

  // Створення payload для JWT
  static createTokenPayload(user) {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}

module.exports = AuthUtils;

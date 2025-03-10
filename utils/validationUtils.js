class ValidationUtils {
  // Перевірка наявності обов'язкових полів
  static validateRequiredFields(data, requiredFields) {
    const errors = {};

    requiredFields.forEach((field) => {
      if (!data[field]) {
        errors[field] = `${field} is required`;
      }
    });

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  // Валідація email
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Валідація пароля
  static validatePassword(password) {
    if (password.length < 6) {
      return {
        isValid: false,
        errors: { password: 'Password must be at least 6 characters long' },
      };
    }
    return { isValid: true, errors: {} };
  }

  // Валідація числового значення
  static validateNumber(value, fieldName) {
    if (isNaN(value) || value < 0) {
      return {
        isValid: false,
        errors: { [fieldName]: `${fieldName} must be a positive number` },
      };
    }
    return { isValid: true, errors: {} };
  }

  // Валідація дати
  static validateDate(date, fieldName) {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return {
        isValid: false,
        errors: { [fieldName]: `${fieldName} must be a valid date` },
      };
    }
    return { isValid: true, errors: {} };
  }

  // Об'єднання результатів валідації
  static combineValidationResults(...results) {
    const errors = {};
    let isValid = true;

    results.forEach((result) => {
      if (!result.isValid) {
        isValid = false;
        Object.assign(errors, result.errors);
      }
    });

    return { isValid, errors };
  }
}

module.exports = ValidationUtils;

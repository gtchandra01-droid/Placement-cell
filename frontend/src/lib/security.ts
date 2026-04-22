/**
 * Security utilities for input sanitization and encoding
 */

// HTML encode to prevent XSS
export const encodeHTML = (str: string): string => {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};

// Sanitize user input by removing dangerous characters
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  return input
    .replace(/[<>\"']/g, (char) => {
      const map: { [key: string]: string } = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
      };
      return map[char] || char;
    })
    .trim();
};

// Sanitize for logging (remove newlines and special chars)
export const sanitizeForLogging = (input: string): string => {
  if (!input) return '';
  return input
    .replace(/[\n\r\t]/g, ' ')
    .replace(/[<>\"']/g, '')
    .substring(0, 500); // Limit length
};

// Validate email
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

// Validate URL
export const validateURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Validate required fields
export const validateRequired = (value: string): boolean => {
  return value && value.trim().length > 0;
};

// Validate minimum length
export const validateMinLength = (value: string, minLength: number): boolean => {
  return value && value.trim().length >= minLength;
};

// Validate maximum length
export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return !value || value.trim().length <= maxLength;
};

// Comprehensive form validation
export const validateForm = (data: { [key: string]: string }, rules: { [key: string]: string[] }): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};

  for (const field in rules) {
    const fieldRules = rules[field];
    const value = data[field] || '';

    for (const rule of fieldRules) {
      if (rule === 'required' && !validateRequired(value)) {
        errors[field] = `${field} is required`;
        break;
      }
      if (rule === 'email' && value && !validateEmail(value)) {
        errors[field] = `${field} must be a valid email`;
        break;
      }
      if (rule === 'phone' && value && !validatePhone(value)) {
        errors[field] = `${field} must be a valid phone number`;
        break;
      }
      if (rule === 'url' && value && !validateURL(value)) {
        errors[field] = `${field} must be a valid URL`;
        break;
      }
      if (rule.startsWith('min:')) {
        const minLength = parseInt(rule.split(':')[1]);
        if (value && !validateMinLength(value, minLength)) {
          errors[field] = `${field} must be at least ${minLength} characters`;
          break;
        }
      }
      if (rule.startsWith('max:')) {
        const maxLength = parseInt(rule.split(':')[1]);
        if (!validateMaxLength(value, maxLength)) {
          errors[field] = `${field} must not exceed ${maxLength} characters`;
          break;
        }
      }
    }
  }

  return errors;
};

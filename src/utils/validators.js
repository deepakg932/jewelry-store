// src/utils/validators.js
export const validators = {
  email: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  phone: (phone) => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone),
  zipCode: (zip) => /^\d{5}(-\d{4})?$/.test(zip),
  cardNumber: (num) => /^\d{16}$/.test(num.replace(/\s/g, '')),
  expiry: (exp) => /^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(exp),
  cvv: (cvv) => /^\d{3,4}$/.test(cvv),
  required: (value) => value !== null && value !== undefined && value !== '',
  minLength: (value, length) => value && value.length >= length,
  maxLength: (value, length) => value && value.length <= length,
}

export const validateForm = (data, rules) => {
  const errors = {}
  for (const [field, fieldRules] of Object.entries(rules)) {
    for (const [rule, params] of Object.entries(fieldRules)) {
      const value = data[field]
      const isValid = validators[rule](value, ...(Array.isArray(params) ? params : [params]))
      if (!isValid) {
        errors[field] = `${field} is invalid`
        break
      }
    }
  }
  return { isValid: Object.keys(errors).length === 0, errors }
}
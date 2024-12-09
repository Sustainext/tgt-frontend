import { isEmpty, get, isNumber } from "lodash";

/**
 * Validation rule types
 */
export const VALIDATION_TYPES = {
  REQUIRED: "required",
  NUMBER: "number",
  MIN: "min",
  MAX: "max",
  PATTERN: "pattern",
  CUSTOM: "custom",
};

/**
 * Default validation messages
 */
export const DEFAULT_MESSAGES = {
  required: (field) => `${field} is required`,
  number: (field) => `${field} must be a number`,
  min: (field, min) => `${field} must be greater than ${min}`,
  max: (field, max) => `${field} must be less than ${max}`,
  pattern: (field) => `${field} format is invalid`,
};

/**
 * Creates a validation rule
 * @param {string} type - Type of validation
 * @param {Object} options - Validation options
 * @param {string} message - Custom error message
 * @returns {Object} Validation rule object
 */
export const createValidationRule = (type, options = {}, message) => ({
  type,
  options,
  message,
});

/**
 * Pre-built validation rules
 */
export const ValidationRules = {
  required: (message) =>
    createValidationRule(VALIDATION_TYPES.REQUIRED, {}, message),

  number: (message) =>
    createValidationRule(VALIDATION_TYPES.NUMBER, {}, message),

  min: (min, message) =>
    createValidationRule(VALIDATION_TYPES.MIN, { min }, message),

  max: (max, message) =>
    createValidationRule(VALIDATION_TYPES.MAX, { max }, message),

  pattern: (regex, message) =>
    createValidationRule(VALIDATION_TYPES.PATTERN, { pattern: regex }, message),

  custom: (validatorFn, message) =>
    createValidationRule(
      VALIDATION_TYPES.CUSTOM,
      { validator: validatorFn },
      message
    ),
};

/**
 * Validates a single value against a rule
 * @param {*} value - Value to validate
 * @param {Object} rule - Validation rule
 * @param {string} fieldName - Name of the field
 * @returns {string|null} Error message or null if valid
 */
const validateValue = (value, rule, fieldName) => {
  const { type, options, message } = rule;

  switch (type) {
    case VALIDATION_TYPES.REQUIRED:
      if (isEmpty(value) && value !== 0) {
        return message || DEFAULT_MESSAGES.required(fieldName);
      }
      break;

    case VALIDATION_TYPES.NUMBER:
      if (!isNumber(Number(value))) {
        return message || DEFAULT_MESSAGES.number(fieldName);
      }
      break;

    case VALIDATION_TYPES.MIN:
      if (Number(value) < options.min) {
        return message || DEFAULT_MESSAGES.min(fieldName, options.min);
      }
      break;

    case VALIDATION_TYPES.MAX:
      if (Number(value) > options.max) {
        return message || DEFAULT_MESSAGES.max(fieldName, options.max);
      }
      break;

    case VALIDATION_TYPES.PATTERN:
      if (!options.pattern.test(value)) {
        return message || DEFAULT_MESSAGES.pattern(fieldName);
      }
      break;

    case VALIDATION_TYPES.CUSTOM:
      if (options.validator) {
        const result = options.validator(value);
        if (result !== true) {
          return message || result;
        }
      }
      break;
  }

  return null;
};

/**
 * Validates form data against validation schema
 * @param {Array|Object} formData - Form data to validate
 * @param {Object} validationSchema - Validation schema
 * @param {Object} options - Validation options
 * @returns {Object} Validation result
 */
export const validateFormData = (formData, validationSchema, options = {}) => {
  console.log(
    "validateFormData called with formData:",
    formData,
    validationSchema
  );

  const {
    arrayPath = "data",
    valuePath = "Emission",
    shouldBreakOnError = false,
  } = options;

  const errors = {
    hasErrors: false,
    fields: {},
    messages: [],
  };

  // Handle array of form data
  const dataArray = Array.isArray(formData)
    ? formData
    : get(formData, arrayPath, []);

  if (dataArray.length === 0) {
    errors.hasErrors = true;
    errors.messages.push("No data provided");
    return errors;
  }

  dataArray.forEach((row, index) => {
    const fieldData = get(row, valuePath, {});
    const fieldErrors = {};

    // Validate each field in the schema
    Object.entries(validationSchema).forEach(([field, rules]) => {
      const value = fieldData[field];
      const validationRules = Array.isArray(rules) ? rules : [rules];

      for (const rule of validationRules) {
        const error = validateValue(value, rule, field);
        if (error) {
          fieldErrors[field] = error;
          errors.hasErrors = true;
          if (shouldBreakOnError) break;
        }
      }
    });

    // Add field errors for this row if any exist
    if (Object.keys(fieldErrors).length > 0) {
      errors.fields[index] = fieldErrors;
      errors.messages.push(`Row ${index + 1} has invalid fields`);
    }
  });

  return errors;
};

/**
 * Gets user-friendly error messages from validation result
 * @param {Object} validationResult - Result from validateFormData
 * @param {Object} options - Formatting options
 * @returns {Array} Array of formatted error messages
 */
export const getFormattedValidationMessages = (
  validationResult,
  options = {}
) => {
  const {
    includeRowNumbers = true,
    includeFieldNames = true,
    separator = ": ",
  } = options;

  const messages = [];

  if (validationResult.messages.length > 0) {
    messages.push(...validationResult.messages);
  }

  Object.entries(validationResult.fields).forEach(([rowIndex, fieldErrors]) => {
    Object.entries(fieldErrors).forEach(([field, error]) => {
      let message = "";

      if (includeRowNumbers) {
        message += `Row ${parseInt(rowIndex) + 1}${separator}`;
      }

      if (includeFieldNames) {
        message += `${field}${separator}`;
      }

      message += error;
      messages.push(message);
    });
  });

  return messages;
};

/**
 * Checks if form data is valid
 * @param {Array|Object} formData - Form data to validate
 * @param {Object} validationSchema - Validation schema
 * @param {Object} options - Validation options
 * @returns {boolean} True if valid
 */
export const isFormValid = (formData, validationSchema, options = {}) => {
  const validationResult = validateFormData(
    formData,
    validationSchema,
    options
  );
  return !validationResult.hasErrors;
};

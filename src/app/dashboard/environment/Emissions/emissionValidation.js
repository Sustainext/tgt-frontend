import {
  ValidationRules,
  validateFormData,
} from "../../../utils/formValidationUtils";

// Base validation schema for emissions
export const baseEmissionSchema = {
  Category: ValidationRules.required("Category is required"),
  Subcategory: ValidationRules.required("Subcategory is required"),
  Activity: ValidationRules.required("Activity is required"),
  Quantity: [
    ValidationRules.required("Quantity is required"),
    ValidationRules.number("Quantity must be a number"),
    ValidationRules.min(0, "Quantity must be greater than 0"),
  ],
  Unit: ValidationRules.required("Unit is required"),
};

// Extended schema for 'Over' unit types
export const overUnitEmissionSchema = {
  ...baseEmissionSchema,
  Quantity2: [
    ValidationRules.required("Second quantity is required"),
    ValidationRules.number("Second quantity must be a number"),
    ValidationRules.min(0, "Second quantity must be greater than 0"),
  ],
  Unit2: ValidationRules.required("Second unit is required"),
};

export const validateEmissionsData = (formDataWrapper, scope) => {
  const formData = formDataWrapper?.data?.data;

  if (!formData || !Array.isArray(formData)) {
    return {
      hasErrors: true,
      messages: [`${scope}: Invalid data structure`],
      fields: {},
      errorsByType: {},
    };
  }

  const validRows = formData.filter(
    (row) =>
      row &&
      row.Emission &&
      row.Emission.rowType !== "assigned" &&
      row.Emission.rowType !== "approved"
  );
  console.log("validRows", validRows);

  if (validRows.length === 0) {
    return {
      hasErrors: true,
      messages: [`${scope}: No valid emission data found`],
      fields: {},
      errorsByType: {},
    };
  }

  const errors = {
    hasErrors: false,
    messages: [],
    fields: {},
    errorsByType: {},
  };

  validRows.forEach((row, index) => {
    const emission = row.Emission;
    const fieldErrors = {};
    const schema = emission.unit_type?.includes("Over")
      ? overUnitEmissionSchema
      : baseEmissionSchema;

    Object.entries(schema).forEach(([field, rules]) => {
      const validationRules = Array.isArray(rules) ? rules : [rules];
      const value = emission[field];

      for (const rule of validationRules) {
        const error = validateField(value, rule, field);
        if (error) {
          fieldErrors[field] = error;
          errors.hasErrors = true;

          const errorType = rule.type;
          if (!errors.errorsByType[errorType]) {
            errors.errorsByType[errorType] = new Set();
          }
          errors.errorsByType[errorType].add(field);
          break;
        }
      }
    });

    if (Object.keys(fieldErrors).length > 0) {
      errors.fields[index] = fieldErrors;
      Object.entries(fieldErrors).forEach(([field, error]) => {
        errors.messages.push(`Row ${index + 1}: ${error}`);
      });
    }
  });

  errors.errorsByType = Object.fromEntries(
    Object.entries(errors.errorsByType).map(([type, fields]) => [
      type,
      Array.from(fields),
    ])
  );

  if (scope) {
    errors.messages = errors.messages.map((msg) => `${scope}: ${msg}`);
  }

  return errors;
};

export const formatValidationErrors = (results) => {
  if (!Array.isArray(results)) {
    console.error("Invalid validation results format");
    return {};
  }

  const scopeErrors = {};

  results.forEach(({ scope, result }) => {
    if (result?.hasErrors && result?.fields) {
      const errorTypes = {};

      Object.values(result.fields).forEach((fieldErrors) => {
        Object.keys(fieldErrors).forEach((fieldName) => {
          let errorType = "invalid";
          if (fieldErrors[fieldName].includes("required")) {
            errorType = "required";
          } else if (fieldErrors[fieldName].includes("must be a number")) {
            errorType = "number";
          } else if (fieldErrors[fieldName].includes("must be greater than")) {
            errorType = "min";
          }

          if (!errorTypes[errorType]) {
            errorTypes[errorType] = new Set();
          }

          errorTypes[errorType].add(fieldName);
        });
      });

      const messages = [];
      Object.entries(errorTypes).forEach(([errorType, fields]) => {
        const fieldArray = Array.from(fields);
        switch (errorType) {
          case "required":
            messages.push(
              `The following fields are required: ${fieldArray.join(", ")}`
            );
            break;
          case "number":
            messages.push(
              `The following fields must be numbers: ${fieldArray.join(", ")}`
            );
            break;
          case "min":
            messages.push(
              `The following fields must be greater than 0: ${fieldArray.join(
                ", "
              )}`
            );
            break;
          default:
            messages.push(`Invalid ${fieldArray.join(", ")}`);
        }
      });

      if (messages.length > 0) {
        scopeErrors[scope] = messages;
      }
    }
  });

  return scopeErrors;
};

const validateField = (value, rule, fieldName) => {
  const { type, options, message } = rule;

  switch (type) {
    case "required":
      if (isEmpty(value) && value !== 0) {
        return message || `${fieldName} is required`;
      }
      break;

    case "number":
      if (value !== "" && !isNumber(Number(value))) {
        return message || `${fieldName} must be a number`;
      }
      break;

    case "min":
      if (value !== "" && Number(value) <= options.min) {
        return message || `${fieldName} must be greater than ${options.min}`;
      }
      break;

    case "custom":
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

const isEmpty = (value) => {
  return value === undefined || value === null || value === "";
};

const isNumber = (value) => {
  return typeof value === "number" && !isNaN(value);
};

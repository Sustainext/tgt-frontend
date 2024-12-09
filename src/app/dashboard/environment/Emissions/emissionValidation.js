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
      rowErrors: [],
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

  if (validRows.length === 0) {
    return {
      hasErrors: true,
      messages: [`${scope}: No valid emission data found`],
      fields: {},
      rowErrors: [],
      errorsByType: {},
    };
  }

  const errors = {
    hasErrors: false,
    messages: [],
    fields: {},
    rowErrors: [], // Array to track which rows have errors
    errorsByType: {},
    emptyFields: {}, // Track empty fields specifically
  };

  validRows.forEach((row, index) => {
    const emission = row.Emission;
    const fieldErrors = {};
    const emptyFields = [];

    // Check required fields
    const requiredFields = [
      "Category",
      "Subcategory",
      "Activity",
      "Quantity",
      "Unit",
    ];
    if (emission.unit_type?.includes("Over")) {
      requiredFields.push("Quantity2", "Unit2");
    }

    requiredFields.forEach((field) => {
      const value = emission[field];
      if (!value && value !== 0) {
        fieldErrors[field] = `${field} is required`;
        emptyFields.push(field);
      }
    });

    // Validate number fields
    ["Quantity", "Quantity2"].forEach((field) => {
      if (emission[field] && isNaN(Number(emission[field]))) {
        fieldErrors[field] = `${field} must be a number`;
      } else if (emission[field] && Number(emission[field]) <= 0) {
        fieldErrors[field] = `${field} must be greater than 0`;
      }
    });

    if (Object.keys(fieldErrors).length > 0) {
      errors.fields[index] = fieldErrors;
      errors.emptyFields[index] = emptyFields;
      errors.rowErrors.push(index);
      errors.hasErrors = true;

      // Categorize errors by type
      emptyFields.forEach((field) => {
        if (!errors.errorsByType["empty"]) {
          errors.errorsByType["empty"] = new Set();
        }
        errors.errorsByType["empty"].add(field);
      });

      Object.entries(fieldErrors).forEach(([field, error]) => {
        errors.messages.push(`Row ${index + 1}: ${error}`);
      });
    }
  });

  // Convert Sets to Arrays in errorsByType
  errors.errorsByType = Object.fromEntries(
    Object.entries(errors.errorsByType).map(([type, fields]) => [
      type,
      Array.from(fields),
    ])
  );

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
      const errorMessages = [];
      const emptyFieldsByRow = {};

      // Group errors by row
      Object.entries(result.fields).forEach(([rowIndex, fieldErrors]) => {
        const rowNumber = parseInt(rowIndex) + 1;
        const emptyFields = result.emptyFields[rowIndex] || [];

        if (emptyFields.length > 0) {
          emptyFieldsByRow[rowNumber] = emptyFields;
          errorMessages.push(
            `Row ${rowNumber} has empty fields: ${emptyFields.join(", ")}`
          );
        }
      });

      if (errorMessages.length > 0) {
        scopeErrors[scope] = {
          messages: errorMessages,
          emptyFieldsByRow,
        };
      }
    }
  });

  return scopeErrors;
};

// Helper functions
const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    value === "" ||
    (typeof value === "string" && value.trim() === "")
  );
};

const isNumber = (value) => {
  return typeof value === "number" && !isNaN(value);
};

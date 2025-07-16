"use client";

import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { decryptPII, isDataEncrypted } from "../../utils/fernetDecryption";

/**
 * MaskedPIIField Component
 * Displays PII data in masked format with option to view actual data
 * Automatically handles Fernet decryption of encrypted data
 */
const MaskedPIIField = ({
  data,
  fieldType = "email",
  label = "Sensitive Data",
  className = "",
  showToggle = true,
  customMaskPattern = null,
  onDecryptionError = null,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [decryptedData, setDecryptedData] = useState("");
  const [isEncrypted, setIsEncrypted] = useState(false);
  const [decryptionError, setDecryptionError] = useState(null);

  useEffect(() => {
    const handleDecryption = () => {
      if (!data) {
        setDecryptedData("");
        setIsEncrypted(false);
        return;
      }

      try {
        // Check if data is encrypted
        const encrypted = isDataEncrypted(data);
        setIsEncrypted(encrypted);

        // Debug logging
        console.log(`MaskedPIIField Debug - Field: ${fieldType}, Data: "${data}", IsEncrypted: ${encrypted}`);

        if (encrypted) {
          // Attempt to decrypt the data
          const decrypted = decryptPII(data);
          console.log(`MaskedPIIField Debug - Decrypted: "${decrypted}"`);
          setDecryptedData(decrypted);
          setDecryptionError(null);
        } else {
          // Data is already plain text
          setDecryptedData(data);
          setDecryptionError(null);
        }
      } catch (error) {
        console.error("PII decryption error:", error);
        setDecryptionError(error.message);
        setDecryptedData(data); // Fallback to original data
        
        // Call error callback if provided
        if (onDecryptionError) {
          onDecryptionError(error);
        }
      }
    };

    handleDecryption();
  }, [data, onDecryptionError]);

  /**
   * Generate masked version of the data based on field type
   */
  const getMaskedData = (data, type) => {
    if (!data) return "";

    // Use custom mask pattern if provided
    if (customMaskPattern) {
      return customMaskPattern(data);
    }

    switch (type.toLowerCase()) {
      case "email":
        const emailParts = data.split("@");
        if (emailParts.length === 2) {
          const [username, domain] = emailParts;
          const maskedUsername = username.length > 2 
            ? username.substring(0, 2) + "*".repeat(username.length - 2)
            : "*".repeat(username.length);
          return `${maskedUsername}@${domain}`;
        }
        return "*".repeat(data.length);

      case "phone":
        // Mask phone number, show last 4 digits
        if (data.length > 4) {
          return "*".repeat(data.length - 4) + data.slice(-4);
        }
        return "*".repeat(data.length);

      case "ssn":
      case "social":
        // Mask SSN, show last 4 digits
        if (data.length > 4) {
          return "***-**-" + data.slice(-4);
        }
        return "*".repeat(data.length);

      case "name":
        // Mask name, show first letter
        const nameParts = data.split(" ");
        return nameParts.map(part => 
          part.length > 1 ? part[0] + "*".repeat(part.length - 1) : part
        ).join(" ");

      case "address":
        // Mask address, show first few characters
        if (data.length > 6) {
          return data.substring(0, 3) + "*".repeat(data.length - 6) + data.slice(-3);
        }
        return "*".repeat(data.length);

      default:
        // Generic masking - show first and last character for strings > 2 chars
        if (data.length > 2) {
          return data[0] + "*".repeat(data.length - 2) + data.slice(-1);
        }
        return "*".repeat(data.length);
    }
  };

  const maskedData = getMaskedData(decryptedData, fieldType);
  const displayData = isVisible ? decryptedData : maskedData;

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={`inline-flex items-center space-x-2 ${className}`}>
      {/* Data Display */}
      <span 
        className={`font-mono text-sm ${
          isVisible ? "text-gray-900" : "text-gray-600"
        } ${decryptionError ? "text-gray-600" : ""}`}
        title={decryptionError ? `Decryption Error: ${decryptionError}` : label}
      >
        {displayData}
      </span>

      {/* Encryption Indicator */}
      {isEncrypted && (
        <span 
          className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
          title="This data is encrypted"
        >
          🔒
        </span>
      )}

      {/* Decryption Error Indicator */}
      {decryptionError && (
        <span 
          className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
          title={`Decryption failed: ${decryptionError}`}
        >
          ⚠️
        </span>
      )}

      {/* View Toggle Button */}
      {showToggle && decryptedData && (
        <button
          onClick={toggleVisibility}
          className="inline-flex items-center justify-center w-6 h-6 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors"
          title={isVisible ? "Hide sensitive data" : "Show sensitive data"}
          aria-label={isVisible ? "Hide sensitive data" : "Show sensitive data"}
        >
          {isVisible ? (
            <AiOutlineEyeInvisible className="w-4 h-4" />
          ) : (
            <AiOutlineEye className="w-4 h-4" />
          )}
        </button>
      )}
    </div>
  );
};

/**
 * Higher-order component for wrapping form inputs with PII masking
 */
export const withPIIMasking = (InputComponent) => {
  return ({ value, fieldType = "text", showMasked = false, ...props }) => {
    if (showMasked && value) {
      return (
        <div className="space-y-2">
          <InputComponent {...props} value={value} />
          <div className="text-xs text-gray-500">
            <span className="font-medium">Masked view: </span>
            <MaskedPIIField 
              data={value} 
              fieldType={fieldType}
              showToggle={false}
              className="inline"
            />
          </div>
        </div>
      );
    }
    return <InputComponent {...props} value={value} />;
  };
};

/**
 * Simple component for displaying masked email specifically
 */
export const MaskedEmail = ({ email, className = "", ...props }) => (
  <MaskedPIIField
    data={email}
    fieldType="email"
    label="Email Address"
    className={className}
    {...props}
  />
);

/**
 * Simple component for displaying masked phone specifically
 */
export const MaskedPhone = ({ phone, className = "", ...props }) => (
  <MaskedPIIField
    data={phone}
    fieldType="phone"
    label="Phone Number"
    className={className}
    {...props}
  />
);


export default MaskedPIIField;
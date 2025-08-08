/**
 * Fernet encryption/decryption utility for PII data
 * Uses the fernet package for secure symmetric encryption
 */

const fernet = require('fernet');

class FernetUtils {
  constructor(secretKey) {
    // If no key provided, use environment variable or generate a default
    this.secretKey = secretKey || process.env.FERNET_SECRET_KEY;
    
    if (!this.secretKey) {
      console.warn('No Fernet secret key provided. Using default key for development.');
      // Generate a default key for development (should be replaced with proper key management)
      this.secretKey = new fernet.Secret();
    }
    
    // Create the secret object properly
    let secret;
    if (typeof this.secretKey === 'string') {
      secret = new fernet.Secret(this.secretKey);
    } else {
      secret = this.secretKey;
    }
    
    this.token = new fernet.Token({
      secret: secret,
      ttl: 0 // No expiration for PII data
    });
  }

  /**
   * Decrypt Fernet-encrypted data
   * @param {string} encryptedData - Base64 encoded Fernet token
   * @returns {string} - Decrypted plaintext data
   */
  decrypt(encryptedData) {
    try {
      if (!encryptedData) {
        return '';
      }

      // Ensure the encrypted data is properly formatted
      const cleanedData = encryptedData.trim();
      
      console.log('Fernet Decrypt Debug - Input:', cleanedData);
      console.log('Fernet Decrypt Debug - Secret Key:', this.secretKey);
      
      // Try to decrypt the data
      const decryptedMessage = this.token.decode(cleanedData);
      console.log('Fernet Decrypt Debug - Output:', decryptedMessage);
      
      return decryptedMessage;
    } catch (error) {
      console.error('Fernet decryption failed:', error, 'for data:', encryptedData);
      console.log('Fernet Decrypt Debug - Error Details:', error.message);
      
      // If decryption fails, it might be because of wrong key or the data is not encrypted
      // Let's try a different approach - check if it's actually a valid Fernet token
      if (error.message.includes('Invalid token') || error.message.includes('decode')) {
        console.log('Fernet Decrypt Debug - Token appears invalid, returning original data');
        return encryptedData;
      }
      
      // Return the original data if decryption fails (might already be decrypted)
      return encryptedData;
    }
  }

  /**
   * Encrypt data using Fernet
   * @param {string} plaintext - Data to encrypt
   * @returns {string} - Base64 encoded Fernet token
   */
  encrypt(plaintext) {
    try {
      if (!plaintext) {
        return '';
      }

      const encryptedToken = this.token.encode(plaintext);
      return encryptedToken;
    } catch (error) {
      console.error('Fernet encryption failed:', error);
      return plaintext;
    }
  }

  /**
   * Check if data appears to be Fernet encrypted
   * @param {string} data - Data to check
   * @returns {boolean} - True if data appears to be Fernet encrypted
   */
  isEncrypted(data) {
    if (!data || typeof data !== 'string') {
      return false;
    }

    // Fernet tokens are base64 encoded and typically start with "gAAAAA"
    // More strict check for Fernet format
    try {
      // Check for base64 format and minimum length
      const base64Regex = /^[A-Za-z0-9+/=]+$/;
      const isBase64 = base64Regex.test(data);
      const hasMinLength = data.length > 40; // Fernet tokens are typically longer
      
      // Check for Fernet token characteristics
      const startsWithFernetPattern = data.startsWith('gAAAAA') || data.startsWith('gAAAAAB');
      
      // If it looks like base64 and is long enough, or has Fernet pattern, consider it encrypted
      return (isBase64 && hasMinLength) || startsWithFernetPattern;
    } catch {
      return false;
    }
  }
}

// Create a singleton instance
let fernetInstance = null;

/**
 * Get or create the Fernet utility instance
 * @param {string} secretKey - Optional secret key
 * @returns {FernetUtils} - Fernet utility instance
 */
export const getFernetUtils = (secretKey = null) => {
  if (!fernetInstance || secretKey) {
    fernetInstance = new FernetUtils(secretKey);
  }
  return fernetInstance;
};

/**
 * Convenience function to decrypt PII data
 * @param {string} encryptedData - Encrypted PII data
 * @returns {string} - Decrypted data
 */
export const decryptPII = (encryptedData) => {
  const fernetUtils = getFernetUtils();
  return fernetUtils.decrypt(encryptedData);
};

/**
 * Convenience function to encrypt PII data
 * @param {string} plaintext - Plain text data
 * @returns {string} - Encrypted data
 */
export const encryptPII = (plaintext) => {
  const fernetUtils = getFernetUtils();
  return fernetUtils.encrypt(plaintext);
};

/**
 * Check if data is encrypted
 * @param {string} data - Data to check
 * @returns {boolean} - True if encrypted
 */
export const isDataEncrypted = (data) => {
  const fernetUtils = getFernetUtils();
  return fernetUtils.isEncrypted(data);
};

export default FernetUtils;
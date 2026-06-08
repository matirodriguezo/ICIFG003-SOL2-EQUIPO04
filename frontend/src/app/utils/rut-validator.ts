/**
 * RUT (Rol Único Tributario) validation utilities for Chilean documents
 */

/**
 * Validates a Chilean RUT and formats it
 * Format: XX.XXX.XXX-K or X.XXX.XXX-K (8-9 digits + verification digit)
 * @param rut - Raw RUT string without formatting
 * @returns { isValid: boolean, formatted: string, error?: string }
 */
export function validateAndFormatRUT(rut: string): {
  isValid: boolean;
  formatted: string;
  error?: string;
} {
  if (!rut) {
    return {
      isValid: false,
      formatted: '',
      error: 'El RUT es obligatorio'
    };
  }

  // Remove formatting
  const cleanRUT = rut.replace(/[.\-]/g, '').toUpperCase();

// Check if it contains only numbers and optionally K at the end
  if (!/^[0-9]{7,8}[0-9K]$/.test(cleanRUT)) {
    return {
      isValid: false,
      formatted: '',
      error: 'El RUT solo debe contener números y opcionalmente la letra K (ej: 12345678K)'
    };
  }

  // Extract the body and verification digit
  const body = cleanRUT.slice(0, -1);
  const verificationDigit = cleanRUT.slice(-1);

  // Validate RUT length (8 or 9 characters including verification digit)
  if (body.length < 7 || body.length > 8) {
    return {
      isValid: false,
      formatted: '',
      error: 'El RUT debe tener entre 7 y 8 dígitos más el dígito verificador (ej: 12345678-K)'
    };
  }

  // Calculate the correct verification digit
  const expectedDigit = calculateVerificationDigit(body);

  if (verificationDigit !== expectedDigit) {
    return {
      isValid: false,
      formatted: '',
      error: 'El RUT ingresado no es válido (ej: 12.345.678-K con dígito verificador correcto)'
    };
  }

  // Format the RUT
  const formatted = formatRUT(body, verificationDigit);

  return {
    isValid: true,
    formatted
  };
}

/**
 * Calculates the verification digit for a RUT body
 * Uses the modulo 11 algorithm
 * @param body - The RUT body without verification digit
 * @returns The verification digit (0-9 or K)
 */
function calculateVerificationDigit(body: string): string {
  const multipliers = [2, 3, 4, 5, 6, 7];
  let sum = 0;
  let multiplierIndex = 0;

  // Process from right to left
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * multipliers[multiplierIndex];
    multiplierIndex = (multiplierIndex + 1) % multipliers.length;
  }

  const remainder = 11 - (sum % 11);

  if (remainder === 11) return '0';
  if (remainder === 10) return 'K';
  return remainder.toString();
}

/**
 * Formats the RUT to standard Chilean format
 * @param body - The RUT body (7-8 digits)
 * @param verificationDigit - The verification digit
 * @returns Formatted RUT string (e.g., "12.345.678-K")
 */
function formatRUT(body: string, verificationDigit: string): string {
  if (body.length === 7) {
    // X.XXX.XXX-K format
    return `${body.slice(0, 1)}.${body.slice(1, 4)}.${body.slice(4, 7)}-${verificationDigit}`;
  } else {
    // XX.XXX.XXX-K format
    return `${body.slice(0, 2)}.${body.slice(2, 5)}.${body.slice(5, 8)}-${verificationDigit}`;
  }
}

/**
 * Validates a Chilean phone number
 * Accepts formats like: +56912345678, 56912345678, 912345678, +56 9 1234 5678
 * @param phone - Phone number string
 * @returns { isValid: boolean, error?: string }
 */
export function validateChileanPhone(phone: string): {
  isValid: boolean;
  error?: string;
} {
  if (!phone) {
    return {
      isValid: false,
      error: 'El teléfono es obligatorio'
    };
  }

  // Remove formatting
  const cleanPhone = phone.replace(/[^\d+]/g, '');

  // Should have at least 8 digits (mobile) or 8-9 digits (landline)
  // Chilean numbers have specific patterns
  if (!/^(\+56)?9?\d{7,8}$/.test(cleanPhone)) {
    return {
      isValid: false,
      error: 'Ingresa un teléfono válido (ej: +56 9 1234 5678)'
    };
  }

  return {
    isValid: true
  };
}

/**
 * Validates that a field contains only letters and spaces
 * @param value - Text value
 * @param fieldName - Name of the field for error message
 * @returns { isValid: boolean, error?: string }
 */
export function validateTextOnly(value: string, fieldName: string = 'Este campo'): {
  isValid: boolean;
  error?: string;
} {
  if (!value || !value.trim()) {
    return {
      isValid: false,
      error: `${fieldName} es obligatorio`
    };
  }

  if (!/^[a-záéíóúñüA-ZÁÉÍÓÚÑÜ\s]+$/.test(value)) {
    return {
      isValid: false,
      error: `${fieldName} solo debe contener letras y espacios`
    };
  }

  return {
    isValid: true
  };
}

/**
 * Formats RUT while typing (adds dots and dash automatically)
 * @param rut - Current RUT value
 * @returns Formatted RUT string
 */
export function formatRUTWhileTyping(rut: string): string {
  // Remove all non-numeric characters except K
  let cleanRUT = rut.replace(/[^\dK]/gi, '').toUpperCase();

  // Limit to 8 digits + K or 9 digits total
  cleanRUT = cleanRUT.slice(0, 9);

  if (cleanRUT.length === 0) return '';

  // Format based on length
  if (cleanRUT.length <= 1) return cleanRUT;
  if (cleanRUT.length <= 4) {
    return cleanRUT.slice(0, 1) + '.' + cleanRUT.slice(1);
  }
  if (cleanRUT.length <= 7) {
    return (
      cleanRUT.slice(0, 1) +
      '.' +
      cleanRUT.slice(1, 4) +
      '.' +
      cleanRUT.slice(4)
    );
  }
  // 8+ characters
  return (
    cleanRUT.slice(0, 2) +
    '.' +
    cleanRUT.slice(2, 5) +
    '.' +
    cleanRUT.slice(5, 8) +
    '-' +
    cleanRUT.slice(8)
  );
}

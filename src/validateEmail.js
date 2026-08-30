'use strict';

// RFC 5321 caps the local part at 64 chars and the domain at 255 chars.
const LOCAL_PART_MAX_LENGTH = 64;
const DOMAIN_MAX_LENGTH = 255;

// Deliberately conservative: requires at least one dot in the domain and
// disallows consecutive dots, which the naive `.+@.+\..+` pattern allows.
const EMAIL_PATTERN = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * Validates an email address against structural rules (RFC 5321 length
 * limits, no consecutive dots, single '@').
 *
 * @param {string} email
 * @returns {{ valid: boolean, reason: string | null }}
 */
function validateEmail(email) {
  if (typeof email !== 'string') {
    return { valid: false, reason: 'Input must be a string' };
  }

  const trimmed = email.trim();

  if (trimmed.length === 0) {
    return { valid: false, reason: 'Email cannot be empty' };
  }

  if (trimmed.includes('..')) {
    return { valid: false, reason: 'Email cannot contain consecutive dots' };
  }

  const atIndex = trimmed.indexOf('@');
  if (atIndex === -1 || trimmed.indexOf('@', atIndex + 1) !== -1) {
    return { valid: false, reason: 'Email must contain exactly one @' };
  }

  const localPart = trimmed.slice(0, atIndex);
  const domainPart = trimmed.slice(atIndex + 1);

  if (localPart.length === 0 || localPart.length > LOCAL_PART_MAX_LENGTH) {
    return { valid: false, reason: `Local part must be 1-${LOCAL_PART_MAX_LENGTH} characters` };
  }

  if (domainPart.length === 0 || domainPart.length > DOMAIN_MAX_LENGTH) {
    return { valid: false, reason: `Domain must be 1-${DOMAIN_MAX_LENGTH} characters` };
  }

  if (!EMAIL_PATTERN.test(trimmed)) {
    return { valid: false, reason: 'Email format is invalid' };
  }

  return { valid: true, reason: null };
}

module.exports = { validateEmail };

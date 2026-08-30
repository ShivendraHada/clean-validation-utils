'use strict';

const MIN_LENGTH = 8;

const COMMON_PASSWORDS = new Set([
  'password', '12345678', 'qwertyui', 'letmein1', 'admin123', 'password1',
]);

/**
 * Scores a password's strength from 0 (very weak) to 4 (very strong)
 * based on length, character variety, and a common-password blocklist.
 *
 * @param {string} password
 * @returns {{ score: number, label: string, issues: string[] }}
 */
function checkPasswordStrength(password) {
  if (typeof password !== 'string') {
    throw new TypeError('checkPasswordStrength expects a string');
  }

  const issues = [];

  if (password.length < MIN_LENGTH) {
    issues.push(`Must be at least ${MIN_LENGTH} characters`);
  }

  if (COMMON_PASSWORDS.has(password.toLowerCase())) {
    issues.push('Password is too common');
  }

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);

  const varietyCount = [hasLower, hasUpper, hasDigit, hasSymbol].filter(Boolean).length;

  if (varietyCount < 3) {
    issues.push('Use a mix of uppercase, lowercase, numbers, and symbols');
  }

  let score = 0;
  if (password.length >= MIN_LENGTH) score += 1;
  if (password.length >= 12) score += 1;
  if (varietyCount >= 3) score += 1;
  if (varietyCount === 4) score += 1;
  if (COMMON_PASSWORDS.has(password.toLowerCase())) score = 0;

  const labels = ['very weak', 'weak', 'fair', 'strong', 'very strong'];

  return { score, label: labels[score], issues };
}

module.exports = { checkPasswordStrength };

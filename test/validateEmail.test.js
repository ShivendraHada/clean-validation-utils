'use strict';

const { validateEmail } = require('../src/validateEmail');

describe('validateEmail', () => {
  test('accepts a normal email', () => {
    expect(validateEmail('jane.doe@example.com').valid).toBe(true);
  });

  test('accepts email with plus tag', () => {
    expect(validateEmail('jane+newsletter@example.com').valid).toBe(true);
  });

  test('rejects missing @', () => {
    expect(validateEmail('jane.example.com').valid).toBe(false);
  });

  test('rejects multiple @ symbols', () => {
    expect(validateEmail('jane@doe@example.com').valid).toBe(false);
  });

  test('rejects consecutive dots', () => {
    expect(validateEmail('jane..doe@example.com').valid).toBe(false);
  });

  test('rejects empty string', () => {
    expect(validateEmail('').valid).toBe(false);
  });

  test('rejects non-string input', () => {
    expect(validateEmail(12345).valid).toBe(false);
  });

  test('rejects local part over 64 characters', () => {
    const longLocal = 'a'.repeat(65);
    expect(validateEmail(`${longLocal}@example.com`).valid).toBe(false);
  });

  test('trims surrounding whitespace before validating', () => {
    expect(validateEmail('  jane@example.com  ').valid).toBe(true);
  });

  test('rejects domain without a dot', () => {
    expect(validateEmail('jane@localhost').valid).toBe(false);
  });
});

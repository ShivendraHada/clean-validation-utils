'use strict';

const { checkPasswordStrength } = require('../src/checkPasswordStrength');

describe('checkPasswordStrength', () => {
  test('flags short passwords', () => {
    const result = checkPasswordStrength('ab1');
    expect(result.score).toBe(0);
    expect(result.issues.length).toBeGreaterThan(0);
  });

  test('flags common passwords with score 0 regardless of length', () => {
    const result = checkPasswordStrength('password1');
    expect(result.score).toBe(0);
  });

  test('scores a long mixed-character password as very strong', () => {
    const result = checkPasswordStrength('Tr0ub4dor&3xtra');
    expect(result.score).toBe(4);
    expect(result.label).toBe('very strong');
  });

  test('scores a long but low-variety password lower', () => {
    const result = checkPasswordStrength('aaaaaaaaaaaaaaaa');
    expect(result.score).toBeLessThan(4);
  });

  test('throws on non-string input', () => {
    expect(() => checkPasswordStrength(123)).toThrow(TypeError);
  });
});

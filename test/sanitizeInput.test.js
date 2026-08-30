'use strict';

const { sanitizeInput } = require('../src/sanitizeInput');

describe('sanitizeInput', () => {
  test('strips script tags and their content', () => {
    expect(sanitizeInput('hello<script>alert(1)</script>world')).toBe('helloworld');
  });

  test('strips plain html tags but keeps text content', () => {
    expect(sanitizeInput('<b>bold</b> text')).toBe('bold text');
  });

  test('strips inline event handlers', () => {
    expect(sanitizeInput('<img src=x onerror="alert(1)">')).toBe('');
  });

  test('strips javascript: uris', () => {
    expect(sanitizeInput('<a href="javascript:alert(1)">click</a>')).toBe('click');
  });

  test('leaves plain text untouched', () => {
    expect(sanitizeInput('just plain text')).toBe('just plain text');
  });

  test('throws on non-string input', () => {
    expect(() => sanitizeInput(null)).toThrow(TypeError);
  });

  test('handles nested dangerous tags', () => {
    expect(sanitizeInput('<div><script>bad()</script>safe</div>')).toBe('safe');
  });
});

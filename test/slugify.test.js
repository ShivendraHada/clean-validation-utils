'use strict';

const { slugify } = require('../src/slugify');

describe('slugify', () => {
  test('lowercases and hyphenates spaces', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  test('strips diacritics', () => {
    expect(slugify('Café Münchën')).toBe('cafe-munchen');
  });

  test('collapses multiple spaces and symbols into one hyphen', () => {
    expect(slugify('  Hello   ---  World!!  ')).toBe('hello-world');
  });

  test('removes leading and trailing hyphens', () => {
    expect(slugify('-Hello World-')).toBe('hello-world');
  });

  test('throws on non-string input', () => {
    expect(() => slugify(42)).toThrow(TypeError);
  });

  test('handles already-slug input unchanged', () => {
    expect(slugify('already-a-slug')).toBe('already-a-slug');
  });
});

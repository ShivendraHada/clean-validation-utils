'use strict';

// Matches whole tags including their content for known-dangerous elements,
// then strips any remaining tags. Order matters: dangerous elements first,
// so their content is removed rather than just unwrapped.
const DANGEROUS_TAG_PATTERN = /<(script|style|iframe|object|embed)[^>]*>[\s\S]*?<\/\1>/gi;
const ANY_TAG_PATTERN = /<[^>]*>/g;
const EVENT_HANDLER_PATTERN = /\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/gi;
const JAVASCRIPT_URI_PATTERN = /javascript:/gi;

/**
 * Removes HTML tags, inline event handlers, and javascript: URIs from a
 * string so it is safe to render or store as plain text.
 *
 * @param {string} input
 * @returns {string}
 */
function sanitizeInput(input) {
  if (typeof input !== 'string') {
    throw new TypeError('sanitizeInput expects a string');
  }

  let output = input.replace(DANGEROUS_TAG_PATTERN, '');
  output = output.replace(EVENT_HANDLER_PATTERN, '');
  output = output.replace(JAVASCRIPT_URI_PATTERN, '');
  output = output.replace(ANY_TAG_PATTERN, '');

  return output.trim();
}

module.exports = { sanitizeInput };

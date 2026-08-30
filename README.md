# validation-utils

Small, dependency-free input validation and sanitization utilities for Node.js.

## Install

```
npm install
```

## Usage

```js
const { validateEmail, sanitizeInput, slugify, checkPasswordStrength } = require('./src');

validateEmail('jane@example.com');       // { valid: true, reason: null }
sanitizeInput('<script>bad()</script>hi'); // 'hi'
slugify('Café Münchën');                  // 'cafe-munchen'
checkPasswordStrength('Tr0ub4dor&3xtra'); // { score: 4, label: 'very strong', issues: [] }
```

## Functions

- `validateEmail(email)` — structural email validation (length limits, single `@`, no consecutive dots).
- `sanitizeInput(input)` — strips HTML tags, inline event handlers, and `javascript:` URIs.
- `slugify(input)` — converts a string to a URL-safe, ASCII, hyphenated slug.
- `checkPasswordStrength(password)` — scores a password 0-4 based on length, character variety, and a common-password blocklist.

## Test

```
npm test
```

Runs the full suite with coverage via Jest.

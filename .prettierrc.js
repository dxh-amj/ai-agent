/**
 * This configuration enforces consistent code formatting across the entire project.
 * All developers will be forced to use these settings when saving files in VS Code.
 */

module.exports = {
  // Core formatting rules
  semi: true, // Always use semicolons
  singleQuote: false, // Use double quotes for consistency with JSX
  quoteProps: "as-needed", // Only quote object properties when needed
  trailingComma: "es5", // Trailing commas where valid in ES5 (objects, arrays, etc.)

  // Indentation and spacing
  tabWidth: 2, // 2 spaces for indentation
  useTabs: false, // Use spaces instead of tabs

  // Line length and wrapping
  printWidth: 100, // Wrap lines at 100 characters (good for modern screens)

  // Bracket spacing
  bracketSpacing: true, // Spaces inside object literals: { foo: bar }
  bracketSameLine: false, // Put closing bracket on new line

  // Arrow function parentheses
  arrowParens: "always", // Always include parentheses around arrow function parameters

  // JSX specific rules
  jsxSingleQuote: false, // Use double quotes in JSX attributes

  // End of line
  endOfLine: "lf", // Use LF line endings (Unix style)

  // Embedded language formatting
  embeddedLanguageFormatting: "auto",

  // HTML whitespace sensitivity
  htmlWhitespaceSensitivity: "css",

  // Prose wrapping
  proseWrap: "preserve", // Don't wrap markdown text

  // Vue files support (if needed in future)
  vueIndentScriptAndStyle: false,

  // File-specific overrides
  overrides: [
    {
      files: "*.json",
      options: {
        printWidth: 80,
        tabWidth: 2,
      },
    },
    {
      files: "*.md",
      options: {
        printWidth: 80,
        proseWrap: "always",
        tabWidth: 2,
      },
    },
    {
      files: "*.yml",
      options: {
        tabWidth: 2,
        singleQuote: true,
      },
    },
    {
      files: "*.yaml",
      options: {
        tabWidth: 2,
        singleQuote: true,
      },
    },
    {
      files: ["*.css", "*.scss", "*.less"],
      options: {
        singleQuote: true,
        tabWidth: 2,
      },
    },
    {
      files: "*.html",
      options: {
        printWidth: 120,
        tabWidth: 2,
      },
    },
    {
      // Configuration files
      files: [
        ".prettierrc",
        ".prettierrc.json",
        ".prettierrc.js",
        "prettier.config.js",
        ".eslintrc",
        ".eslintrc.json",
        ".eslintrc.js",
        "eslint.config.js",
        "eslint.config.mjs",
      ],
      options: {
        tabWidth: 2,
        printWidth: 100,
      },
    },
  ],
};

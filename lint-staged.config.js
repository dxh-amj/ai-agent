/**
 * Lint-staged Configuration for Mid-Scale Modular Application
 *
 * This configuration runs linting and formatting on staged files before commit.
 * It ensures code quality and consistency across the entire project.
 */

module.exports = {
  // TypeScript and JavaScript files - Run ESLint and Prettier
  "**/*.{ts,tsx,js,jsx}": (filenames) => [
    `yarn eslint --fix ${filenames.join(" ")}`,
    `yarn prettier --write ${filenames.join(" ")}`,
  ],

  // JSON files - Format with Prettier
  "**/*.{json,jsonc}": (filenames) => [`yarn prettier --write ${filenames.join(" ")}`],

  // Markdown files - Format with Prettier
  "**/*.{md,mdx}": (filenames) => [`yarn prettier --write ${filenames.join(" ")}`],

  // CSS/SCSS/LESS files - Format with Prettier
  "**/*.{css,scss,less}": (filenames) => [`yarn prettier --write ${filenames.join(" ")}`],

  // YAML files - Format with Prettier
  "**/*.{yml,yaml}": (filenames) => [`yarn prettier --write ${filenames.join(" ")}`],

  // HTML files - Format with Prettier
  "**/*.html": (filenames) => [`yarn prettier --write ${filenames.join(" ")}`],

  // Configuration files - Format with Prettier
  "**/*.{prettierrc,eslintrc}": (filenames) => [`yarn prettier --write ${filenames.join(" ")}`],
};

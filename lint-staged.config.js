/**
 * Lint-staged Configuration for Mid-Scale Modular Application
 *
 * This configuration runs linting and formatting on staged files before commit.
 * It ensures code quality and consistency across the entire project.
 */

module.exports = {
  // TypeScript and JavaScript files - Run ESLint and Prettier
  // TypeScript and JavaScript files - Run ESLint and Prettier
  "**/*.{ts,tsx,js,jsx}": (filenames) => [
    `yarn eslint --fix ${filenames.map((f) => `"${f}"`).join(" ")}`,
    `yarn prettier --write ${filenames.map((f) => `"${f}"`).join(" ")}`,
    // Run type checking on the whole project via tsc (noEmit) to catch type errors
    // We run this once regardless of file count, hence ignoring the filenames arg for this command
    `bash -c "cd frontend && npx tsc --noEmit"`,
  ],

  // JSON files - Format with Prettier
  "**/*.{json,jsonc}": (filenames) => [
    `yarn prettier --write ${filenames.map((f) => `"${f}"`).join(" ")}`,
  ],

  // Markdown files - Format with Prettier
  "**/*.{md,mdx}": (filenames) => [
    `yarn prettier --write ${filenames.map((f) => `"${f}"`).join(" ")}`,
  ],

  // CSS/SCSS/LESS files - Format with Prettier
  "**/*.{css,scss,less}": (filenames) => [
    `yarn prettier --write ${filenames.map((f) => `"${f}"`).join(" ")}`,
  ],

  // YAML files - Format with Prettier
  "**/*.{yml,yaml}": (filenames) => [
    `yarn prettier --write ${filenames.map((f) => `"${f}"`).join(" ")}`,
  ],

  // HTML files - Format with Prettier
  "**/*.html": (filenames) => [`yarn prettier --write ${filenames.map((f) => `"${f}"`).join(" ")}`],

  // Configuration files - Format with Prettier
  "**/*.{prettierrc,eslintrc}": (filenames) => [
    `yarn prettier --write ${filenames.map((f) => `"${f}"`).join(" ")}`,
  ],
};

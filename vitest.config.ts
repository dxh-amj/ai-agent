/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    // Test environment
    environment: "jsdom",

    // Global setup and teardown
    setupFiles: ["./frontend/src/test/setup.ts"],

    // Include patterns for test files
    include: [
      "frontend/src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
      "frontend/src/**/__tests__/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
    ],

    // Exclude patterns
    exclude: [
      "node_modules",
      "dist",
      ".next",
      "coverage",
      "e2e",
      "frontend/src/test/mocks/**",
      "frontend/src/test/fixtures/**",
    ],

    // Global test configuration
    globals: true,

    // Coverage configuration
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      reportsDirectory: "./coverage",
      exclude: [
        "coverage/**",
        "dist/**",
        ".next/**",
        "node_modules/**",
        "frontend/src/test/**",
        "**/*.d.ts",
        "**/*.config.*",
        "**/index.ts",
        "**/types.ts",
        "**/*.stories.*",
        "**/*.test.*",
        "**/*.spec.*",
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },

    // Test timeout
    testTimeout: 10000,
    hookTimeout: 10000,

    // Retry configuration
    retry: 2,

    outputFile: {
      html: "./test-results/index.html",
    },

    // Watch mode configuration
    watch: false,

    // Pool configuration for parallel testing
    pool: "threads",
    poolOptions: {
      threads: {
        singleThread: false,
        minThreads: 1,
        maxThreads: 4,
      },
    },
  },

  // Resolve configuration
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./frontend/src"),
      "@/app": path.resolve(__dirname, "./frontend/src/app"),
      "@/components": path.resolve(__dirname, "./frontend/src/app/components"),
      "@/providers": path.resolve(__dirname, "./frontend/src/providers"),
      "@/store": path.resolve(__dirname, "./frontend/src/store"),
      "@/types": path.resolve(__dirname, "./frontend/src/shared/types"),
      "@/utils": path.resolve(__dirname, "./frontend/src/utils"),
      "@/config": path.resolve(__dirname, "./frontend/src/config"),
      "@/test": path.resolve(__dirname, "./frontend/src/test"),
      "@devxhub/form-elements": path.resolve(__dirname, "./libs/form-elements/src/index.ts"),
    },
  },
});

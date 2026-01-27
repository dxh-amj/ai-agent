//@ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.dicebear.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "images.squarespace-cdn.com" },
    ],
    unoptimized: true,
  },
  transpilePackages: ["@devxhub/form-elements"],
  // Experimental features for better performance
  experimental: {
    // Optimize imports from large packages for better tree-shaking
    optimizePackageImports: [
      "@mui/material",
      "@mui/icons-material",
      "@mui/lab",
      "@mui/x-date-pickers",
      "@mui/x-charts",
      "@mui/x-tree-view",
      "lodash",
      "@tabler/icons-react",
      "react-icons",
    ],
  },
  // Turbopack configuration
  turbopack: {
    resolveAlias: {
      "@public/*": "./public/*",
    },
  },
  // Optimize MUI imports for better tree-shaking
  modularizeImports: {
    "@mui/material": {
      transform: "@mui/material/{{member}}",
    },
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
  // Reduce source map quality in development for less memory usage
  productionBrowserSourceMaps: false,
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Set WEBPACK_USE_POLLING=true in .env.local if needed
      const WEBPACK_USE_POLLING = process.env.WEBPACK_USE_POLLING === "true";

      // Reduce memory usage with optimized caching
      config.cache = {
        type: "filesystem",
        maxMemoryGenerations: 1,
      };

      // Use cheaper source maps in development
      config.devtool = "eval-cheap-module-source-map";

      config.watchOptions = {
        ignored: [
          "**/node_modules/**",
          "**/.git/**",
          "**/dist/**",
          "**/build/**",
          "**/coverage/**",
          "**/.next/**",
          "**/libs/**",
          "**/public/images/**",
        ],
      };

      if (WEBPACK_USE_POLLING) {
        config.watchOptions.poll = 1000;
        config.watchOptions.aggregateTimeout = 300;
      }
    }
    return config;
  },
};

module.exports = nextConfig;

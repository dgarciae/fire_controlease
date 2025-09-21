import path from "path";
import { defineConfig } from "vite";

import { visualizer } from "rollup-plugin-visualizer";

import react from "@vitejs/plugin-react-swc";
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tanstackRouter({
      target: 'react',
      routesDirectory: './src/router',
      generatedRouteTree: './src/router/routeTree.gen.ts',
      autoCodeSplitting: true,
    }),
    tailwindcss("./tailwind.config.js"),
    visualizer({
      open: true,
      filename: "bundle-report.html",
      template: "treemap",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
    tsconfig: path.resolve(__dirname, "./tsconfig.json"),
  },
  build: {
    outDir: "dist",
    minify: mode === "production" ? "terser" : "esbuild",
    ...(mode === "production" && {
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    }),
    chunkSizeWarningLimit: 300,
  },
}));

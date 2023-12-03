/// <reference types="vitest" />

import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

import packageJson from "./package.json";

const getPackageName = () => {
  return packageJson.name.split("/").pop() || packageJson.name;
};

const getPackageNameCamelCase = () => {
  try {
    return getPackageName().replace(/-./g, (char) => char[1].toUpperCase());
  } catch (err) {
    throw new Error("Name property in package.json is missing.");
  }
};

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/index.ts"),
      name: getPackageNameCamelCase(),
      formats: ["es", "cjs", "iife"],
      // the proper extensions will be added
      fileName: getPackageName(),
    },
  },
  plugins: [dts({ rollupTypes: true, include: ["src"] })],
});

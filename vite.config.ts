import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: ".",
  resolve: {
    alias: {
      hooks: path.resolve(__dirname, "src/hooks"),
      components: path.resolve(__dirname, "src/components"),
      context: path.resolve(__dirname, "src/context"),
      services: path.resolve(__dirname, "src/services"),
      utils: path.resolve(__dirname, "src/utils"),
      common: path.resolve(__dirname, "src/common"),
      pages: path.resolve(__dirname, "src/pages"),
      providers: path.resolve(__dirname, "src/providers"),
    },
  },
});

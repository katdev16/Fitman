import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";



// import path from "path";  // Don't forget to import the 'path' module
import { fileURLToPath } from "url";

// Create __dirname manually for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Debugging logs to see resolved paths
console.log("--------------------------");
console.log("Resolved __dirname:", __dirname);
console.log("--------------------------");

console.log("Resolved @shared path:", path.resolve(__dirname, "shared"));

console.log("-------test--------");
// Logging resolved paths
console.log("Resolved __dirname:", __dirname);
console.log("@ =>", path.resolve(__dirname, "client", "src"));
console.log("@shared =>", path.resolve(__dirname, "shared"));
console.log("@assets =>", path.resolve(__dirname, "attached_assets"));
console.log("-------test--------");


export default defineConfig({
  
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
});

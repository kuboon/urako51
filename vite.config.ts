import { defineConfig } from "vite";
import { fresh } from "@fresh/plugin-vite";
import tailwindcss from "@tailwindcss/vite";
import "@std/dotenv/load";

export default defineConfig({
  plugins: [
    fresh(),
    tailwindcss(),
  ],
});

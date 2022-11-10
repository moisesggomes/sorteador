import { defineConfig } from 'vite';
import fs from "fs";

const file = await fs.promises.readFile("./index.html");

export default defineConfig({
  test: {
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        html: file
      }
    },
    globals: true
  },
});

/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    port: 8080,
  },
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
  ],
});

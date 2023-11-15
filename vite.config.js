import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({

  server: {
    port: 3000,
  },

  appType: 'spa',
  base: '/',
  root: resolve(__dirname, 'src'),

  assetsInclude: ['**/*.hbs'],

  build: {

    outDir: resolve(__dirname, 'dist'),

    rollupOptions: {
      input: {
        index: 'src/index.html',
      },
    },

  },

  plugins: [
    handlebars(),
  ],

});

import {defineConfig} from 'vite';

export default defineConfig({
  base: '/daily-schedule/',
  build: {
    modulePreload: {
      polyfill: false
    },

    rollupOptions: {
      input: {
        index: 'index.html',
        _generate: '_generate.html',
      },
      output: {
        dir: 'dist',
        assetFileNames: '[name]-[hash][extname]',
        chunkFileNames: '[name]-[hash][extname]',
        entryFileNames: '[name]-[hash].js'
      },
    },
  },
});

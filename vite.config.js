import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    base: '/tools/print-schedule/',
    build: {
        polyfillModulePreload: false,

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
})

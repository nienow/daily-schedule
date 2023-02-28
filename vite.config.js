import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    base: '',
    build: {
        polyfillModulePreload: false,

        rollupOptions: {
            input: {
                index: 'index.html',
                generate: 'generate.html',
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

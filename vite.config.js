import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        polyfillModulePreload: false,

        rollupOptions: {
            input: {
                index: 'index.html',
                generate: 'generate.html',
            },
            output: {
                dir: 'dist'
            }
        },
    },
})

import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import externalGlobals from "rollup-plugin-external-globals";

// https://vitejs.dev/config/


export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        rollupOptions: {
            external: ['Vue', 'Pinia', 'VueRouter','axios','moment'],
            plugins:[externalGlobals({
                'vue': "Vue",
                'pinia': "Pinia",
                'vue-router': "VueRouter",
                'axios':'axios',
                'moment':'moment'
            })]
        }
    }
})

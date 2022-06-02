import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import commonjs from "rollup-plugin-commonjs";
import externalGlobals from "rollup-plugin-external-globals";

// https://vitejs.dev/config/

const globals = externalGlobals({
    'vue': "Vue",
    'pinia': "Pinia",
    'vue-router': "VueRouter",
    'Axios':'Axios',
    'Moment':'Moment'
})
const plugins = process.env.NODE_ENV === 'production' ? [] : [commonjs(), globals]


export default defineConfig({
    plugins: [vue(),...plugins],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        rollupOptions: {
            external: ['Vue', 'Pinia', 'VueRouter','Axios','Moment'],
            plugins:[...plugins]
        }
    }
})

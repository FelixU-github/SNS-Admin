import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'

import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueSetupExtend(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    port:8888,
    proxy:{
      '/tag':{
        target:'http://192.168.107.60:8081',//实际发送请求的地址
        changeOrigin:true,
        rewrite: path => path.replace(/^\/tag/,'')
      }
    }
  }


})

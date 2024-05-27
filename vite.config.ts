import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import vueSetUp from 'vite-plugin-vue-setup-extend'
import ElementPlus from 'unplugin-element-plus/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
export default defineConfig({
  plugins: [
    vue(),
    ElementPlus({}),
    vueSetUp(),
    Components({
      // 不生成类型声明文件
      dts: false,
      resolvers: [
        // 二选一
        ElementPlusResolver(),
      ],
    }),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
      ],
    }),
  ],
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

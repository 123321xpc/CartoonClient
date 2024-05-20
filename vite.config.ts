import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueSetUp from 'vite-plugin-vue-setup-extend'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueSetUp(),
    Components({
      // 不生成类型声明文件
      dts: false,
      resolvers: [
        // 二选一
        ElementPlusResolver()
      ],
    })
  ],
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

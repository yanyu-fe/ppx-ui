import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
export default defineConfig({
  resolve:{
    alias:{
      'pui':resolve(__dirname,'components')
    }
  },
  build:{
    rollupOptions:{
      external:['vue'],
      output:{
        globals:{
          vue:'vue'
        },
        exports:"named"
      }
    },
    lib:{
      entry: 'index.ts',
      name: 'pui-vue',
      fileName: 'pui-vue',
      formats: ['es', 'umd']
    }
  },
  plugins: [
    vue({
      include:/\.(vue|md)$/
    }),
    vueJsx({
      include:/\.(tsx|jsx|md)$/
    }),
  ]
})

import { defineConfig } from "vitepress"
import { vitePluginVitepressDemo } from "vite-plugin-vitepress-demo"
export default defineConfig({
    vite:{
        plugins:[
           vitePluginVitepressDemo()
        ]
    }
})

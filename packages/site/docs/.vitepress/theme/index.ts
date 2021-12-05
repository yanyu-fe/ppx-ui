import DemoBlock from "vite-plugin-vitepress-demo/dist/demo/index.vue"
import ThemeDefault from "vitepress/dist/client/theme-default"
import "vite-plugin-vitepress-demo/dist/demo/code.css"
import { Theme } from "vitepress";
import Tree from "@pui-vue/ui/dist/es/tree";
export default {
    ...ThemeDefault,
    enhanceApp({app}){
        app.component('demo',DemoBlock);
        app.use(Tree)
    }
} as Theme

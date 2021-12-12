import ThemeDefault from "../../../theme-dumi"
import DemoBlock from "vite-plugin-vitepress-demo/dist/demo/index.vue"
import "vite-plugin-vitepress-demo/dist/demo/demo.css"
import { Theme } from "vitepress";
export default {
    ...ThemeDefault,
    enhanceApp({app}){
        app.component('demo',DemoBlock);
    }
} as Theme

import DemoBlock from "vite-plugin-vitepress-demo/dist/demo/index.vue"
import ThemeDefault from "../../../theme-dumi"
import { Theme } from "vitepress";
import "./demo.css"
export default {
    ...ThemeDefault,
    enhanceApp({app}){
        app.component('demo',DemoBlock);
    }
} as Theme

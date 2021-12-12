import { defineConfig } from "vitepress"
import nav from "./nav";
import siderBar from "./siderBar";
export default defineConfig({
    themeConfig:{
        darkMode:true,
        algolia:true,
        nav:nav,
        sidebar:siderBar
    }
})

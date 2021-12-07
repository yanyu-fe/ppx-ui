import {vitePluginVitepressDemo} from "vite-plugin-vitepress-demo";
import Component from "unplugin-vue-components/vite";
import {NaiveUiResolver} from "unplugin-vue-components/resolvers";

export default {
    plugins:[
        vitePluginVitepressDemo(),
        Component({
            resolvers:[
                NaiveUiResolver(),
                {
                    type:"component",
                    resolve:(name:string)=>{
                        if (name.match(/^P[A-Z]/)){
                            return {
                                importName:name,
                                path:`@pui-vue/ui/dist/es/${name.slice(1).toLocaleLowerCase()}`,
                                sideEffects:`@pui-vue/ui/dist/es/${name.slice(1).toLocaleLowerCase()}/style.css`
                            }
                        }
                    }
                }
            ]
        })
    ]
}

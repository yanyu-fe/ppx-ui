import { resolve } from "path";
import type { InlineConfig } from "vite";
import { build } from "vite"
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { lstatSync, readdirSync } from "fs";
import type { RollupOptions } from "rollup"
const entry = resolve(__dirname,"../pui");
const outDir = resolve(__dirname,"../dist");

const baseConfig:InlineConfig = {
    configFile:false,
    publicDir:false,
    plugins:[
        vue(),
        vueJsx()
    ]
}

const rollupOptions:RollupOptions = {
    external:['vue'],
    output:{
        exports:"named",
        globals:{
            vue:'vue'
        }
    }
}

const buildSingle = async (name:string) =>{
    await build({
        ...baseConfig,
        build:{
            rollupOptions,
            lib:{
                name:"index",
                fileName:()=>`index.js`,
                entry:resolve(entry,name),
                formats:['es']
            },
            outDir:resolve(outDir,`es/${name}`)
        }
    })
    await build({
        ...baseConfig,
        build:{
            rollupOptions,
            lib:{
                name:"index",
                fileName:()=>`index.js`,
                entry:resolve(entry,name),
                formats:['umd']
            },
            outDir:resolve(outDir,`umd/${name}`)
        }
    })
}

const buildAll = async () => {
    await build({
        ...baseConfig,
        build:{
            rollupOptions,
            lib:{
                entry: resolve(entry,"index.ts"),
                name:"pui",
                fileName:"pui",
                formats:['es','umd']
            },
            outDir
        }
    })
}

const buildComp = async () => {
    await buildAll();
    const components = readdirSync(entry).filter(name => {
        const componentDir = resolve(entry,name);
        const isDir = lstatSync(componentDir).isDirectory();
        return isDir && readdirSync(componentDir).includes("index.ts");
    })

    for (const component of components) {
        await buildSingle(component);
    }
}

buildComp().then(() => {
    // eslint-disable-next-line no-console
    console.log("打包完成")
});

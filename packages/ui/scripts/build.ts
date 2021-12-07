import { resolve } from "path";
import type { InlineConfig } from "vite";
import { build } from "vite"
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { lstatSync, readdirSync } from "fs";
import type { RollupOptions } from "rollup";
import typescript from "@rollup/plugin-typescript";
const entry = resolve(__dirname,"../pui");
const outDir = resolve(__dirname,"../dist");

const baseConfig:InlineConfig = {
    configFile:false,
    publicDir:false,
}

const basePlugins = [
    vue(),
    vueJsx()
]

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
        },
        plugins:[
            ...basePlugins,
            typescript({
                lib:["esnext","dom"],
                include:[`pui/${name}/**/*.ts`,`pui/${name}/**/*.tsx`],
                target:"esnext",
                // outDir: resolve(outDir,`es/${name}`),
                declarationDir:resolve(outDir,`es/${name}`),
                emitDeclarationOnly:true,
                declaration:true,
                jsx:"preserve"
            })
        ]
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
        },
        plugins:[
            ...basePlugins,
            typescript({
                lib: ["esnext","dom"],
                include: [`pui/${name}/**/*.ts`,`pui/${name}/**/*.tsx`],
                target: "esnext",
                outDir: resolve(outDir,`umd/${name}`),
                declarationDir: resolve(outDir,`umd/${name}`),
                declaration:true,
                emitDeclarationOnly:true,
                jsx:"preserve"
            })
        ]
    })
}

const buildAll = async () => {
    await build({
        ...baseConfig,
        build:{
            rollupOptions,
            lib:{
                entry: resolve(entry,"index.ts"),
                name:"index",
                fileName:()=>'index.js',
                formats:['es']
            },
            outDir:resolve(outDir,'es')
        },
        plugins:[
            ...basePlugins,
            typescript({
                lib:["esnext","dom"],
                include:["pui/index.ts"],
                target:"esnext",
                outDir:resolve(outDir,'es'),
                declarationDir:resolve(outDir,'es'),
                declaration:true,
                emitDeclarationOnly:true,
            })
        ]
    })
    await build({
        ...baseConfig,
        build:{
            rollupOptions,
            lib:{
                entry: resolve(entry,"index.ts"),
                name:"index",
                fileName:()=>'index.js',
                formats:['umd']
            },
            outDir:resolve(outDir,'umd')
        },
        plugins:[
            ...basePlugins,
            typescript({
                lib:["esnext","dom"],
                include:["pui/index.ts"],
                target:"esnext",
                outDir:resolve(outDir,'umd'),
                declarationDir:resolve(outDir,'umd'),
                declaration:true,
                emitDeclarationOnly:true,
            })
        ]
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

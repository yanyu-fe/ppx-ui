import json from "@rollup/plugin-json"
import typescript from "rollup-plugin-typescript2";
import { cleandir } from "rollup-plugin-cleandir";
import {nodeResolve} from "@rollup/plugin-node-resolve";
import { defineConfig } from "rollup"
const extensions = ['.js','.ts'];
export default defineConfig({
    input:[
        "./lib/index.ts"
    ],
    output:[
        {
            dir:"./dist/esm",
            format:"esm"
        },
        {
            dir:"./dist/cjs",
            format:"cjs"
        }
    ],
    external:[
        'process',
        'commander',
        'prompts',
        'fs-extra',
        'path',
        'lodash'
    ],
    plugins:[
        cleandir("./dist"),
        typescript({
            tsconfigOverride:{
                compilerOptions:{
                    module:"ESNext"
                }
            }
        }),
        nodeResolve({
            extensions,
            modulesOnly:true,
            preferBuiltins:false
        }),
        json({
            compact:true
        })
    ]
})

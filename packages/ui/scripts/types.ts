import { resolve } from "path"
import { outputFileSync, readdirSync, lstatSync, copyFile } from "fs-extra"

const entry = resolve(__dirname,"../pui");
const outDir = resolve(__dirname,"../dist");
function generateIndexDts(buildDir) {
    const fileStr = `import type { App } from 'vue';
declare function install(app: App): void
declare const _default: {
   install: typeof install;
   // version: string;
};
export default _default;`
    outputFileSync(resolve(buildDir, 'index.d.ts'), fileStr, 'utf-8')
}

const generateDts = () => {
    generateIndexDts(outDir)
    const components = readdirSync(entry).filter(name => {
        const componentDir = resolve(entry, name)
        const isDir = lstatSync(componentDir).isDirectory()
        return isDir && readdirSync(componentDir).includes('index.ts')
    })
    const srcDts = resolve(outDir, 'index.d.ts')

    for(const name of components) {
        const destDtsES = resolve(outDir, `/es/${name}/index.d.ts`)
        const destDtsUMD = resolve(outDir, `/es/${name}/index.d.ts`)
        copyFile(srcDts, destDtsES, (err) => {
            if (err) {
                console.error(`拷贝组件${name}的ts类型文件失败！`)
            }
        })
        copyFile(srcDts, destDtsUMD, (err) => {
            if (err) {
                console.error(`拷贝组件${name}的ts类型文件失败！`)
            }
        })
    }
}

generateDts();

import prompts from "prompts"
import { resolve,join } from "path"
import { readdirSync,mkdirSync,ensureDirSync,writeFileSync,existsSync } from "fs-extra"
import {createIndexTemplate, createComponentTemplate, createTypesTemplate, createStyleTemplate} from "./component"

export interface InitOption{
    type?:string
    name?:string
    needClear?:boolean
}

const cwdDir = process.cwd();

const createOption:InitOption = {};

/**
 * 项目信息
 */
const projectName:Record<string, string> = {
    'component':'组件',
    'project':'项目'
};

/**
 * 初始化数据
 */
export default async () => {

    // 1.选择需要创建的项目
    createOption.type = await selectProject();
    // 2.输入项目名称
    createOption.name = await inputProjectName();
    // 3. 检测当前的文件夹是否存在
    await checkDirIsExist();
    // 4.创建项目
    await createProject();
    console.log(createOption);
}

/**
 * 取消
 */
const onCancel = () =>{
    console.log("终止当前操作")
    process.exit();
}

/**
 *
 */
const checkDirIsExist = async () => {
    const resolveDir = resolve(cwdDir,createOption.name);
    const question:prompts.PromptObject = {
        type:'confirm',
        message:'当前文件夹已存在，请确认是否需要清空当前文件夹?',
        name:'needClear'
    }
    if (existsSync(resolveDir)){
        // 当前文件夹存在
        const files = readdirSync(resolveDir);
        if (files && files.length > 0){
            // 存在文件
            const answer = await prompts(question,{onCancel})
            if (answer && answer.needClear){
                // 记录表标识
                createOption.needClear = answer.needClear;
            }
        }
    }
}

/**
 * 选择需要创建的项目文件夹
 */
const selectProject = async ():Promise<string> => {
    // 选择项目
    const question:prompts.PromptObject = {
        type:"select",
        choices:[
            {title:"组件",value:"component",description:"创建一个组件"},
            // {title:"项目",value:"project",description:"创建一个项目"}
        ],
        name:"projectType",
        message:"请选择要创建项目的类型："
    }
    // 初始化一个项目
    const answer = await prompts(question,{
        onCancel
    })
    if (answer && answer.projectType){
        // 这里是存在的，返回创建的类型
        return answer.projectType.trim()
    }else {
        onCancel();
    }
}

/**
 * 输入组件的名称
 */
const inputProjectName = async ():Promise<string> => {
    const pat = /^[a-zA-Z]([\w-\d]*)$/;
    const question:prompts.PromptObject = {
        type:"text",
        name:"name",
        message:`请输入${projectName[createOption.type]}的名称：`,
        validate: value =>pat.test(value) ? true :`${projectName[createOption.type]}名称格式不正确，请重新输入`
    }
    const answer = await prompts(question,{onCancel})
    if (answer && answer.name){
        return answer.name.trim();
    }else {
        onCancel();
    }
}

/**
 * 创建项目
 */
const createProject = async ():Promise<void> => {
    // 1.获取文件夹路径地址
    const resolveDir = resolve(cwdDir,createOption.name);
    // 2.判断当前是否需要对文件夹做清空的准备
    if (existsSync(resolveDir)){
        if (createOption.needClear){
            // 需要清空文件夹
            ensureDirSync(resolveDir);
        }
    }else {
        // 需要创建文件夹
        mkdirSync(resolveDir);
    }
    mkdirSync(resolve(resolveDir,'styles'))
    // 开始导入文件
    const typesTemplate = new Uint8Array(Buffer.from( createTypesTemplate(createOption.name)));
    const componentTemplate = new Uint8Array(Buffer.from(createComponentTemplate({
        componentName:createOption.name,
        styleName:createOption.name,
        typesName:`${createOption.name}-types`
    })))
    const indexTemplate = new Uint8Array(Buffer.from(createIndexTemplate({componentName:createOption.name})))
    const styleTemplate = new Uint8Array(Buffer.from(createStyleTemplate({componentName:createOption.name})))
    writeFileSync(join(resolveDir,`${createOption.name}-types.ts`),typesTemplate,{encoding:'utf-8'});
    writeFileSync(join(resolveDir,`index.ts`),indexTemplate,{encoding:'utf-8'});
    writeFileSync(join(resolveDir,`${createOption.name}.tsx`),componentTemplate,{encoding:'utf-8'});
    writeFileSync(join(resolveDir,`styles/${createOption.name}.less`),styleTemplate,{encoding:'utf-8'});
    console.log("完成");
}

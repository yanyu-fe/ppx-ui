import * as process from "process";
import { Command } from "commander"
import pkg  from "../package.json"
import init from "./init"

// 创建一个commander实例
const program = new Command('pui');

program
    .usage('<cammond> [options]')
    .version(pkg.version);


program
    .command('init')
    .description("初始化一个项目或组件")
    .action(init)

program.parse(process.argv);



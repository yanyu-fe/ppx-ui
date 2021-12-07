import { camelCase } from "lodash"
import { bigCamelCase } from "./utils";
import {PUI_CLASS_PREFIX, PUI_PREFIX} from "./constant";

export const createTypesTemplate = (componentName:string) => `
import type { PropType, ExtractPropTypes } from 'vue'

export const ${camelCase(componentName)}Props = {
  /* test: {
    type: Object as PropType<{ xxx: xxx }>
  } */
} as const

export type ${bigCamelCase(componentName)}Props = ExtractPropTypes<typeof ${camelCase(componentName)}Props>
`

// 创建组件模板
export const createComponentTemplate = ({componentName,styleName,typesName}) => `
import { defineComponent } from 'vue'
import { ${camelCase(componentName)}Props } from './${typesName}'
import type { ${bigCamelCase(componentName)}Props } from './${typesName}'
import './styles/${styleName}.less'

export default defineComponent({
  name: '${bigCamelCase(PUI_PREFIX)}${bigCamelCase(componentName)}',
  props: ${camelCase(componentName)}Props,
  emits: [],
  setup(props: ${bigCamelCase(componentName)}Props, ctx) {
    return () => {
      return (<div class="${PUI_CLASS_PREFIX}-${componentName}"></div>)
    }
  }
})
`

// 创建index模板
export const createIndexTemplate = ({componentName})=>`
import type { App } from "vue";
import ${PUI_PREFIX}${bigCamelCase(componentName)} from "./${componentName}"

${PUI_PREFIX}${bigCamelCase(componentName)}.install = function(app:App) {
  app.component(${PUI_PREFIX}${bigCamelCase(componentName)}.name,${PUI_PREFIX}${bigCamelCase(componentName)});
}

export { ${PUI_PREFIX}${bigCamelCase(componentName)} };

export default {
  install(app:App):void{
    app.use(${PUI_PREFIX}${bigCamelCase(componentName)} as any);
  }
}
`

export const createStyleTemplate = ({componentName}) =>{
    return `
    .${PUI_CLASS_PREFIX}-${componentName}{
        // less样式使用
    }
    `;
}

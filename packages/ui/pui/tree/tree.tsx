import { defineComponent } from 'vue';
import { TreeProps,treeProps } from './tree-types'
import "./styles/tree.less"

export default defineComponent({
  name:'PTree',
  props:treeProps,
  emits:[],
  setup(props,{emit}){

    return () => {
      return (
        <>
          <div class="pui-tree">测试</div>
        </>
      )
    }
  }
})

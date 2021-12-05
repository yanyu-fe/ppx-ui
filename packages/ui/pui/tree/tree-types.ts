import type { ExtractPropTypes, PropType } from 'vue';

export interface TreeItem{
  id:string
  label:string
  children:TreeData
  [key:string]:any
}

export type TreeData = Array<TreeItem>;

export const treeProps = {
  sourceData:{
    type:Array as PropType<TreeData>,
    required:true
  }
}

export type TreeProps = ExtractPropTypes<typeof treeProps>;



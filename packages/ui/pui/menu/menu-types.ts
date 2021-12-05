
import type { PropType, ExtractPropTypes } from 'vue'

export const menuProps = {
  /* test: {
    type: Object as PropType<{ xxx: xxx }>
  } */
} as const

export type MenuProps = ExtractPropTypes<typeof menuProps>

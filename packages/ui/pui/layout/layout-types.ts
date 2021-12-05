
import type { PropType, ExtractPropTypes } from 'vue'

export const layoutProps = {
  /* test: {
    type: Object as PropType<{ xxx: xxx }>
  } */
} as const

export type LayoutProps = ExtractPropTypes<typeof layoutProps>

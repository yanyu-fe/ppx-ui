
import type { PropType, ExtractPropTypes } from 'vue'

export const affixProps = {
  /* test: {
    type: Object as PropType<{ xxx: xxx }>
  } */
} as const

export type AffixProps = ExtractPropTypes<typeof affixProps>

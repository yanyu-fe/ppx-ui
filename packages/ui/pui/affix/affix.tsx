
import { defineComponent } from 'vue'
import type { AffixProps } from './affix-types';
import { affixProps } from './affix-types'
import './styles/affix.less'

export default defineComponent({
  name: 'PAffix',
  props: affixProps,
  emits: [],
  setup(props: AffixProps, ctx) {
    return () => {
      return (<div class="p-affix"></div>)
    }
  }
})

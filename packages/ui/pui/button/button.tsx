
import { defineComponent } from 'vue'
import type { ButtonProps } from './button-types';
import { buttonProps } from './button-types'
import './styles/button.less'

export default defineComponent({
  name: 'PButton',
  props: buttonProps,
  emits: [],
  setup(props: ButtonProps, ctx) {
    return () => {
      return (<div class="p-button"></div>)
    }
  }
})

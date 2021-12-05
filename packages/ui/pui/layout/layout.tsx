
import { defineComponent } from 'vue'
import { layoutProps, LayoutProps } from './layout-types'
import './styles/layout.less'

export default defineComponent({
  name: 'PLayout',
  props: layoutProps,
  emits: [],
  setup(props: LayoutProps, ctx) {
    return () => {
      return (<div class="pui-layout"></div>)
    }
  }
})

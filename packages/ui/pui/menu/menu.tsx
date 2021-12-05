
import { defineComponent } from 'vue'
import { menuProps } from './menu-types'
import type { MenuProps } from './menu-types'
import './styles/menu.less'

export default defineComponent({
  name: 'PMenu',
  props: menuProps,
  emits: [],
  setup(props: MenuProps, ctx) {
    return () => {
      return (<div class="pui-menu">菜单</div>)
    }
  }
})

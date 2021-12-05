
import type { App } from "vue";
import Menu from "./menu"

Menu.install = function(app:App) {
  app.component(Menu.name,Menu);
}

export { Menu };

export default {
  install(app:App):void{
    app.use(Menu as any);
  }
}

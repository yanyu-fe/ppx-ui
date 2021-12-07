import type { App } from "vue";
import PMenu from "./menu"

PMenu.install = function(app:App) {
  app.component(PMenu.name,PMenu);
}

export { PMenu };

export default {
  install(app:App):void{
    app.use(PMenu as any);
  }
}

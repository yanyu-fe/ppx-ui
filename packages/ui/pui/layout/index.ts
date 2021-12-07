
import type { App } from "vue";
import PLayout from "./layout"

PLayout.install = function(app:App) {
  app.component(PLayout.name,PLayout);
}

export { PLayout };

export default {
  install(app:App):void{
    app.use(PLayout as any);
  }
}

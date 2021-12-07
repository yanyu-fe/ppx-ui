
import type { App } from "vue";
import PButton from "./button"

PButton.install = function(app:App) {
  app.component(PButton.name,PButton);
}

export { PButton };

export default {
  install(app:App):void{
    app.use(PButton as any);
  }
}

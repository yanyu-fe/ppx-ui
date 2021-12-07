
import type { App } from "vue";
import PAffix from "./affix"

PAffix.install = function(app:App) {
  app.component(PAffix.name,PAffix);
}

export { PAffix };

export default {
  install(app:App):void{
    app.use(PAffix as any);
  }
}

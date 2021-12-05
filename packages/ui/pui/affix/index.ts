
import type { App } from "vue";
import Affix from "./affix"

Affix.install = function(app:App) {
  app.component(Affix.name,Affix);
}

export { Affix };

export default {
  install(app:App):void{
    app.use(Affix as any);
  }
}

import type { App } from "vue";
import PTree from "./tree"

PTree.install = function(app:App) {
  app.component(PTree.name,PTree);
}

export { PTree };

export default {
  install(app:App):void{
    app.use(PTree as any);
  }
}

import type { App } from "vue";
import Tree from "./tree"

Tree.install = function(app:App) {
  app.component(Tree.name,Tree);
}

export { Tree };

export default {
  install(app:App):void{
    app.use(Tree as any);
  }
}

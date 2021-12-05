
import type { App } from "vue";
import Layout from "./layout"

Layout.install = function(app:App) {
  app.component(Layout.name,Layout);
}

export { Layout };

export default {
  install(app:App):void{
    app.use(Layout as any);
  }
}

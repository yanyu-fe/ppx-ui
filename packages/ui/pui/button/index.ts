
import type { App } from "vue";
import Button from "./button"

Button.install = function(app:App) {
  app.component(Button.name,Button);
}

export { Button };

export default {
  install(app:App):void{
    app.use(Button as any);
  }
}

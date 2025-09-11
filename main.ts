import { App, staticFiles, trailingSlashes } from "fresh";

export const app = new App()
  .use(staticFiles())
  .fsRoutes()
  .use(trailingSlashes("never"));

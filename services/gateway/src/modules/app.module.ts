import { createApplication } from "graphql-modules";
import { CurrencyModule } from "./currency";

export const appModule = createApplication({
  modules: [CurrencyModule],
  providers: [],
});

const subscribe = appModule.createSubscription();

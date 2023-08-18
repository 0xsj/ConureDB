import "graphql-import-node";
import { createModule } from "graphql-modules";
import { CurrencyProvider } from "./currency.provider";
import * as typeDefs from "./currency.graphql";

const resolvers = {
  Query: {
    getCurrencies: async (_: any, __: any, { injector }: any) => {
      return injector.get(CurrencyProvider).getCurrencies();
    },
    convertCurrency: async (_: any, { from, toCode }: any, { injector }: any) => {
      return injector.get(CurrencyProvider).convertCurrency(from, toCode);
    },
  },
};

export const CurrencyModule = createModule({
  id: "currency",
  typeDefs,
  resolvers,
  providers: [CurrencyProvider],
});

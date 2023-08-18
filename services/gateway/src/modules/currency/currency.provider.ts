import GRPCDataSource from "apollo-datasource-grpc";
import { Injectable, Provider, Scope } from "graphql-modules";
import * as grpc from "@grpc/grpc-js";
import * as protoloader from "@grpc/proto-loader";

const port = 7000;

const packageDefinitions: any = protoloader.loadSync(`${__dirname}/../../../proto/currency.proto`, {
  longs: Number,
});
const currencyService: any = grpc.loadPackageDefinition(packageDefinitions).remarkableApp;
const client = new currencyService.CurrencyService(
  "localhost:7000",
  grpc.credentials.createInsecure()
);

@Injectable()
export class CurrencyProvider extends GRPCDataSource {
  constructor() {
    super();
    this.client = client;
  }

  async getCurrencies() {
    const meta = new grpc.Metadata();
    const response = await this.callRPC(0, { args: {}, meta, rpcName: "GetRate" });
    return response;
  }
}

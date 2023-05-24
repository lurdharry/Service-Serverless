import { handlerPath } from "@libs/handler-resolver";
import { AWS } from "@serverless/typescript";
import schema from "./schema";

export interface Myself {
  name: string;
  age: number;
}




const config: AWS["functions"][number] = {
  handler: `${handlerPath(__dirname)}/handler.handler`,
  events: [
    {
      http: {
        method: "post",
        path: "addTodo",
        request: {
          schemas: {
            "application/json": schema,
          },
        },
        cors: {
          headers: ["Content-Type"],
        },
      },
    },
  ],
};

export default config;

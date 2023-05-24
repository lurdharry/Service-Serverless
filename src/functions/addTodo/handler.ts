import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { PutItemInput, DynamoDB } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";

import schema from "./schema";
import { responseHandler } from "@helper/responseHandler";

export const TABLE_NAME = "TodoTable";

const addTodo: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  console.log({ hhhhh: event.headers });
  const createdAt = new Date();
  const id = uuidv4();

  const { todo } = event.body;

  const newTodo: Record<string, any> = {
    id,
    todo,
    createdAt,
    completed: false,
  };
  const dynamoDB = new DynamoDB({});

  const input: PutItemInput = {
    TableName: TABLE_NAME,
    Item: newTodo,
  };

  try {
    await dynamoDB.putItem(input);
    return responseHandler({ message: "Item Added Successfully" });
  } catch (error) {

    return responseHandler({ message: "Error Adding Item" }, 401);
  } finally {
    dynamoDB.destroy();
  }
};

export const handler = addTodo

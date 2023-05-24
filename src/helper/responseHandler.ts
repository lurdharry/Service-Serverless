export function responseHandler(body, statusCode = 200) {
  return {
    body: JSON.stringify({ error: statusCode >= 400, ...body, statusCode }),
    statusCode,
  };
}

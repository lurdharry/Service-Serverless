export default {
  type: "object",
  properties: {
    todo: { type: "string" },
  },
  required: ["todo"],
} as const;

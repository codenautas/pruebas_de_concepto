// source https://github.com/Microsoft/TypeScript/issues/8237#issuecomment-213064717

/// file: my-aws-sdk.d.ts
export * from "aws-sdk"
export as namespace AWS;


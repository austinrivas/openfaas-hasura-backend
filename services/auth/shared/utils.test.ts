//#region std imports
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
//#endregion std imports

//#region local imports
import { createMockRequest, createTestHandler } from "./testing.ts";
import { parseRequestBody } from "./utils.ts";
//#endregion local imports

const test = createTestHandler("utils");

type MockNested = {
  "a": number;
  "b": string;
  "c": boolean;
};

type MockRequestBody = {
  "mock-number": number;
  "mock-string": string;
  "mock-bool": boolean;
  "mock-nested": MockNested;
};

const mockRequestBody: MockRequestBody = {
  "mock-number": 12345,
  "mock-string": "dummy string",
  "mock-bool": true,
  "mock-nested": {
    "a": 1,
    "b": "bee",
    "c": false,
  },
};

test("request body parser returns json body", async () => {
  const req = createMockRequest(mockRequestBody);
  const reqBody = await parseRequestBody<MockRequestBody>(req.body);
  assertEquals(mockRequestBody, reqBody);
});

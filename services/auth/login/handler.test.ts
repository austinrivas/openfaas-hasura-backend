//#region test imports
import { assert, assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { mockRequestBody, mockResponse } from "./mod.test.ts";
import {
  createTestHandler,
  createMockRequest,
} from "./shared/testing.ts";
//#endregion testing imports

//#region local imports
import handler from "./handler.ts";
//#endregion local imports

// inspired by https://github.com/denoland/deno/blob/master/std/http/server_test.ts

const test = createTestHandler("auth-login");

test("handler exists", () => {
  assert(handler);
});

test("end to end", async () => {
  const req = createMockRequest(mockRequestBody);
  const response = await handler(req);
  assertEquals(
    response.body,
    JSON.stringify(mockResponse),
  );
});

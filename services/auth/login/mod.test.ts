//#region std imports
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
//#endregion std imports

//#region shared imports
import { createTestHandler } from "./shared/testing.ts";
//#endregion shared imports

//#region local imports
import {
  AuthLoginOutput,
  AuthLoginRequestBody,
  authLoginHandler,
} from "./mod.ts";
//#endregion local imports

const test = createTestHandler("auth-login:mod");

export const mockRequestBody = {
  "session_variables": { "x-hasura-role": "admin" },
  "input": {
    "authLoginInput": {
      "username": "austinrivas",
      "password": "password12345",
    },
  },
  "action": { "name": "authLogin" },
} as AuthLoginRequestBody;

export const mockResponse = {
  accessToken: "austinrivas-password12345-admin",
} as AuthLoginOutput;

test("successful login returns access token", async () => {
  const loginOutput = await authLoginHandler(
    mockRequestBody.input,
    mockRequestBody.session_variables,
  );
  assertEquals(
    loginOutput,
    mockResponse,
  );
});

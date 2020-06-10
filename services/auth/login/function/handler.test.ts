import { assert, assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { ServerRequest } from "https://deno.land/std/http/server.ts";
import { BufReader } from "https://deno.land/std/io/bufio.ts";
import { encode } from "https://deno.land/std/encoding/utf8.ts";
import handler, {
  AuthLoginOutput,
  AuthLoginRequestBody,
  parseRequestBody,
  authLoginHandler,
} from "./handler.ts";

// inspired by https://github.com/denoland/deno/blob/master/std/http/server_test.ts

const handlerName = "auth-login";

function name(message: string) {
  return `${handlerName}: ${message}`;
}

async function test(message: string, fn: () => void | Promise<void>) {
  Deno.test(name(message), fn);
}

const mockRequestBody = {
  "session_variables": { "x-hasura-role": "admin" },
  "input": {
    "authLoginInput": {
      "username": "austinrivas",
      "password": "password12345",
    },
  },
  "action": { "name": "authLogin" },
} as AuthLoginRequestBody;

const mockResponse = {
  accessToken: "austinrivas-password12345-admin",
} as AuthLoginOutput;

function createMockRequest(body: AuthLoginRequestBody): ServerRequest {
  const strBody = JSON.stringify(body);
  const buf = new Deno.Buffer(encode(strBody));
  const req = new ServerRequest();
  req.headers = new Headers();
  req.headers.set("content-length", buf.length.toString());
  req.r = new BufReader(buf);
  return req;
}

test("exists", () => {
  assert(handler);
});

test("request body parser returns AuthLoginRequestBody", async () => {
  const req = createMockRequest(mockRequestBody);
  const reqBody = await parseRequestBody(req.body);
  assertEquals(mockRequestBody, reqBody);
});

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

test("end to end", async () => {
  const req = createMockRequest(mockRequestBody);
  const response = await handler(req);
  assertEquals(
    response.body,
    JSON.stringify(mockResponse),
  );
});

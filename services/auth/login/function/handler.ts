import {
  Response as ServerResponse,
  ServerRequest,
} from "https://deno.land/std/http/server.ts";
import { decode } from "https://deno.land/std/encoding/utf8.ts";

export type AuthLoginOutput = {
  accessToken: string;
};

enum HasuraRole {
  admin = "admin",
}

type HasuraAction = {
  name: string;
};

type AuthLoginSessionVariables = {
  "x-hasura-role": HasuraRole;
};

type AuthLoginInput = {
  username: string;
  password: string;
};

type authLoginArgs = {
  authLoginInput: AuthLoginInput;
};

export type AuthLoginRequestBody = {
  action: HasuraAction;
  input: authLoginArgs;
  "session_variables": AuthLoginSessionVariables;
};

export async function parseRequestBody(
  body: Deno.Reader,
): Promise<AuthLoginRequestBody> {
  const buf: Uint8Array = await Deno.readAll(body);
  return JSON.parse(decode(buf));
}

export async function authLoginHandler(
  args: authLoginArgs,
  session: AuthLoginSessionVariables,
): Promise<AuthLoginOutput> {
  return {
    accessToken:
      `${args.authLoginInput.username}-${args.authLoginInput.password}-${
        session["x-hasura-role"]
      }`,
  };
}

export default async (request: ServerRequest): Promise<ServerResponse> => {
  const requestBody = await parseRequestBody(request.body);
  const loginOutput = await authLoginHandler(
    requestBody.input,
    requestBody.session_variables,
  );
  const body = JSON.stringify(loginOutput);
  return {
    body,
  } as ServerResponse;
};

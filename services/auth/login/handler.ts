//#region std imports
import {
  Response as ServerResponse,
  ServerRequest,
} from "https://deno.land/std/http/server.ts";
//#endregion std imports

//#region auth imports
import { parseRequestBody } from "./shared/utils.ts";
//#endregion auth imports

//#region local imports
import { authLoginHandler, AuthLoginRequestBody } from "./mod.ts";
//#endregion local imports

export default async (request: ServerRequest): Promise<ServerResponse> => {
  const requestBody = await parseRequestBody<AuthLoginRequestBody>(
    request.body,
  );
  const loginOutput = await authLoginHandler(
    requestBody.input,
    requestBody.session_variables,
  );
  const body = JSON.stringify(loginOutput);
  return {
    body,
  } as ServerResponse;
};

//#region auth imports
import { HasuraRole, HasuraActionRequestBody } from "./shared/types.ts";
//#endregion auth imports

export type AuthLoginOutput = {
  accessToken: string;
};

type AuthLoginSessionVariables = {
  "x-hasura-role": HasuraRole;
};

type AuthLoginInput = {
  username: string;
  password: string;
};

type AuthLoginArgs = {
  authLoginInput: AuthLoginInput;
};

export type AuthLoginRequestBody = HasuraActionRequestBody<
  AuthLoginArgs,
  AuthLoginSessionVariables
>;

export async function authLoginHandler(
  args: AuthLoginArgs,
  session: AuthLoginSessionVariables,
): Promise<AuthLoginOutput> {
  return {
    accessToken:
      `${args.authLoginInput.username}-${args.authLoginInput.password}-${
        session["x-hasura-role"]
      }`,
  };
}

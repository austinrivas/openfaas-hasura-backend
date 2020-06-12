//#region std imports
import { decode } from "https://deno.land/std/encoding/utf8.ts";
//#endregion std imports

//#region local imports
import { typeGuard } from "./typeGuard.ts";
//#endregion local imports

export async function parseRequestBody<T>(
  body: Deno.Reader,
): Promise<T> {
  const buf: Uint8Array = await Deno.readAll(body);
  const requestBody = JSON.parse(decode(buf));
  return requestBody;
}

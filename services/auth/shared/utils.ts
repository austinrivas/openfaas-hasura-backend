//#region std imports
import { decode } from "https://deno.land/std/encoding/utf8.ts";
//#endregion std imports

export async function parseRequestBody<T>(
  body: Deno.Reader,
): Promise<T> {
  const buf: Uint8Array = await Deno.readAll(body);
  return JSON.parse(decode(buf));
}

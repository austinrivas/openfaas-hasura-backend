//#region std imports
import { ServerRequest } from "https://deno.land/std/http/server.ts";
import { BufReader } from "https://deno.land/std/io/bufio.ts";
import { encode } from "https://deno.land/std/encoding/utf8.ts";
//#endregion std imports

function name(handlerName: string, message: string) {
  return `${handlerName}: ${message}`;
}

export function createTestHandler(handlerName: string) {
  return async function (message: string, fn: () => void | Promise<void>) {
    Deno.test(name(handlerName, message), fn);
  };
}

export function createMockRequest<T>(body: T): ServerRequest {
  const strBody = JSON.stringify(body);
  const buf = new Deno.Buffer(encode(strBody));
  const req = new ServerRequest();
  req.headers = new Headers();
  req.headers.set("content-length", buf.length.toString());
  req.r = new BufReader(buf);
  return req;
}

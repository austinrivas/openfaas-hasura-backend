//#region std imports
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
//#endregion std imports

//#region local imports
import { createTestHandler } from "./testing.ts";
import { typeGuard } from "./typeGuard.ts";
//#endregion local imports

const test = createTestHandler("typeGuard");

const num = 5;
const str = "hello";
const bool = true;
const obj = {
  num: num,
  str: str,
  bool: true,
};

class A {
  a: string = str;
}

class B extends A {
  b: number = num;
}

class C extends B {
  c: boolean = bool;
}

class D {
  d: string = str;
}

type DestructedOptions = {
  num: number;
  str: string;
  bool: boolean;
};

const structuredObj: DestructedOptions = {
  num: num,
  str: str,
  bool: true,
};

class Destructed {
  constructor(opts: DestructedOptions) {
    Object.assign(this, opts);
  }
}

test("guards primitive string", async () => {
  assertEquals(typeGuard(num, "number"), true);
  assertEquals(typeGuard(obj.num, "number"), true);
  assertEquals(typeGuard(new B().b, "number"), true);

  assertEquals(typeGuard(str, "number"), false);
  assertEquals(typeGuard(bool, "number"), false);
  assertEquals(typeGuard(obj, "number"), false);
  assertEquals(typeGuard(new B(), "number"), false);
  assertEquals(typeGuard(new Destructed(structuredObj), "number"), false);
});

test("guards primitive string", async () => {
  assertEquals(typeGuard(str, "string"), true);
  assertEquals(typeGuard(obj.str, "string"), true);
  assertEquals(typeGuard(new A().a, "string"), true);

  assertEquals(typeGuard(num, "string"), false);
  assertEquals(typeGuard(bool, "string"), false);
  assertEquals(typeGuard(obj, "string"), false);
  assertEquals(typeGuard(new A(), "string"), false);
  assertEquals(typeGuard(new Destructed(structuredObj), "string"), false);
});

test("guards primitive boolean", async () => {
  assertEquals(typeGuard(bool, "boolean"), true);
  assertEquals(typeGuard(obj.bool, "boolean"), true);
  assertEquals(typeGuard(new C().c, "boolean"), true);

  assertEquals(typeGuard(num, "boolean"), false);
  assertEquals(typeGuard(str, "boolean"), false);
  assertEquals(typeGuard(obj, "boolean"), false);
  assertEquals(typeGuard(new A(), "boolean"), false);
  assertEquals(typeGuard(new Destructed(structuredObj), "boolean"), false);
});

test("guards class types", async () => {
  assertEquals(typeGuard(new A(), A), true);
  assertEquals(typeGuard(new B(), A), true);
  assertEquals(typeGuard(new C(), A), true);
  assertEquals(typeGuard(new D(), A), false);
  assertEquals(typeGuard(new Destructed(structuredObj), A), false);

  assertEquals(typeGuard(new A(), B), false);
  assertEquals(typeGuard(new B(), B), true);
  assertEquals(typeGuard(new C(), B), true);
  assertEquals(typeGuard(new D(), B), false);
  assertEquals(typeGuard(new Destructed(structuredObj), B), false);

  assertEquals(typeGuard(new A(), C), false);
  assertEquals(typeGuard(new B(), C), false);
  assertEquals(typeGuard(new C(), C), true);
  assertEquals(typeGuard(new D(), C), false);
  assertEquals(typeGuard(new Destructed(structuredObj), C), false);

  assertEquals(typeGuard(new A(), D), false);
  assertEquals(typeGuard(new B(), D), false);
  assertEquals(typeGuard(new C(), D), false);
  assertEquals(typeGuard(new D(), D), true);
  assertEquals(typeGuard(new Destructed(structuredObj), D), false);

  assertEquals(typeGuard(new Destructed(structuredObj), Destructed), true);
});

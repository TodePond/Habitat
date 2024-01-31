//========//
// COLOUR //
//========//
declare type Colour = Vector3 | Vector4;

//======//
// TYPE //
//======//
declare function asConst<
  V extends Primitive,
  T extends V | Record<string, T> | [...V],
  R extends T
>(v: R): R {
  return v;
};

declare function asTuple<V extends any, T extends [...V], R extends T>(
  v: R
): R {
  return v;
};

declare type AsConst = typeof asConst;
declare type AsTuple = typeof asTuple;

//========//
// VECTOR //
//========//
declare type Vector2 = [number, number];
declare type Vector3 = [number, number, number];
declare type Vector4 = [number, number, number, number];

//========//
// COLOUR //
//========//
declare type Colour = Vector3D | Vector4D;

//======//
// HTML //
//======//

//======//
// TYPE //
//======//
declare type Primitive = string | number | boolean | null | undefined;
declare function asConstant<
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

declare type AsConstant = typeof asConstant;
declare type AsTuple = typeof asTuple;

//========//
// VECTOR //
//========//
declare type Vector2D = [number, number];
declare type Vector3D = [number, number, number];
declare type Vector4D = [number, number, number, number];

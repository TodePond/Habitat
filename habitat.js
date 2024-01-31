//=======//
// ARRAY //
//=======//
/**
 * Shuffle an array in place.
 * @template T
 * @param {T[]} array - The array to shuffle.
 * @returns {T[]}
 *
 * @example
 * shuffle([2, 3, 5]) // returns [2, 3, 5] in a random order
 */
export function shuffle(array) {
  // Go backwards through the array
  for (let i = array.length - 1; i > 0; i--) {
    // Swap each value with a random value before it (which might include itself)
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//=======//
// ASYNC //
//=======//
/**
 * Wait for a given duration.
 * @param {number} duration - The duration to wait in milliseconds.
 *
 * @example
 * await sleep(1000) // waits for 1 second
 */
export async function sleep(duration) {
  new Promise((resolve) => setTimeout(resolve, duration));
}

//========//
// COLOUR //
//========//
/**
 * Convert a colour to a hex string.
 * @param {Colour} colour - The colour to convert.
 * @returns {string}
 */
export function toHex(colour) {
  return colour
    .filter((v) => v !== undefined)
    .map((v) => v?.toString(16).padStart(2, "0"))
    .join("");
}

export const VOID = t([6, 7, 10]);
export const BLACK = t([23, 29, 40]);
export const GREY = t([55, 67, 98]);
export const SILVER = t([159, 174, 204]);
export const WHITE = t([255, 255, 255]);
export const GREEN = t([70, 255, 128]);
export const CYAN = t([70, 204, 255]);
export const BLUE = t([70, 128, 255]);
export const PURPLE = t([128, 67, 255]);
export const PINK = t([255, 128, 222]);
export const CORAL = t([255, 128, 128]);
export const RED = t([255, 67, 70]);
export const ORANGE = t([255, 128, 70]);
export const YELLOW = t([255, 255, 70]);

//=========//
// CONSOLE //
//=========//
/**
 * Print to the console.
 *
 * @example
 * print("ribbit") // prints "ribbit"
 *
 * @example
 * print("ribbit", "croak") // prints "ribbit croak"
 *
 * @example
 * print("ribbit", 3, true) // prints "ribbit 3 true"
 */
export const print = console.log.bind(console);

//======//
// TYPE //
//======//
/** @type {AsConst} */
export function c(v) {
  return v;
}

/** @type {AsTuple} */
export function t(v) {
  return v;
}

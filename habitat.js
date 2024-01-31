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

const BLUE = t([0, 0, 255, 255]);

toHex([0, 0, 255, 255]);

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

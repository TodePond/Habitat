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
export const DARK_GREY = t([31, 39, 54]);
export const GREY = t([55, 67, 98]);
export const LIGHT_GREY = t([87, 101, 147]);
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

/** All monochrome colours. */
export const SHADES = [VOID, BLACK, DARK_GREY, GREY, LIGHT_GREY, SILVER, WHITE];

/** All colourful colours. (?) */
export const HUES = [
  GREEN,
  CYAN,
  BLUE,
  PURPLE,
  PINK,
  CORAL,
  RED,
  ORANGE,
  YELLOW,
];

/** All colours. */
export const COLOURS = [...SHADES, ...HUES];

//===========//
// COMPONENT //
//===========//
/**
 * A component can attach and unattach other components.
 * It's useful for adding custom behaviour that should happen on creation and destruction.
 * For example, the EventListener component attaches event listeners on creation and removes them on destruction.
 */
export class Component {
  /**
   * A set of components attached to this component.
   * @type {Set<Component>}
   **/
  components = new Set();

  /**
   * Attach a component to this component.
   * @param {Component} component - The component to attach.
   * @returns {Component} - The attached component.
   */
  attach(component) {
    this.components.add(component);
    return component;
  }

  /**
   * Dispose of this component and all attached components.
   */
  dispose() {
    for (const component of this.components) {
      component.dispose();
    }
  }

  static EventListener = class extends Component {
    constructor(event, callback, options) {
      super();
      window.addEventListener(event, callback, options);
      this.event = event;
      this.callback = callback;
    }

    dispose() {
      window.removeEventListener(this.event, this.callback);
      super.dispose();
    }
  };
}

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
/** @type {AsConstant} */
export function c(v) {
  return v;
}

/** @type {AsTuple} */
export function t(v) {
  return v;
}

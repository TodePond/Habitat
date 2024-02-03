//=======//
// ARRAY //
//=======//
/**
 * Shuffle an array in place.
 * @template T
 * @param {T[]} array - The array to shuffle.
 * @returns {T[]}
 */
export function shuffle(array) {
  // Go backwards through the array
  // Swap each value with a random value before it (which might include itself)
  for (let i = array.length - 1; i > 0; i--) {
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
 * @param {number} duration
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

export const VOID = c([6, 7, 10]);
export const BLACK = c([23, 29, 40]);
export const DARK_GREY = c([31, 39, 54]);
export const GREY = c([55, 67, 98]);
export const LIGHT_GREY = c([87, 101, 147]);
export const SILVER = c([159, 174, 204]);
export const WHITE = c([255, 255, 255]);
export const GREEN = c([70, 255, 128]);
export const CYAN = c([70, 204, 255]);
export const BLUE = c([70, 128, 255]);
export const PURPLE = c([128, 67, 255]);
export const PINK = c([255, 128, 222]);
export const CORAL = c([255, 128, 128]);
export const RED = c([255, 67, 70]);
export const ORANGE = c([255, 128, 70]);
export const YELLOW = c([255, 255, 70]);

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

//=========//
// CONSOLE //
//=========//
/** Print to the console. */
export const print = console.log.bind(console);

/** Register the .d debugger */
export function registerDebugger() {
  Reflect.defineProperty(Object.prototype, "d", {
    get() {
      const value = this.valueOf();
      console.log(value);
      return value;
    },
    set(value) {
      Reflect.defineProperty(this, "d", {
        value,
        configurable: true,
        writable: true,
        enumerable: true,
      });
    },
    configurable: true,
    enumerable: false,
  });
}

//==========//
// DOCUMENT //
//==========//
/**
 * Select an element from the document.
 * @param {string} selector
 */
export function $(selector) {
  return document.querySelector(selector);
}

/**
 * Select all elements from the document.
 * @param {string} selector
 */
export function $$(selector) {
  return document.querySelectorAll(selector);
}

//======//
// HTML //
//======//
/**
 * Generate an element from some HTML.
 * @param {string} tag
 * @param {Object.<string, string>} attributes
 * @param {Element[]} children
 * @returns {Element}
 */
export function HTML(tag, attributes, children) {
  const element = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
  for (const child of children) {
    element.appendChild(child);
  }
  return element;
}

//============//
// JAVASCRIPT //
//============//
/**
 * Evaluate some JavaScript.
 * @param {string} source
 */
export function JS(source) {
  const func = new Function("return " + source);
  return func();
}

//======//
// LERP //
//======//
// export function lerp([start, end], distance) {
//   const range = subtract(start, end);
//   const displacement = scale(range, distance);
//   return add(start, displacement);
// }

//=============//
// LINKED LIST //
//=============//
export const LinkedList = class {
  /**
   * @param {Iterable} iterable
   */
  constructor(iterable = []) {
    this.start = undefined;
    this.end = undefined;
    this.isEmpty = true;

    for (const value of iterable) {
      this.push(value);
    }
  }

  *[Symbol.iterator]() {
    let link = this.start;
    while (link !== undefined) {
      yield link.value;
      link = link.next;
    }
  }

  toString() {
    return [...this].toString();
  }

  push(...values) {
    for (const value of values) {
      const link = makeLink(value);
      if (this.isEmpty) {
        this.start = link;
        this.end = link;
        this.isEmpty = false;
      } else {
        this.end.next = link;
        link.previous = this.end;
        this.end = link;
      }
    }
  }

  pop() {
    if (this.isEmpty) {
      return undefined;
    }

    const value = this.start.value;
    if (this.start === this.end) {
      this.clear();
      return value;
    }

    this.end = this.end.previous;
    this.end.next = undefined;
    return value;
  }

  shift() {
    if (this.isEmpty) {
      return undefined;
    }

    const value = this.start.value;
    if (this.start === this.end) {
      this.clear();
      return value;
    }

    this.start = this.start.next;
    this.start.previous = undefined;
    return value;
  }

  clear() {
    this.start = undefined;
    this.end = undefined;
    this.isEmpty = true;
  }
};

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

//========//
// VECTOR //
//========//

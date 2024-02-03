//========//
// COLOUR //
//========//
/**
 * Convert a colour to a hex string.
 * @param {[number, number, number, number?]} colour
 */
export function toHex([red, green, blue, alpha = 255]) {
  return [red, green, blue, alpha]
    .map((v) => v?.toString(16).padStart(2, "0"))
    .join("");
}

export const GREEN = [70, 255, 128];
export const CYAN = [70, 204, 255];
export const BLUE = [70, 128, 255];
export const PURPLE = [128, 67, 255];
export const PINK = [255, 128, 222];
export const CORAL = [255, 128, 128];
export const RED = [255, 67, 70];
export const ORANGE = [255, 128, 70];
export const YELLOW = [255, 255, 70];

/** All monochrome colours. */
export const SHADES = [
  [6, 7, 10], //VOID
  [14, 16, 22],
  [24, 29, 39], //BLACK
  [33, 39, 53], //DARK_GREY
  [47, 56, 75],
  [55, 67, 98], //GREY
  [87, 101, 147], //LIGHT_GREY
  [135, 146, 171],
  [159, 174, 204], //SILVER
  [224, 224, 224],
  [255, 255, 255], //WHITE
];

export const VOID = SHADES[0];
export const BLACK = SHADES[2];
export const GREY = SHADES[5];
export const SILVER = SHADES[8];
export const WHITE = SHADES[10];

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

//========//
// SIGNAL //
//========//
/**
 * @template T
 */
export class Signal {
  dependants = new Set();

  /**
   * Create a new signal.
   * @param {(previous?: T) => T|T} template
   * @param {Signal[]} dependencies
   * @param {(a: T, b: T) => boolean} equals
   */
  constructor(template, dependencies = [], equals = (a, b) => a === b) {
    this.equals = equals;
    this.dependencies = dependencies;

    for (const dependency of dependencies) {
      dependency.dependants.add(this);
    }

    if (typeof template === "function") {
      this.callback = template;
      this.value = this.callback();
    } else {
      this.value = template;
    }
  }

  update() {
    if (this.callback) {
      this.value = this.callback(this.value);
    }
    for (const dependant of this.dependants) {
      dependant.update();
    }
  }

  /**
   * @returns {T}
   */
  get() {
    return this.value;
  }

  /**
   * @param {T} value
   */
  set(value) {
    if (this.equals(this.value, value)) return;
    this.value = value;
    this.update();
  }

  dispose() {
    for (const dependency of this.dependencies) {
      dependency.dependants.delete(this);
    }
  }
}

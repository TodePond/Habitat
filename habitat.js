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

//======//
// HTML //
//======//
/**
 * Create an HTML element.
 * @param {string} tag
 * @param {Record<string, string>} attributes
 * @param {(Node | string)[]} children
 */
export function HTML(tag, attributes, children = []) {
  const element = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }

  for (const child of children) {
    element.append(child);
  }

  return element;
}

//========//
// SIGNAL //
//========//
/** @template T */
export class Signal {
  /** @type {Set<Observer>} */
  children = new Set();

  /** @param {T} value */
  constructor(value) {
    this.value = value;
  }

  /** @param {T} value */
  set(value) {
    this.value = value;
    for (const child of this.children) {
      child.update();
    }
  }

  get() {
    return this.value;
  }
}

/** @template T */
export class Observer {
  /** @type {Set<Observer>} */
  children = new Set();

  /**
   * @param {(previous: T) => T} callback
   * @param {(Signal | Observer)[]} dependencies
   */
  constructor(callback, dependencies) {
    this.callback = callback;
    this.dependencies = dependencies;
    for (const dependency of dependencies) {
      dependency.children.add(this);
    }
    this.update();
  }

  update() {
    this.value = this.callback(this.value);
    for (const child of this.children) {
      child.update();
    }
  }

  get() {
    return this.value;
  }
}

//===============//
// STATE MACHINE //
//===============//
export class StateNode {
  /** @type {StateNode | null} */
  child = null;

  /** @type {StateNode | null} */
  parent = null;

  /**
   * @param {string} name
   * @param {object} event
   */
  fire(name, event) {
    if (!this.child) {
      return this[name]?.call(this, event);
    }

    return this.child.fire(name, event);
  }

  /**
   * @param {StateNode | null} state
   */
  transition(state) {
    const previous = this.child;
    const next = state;

    if (previous === next) {
      throw new Error("Can't transition to the same state.");
    }

    if (next?.parent) {
      throw new Error("Can't transition to a state that already has a parent.");
    }

    if (next) next.parent = this;
    this.child = next;

    // Fire the exit event! If it causes a transition, stop there.
    previous?.fire("exit", { previous, next });
    if (this.child !== next) return;

    // Otherwise, carry on with the enter event!
    next?.fire("enter", { previous, next });
  }
}

//=====//
// SVG //
//=====//
/**
 * Create an SVG element.
 * @param {string} tag
 * @param {Record<string, string>} attributes
 * @param {(Node)[]} children
 */
export function SVG(tag, attributes, children = []) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
  for (const child of children) {
    element.append(child);
  }
  return element;
}

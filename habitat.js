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

/**
 * Convert a colour to a string that can be used in a shader.
 * @param {[number, number, number, number?]} colour
 */
export function toShaderVector([red, green, blue, alpha = 255]) {
  return [red, green, blue, alpha].map((v) => (v / 255).toString()).join(", ");
}

/** @type {[number, number, number]} */
export const GREEN = [70, 255, 128];
/** @type {[number, number, number]} */
export const CYAN = [70, 204, 255];
/** @type {[number, number, number]} */
export const BLUE = [70, 128, 255];
/** @type {[number, number, number]} */
export const PURPLE = [128, 67, 255];
/** @type {[number, number, number]} */
export const PINK = [255, 128, 222];
/** @type {[number, number, number]} */
export const CORAL = [255, 128, 128];
/** @type {[number, number, number]} */
export const RED = [255, 67, 70];
/** @type {[number, number, number]} */
export const ORANGE = [255, 128, 70];
/** @type {[number, number, number]} */
export const YELLOW = [255, 255, 70];

/**
 * All monochrome colours.
 * @type {[number, number, number][]}
 **/
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

export const COLOURS = [...SHADES, ...HUES];

//=========//
// CONSOLE //
//=========//
export const print = console.log.bind(console);

/**
 * Create the `d` property on all objects.
 * You can use it for quick debugging.
 */
export function registerDotDee() {
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
// DEEP MAP //
//==========//
/**
 * A map where values can be set and retrieved with an array of keys.
 * It can be more performant than combining these multiple values into a single key
 * because it avoids unnecessary checks (it bails out early when part of the key is missing).
 * @template T
 **/
export class DeepMap {
  /** @type {Map<any, T | Map>} */
  items = new Map();

  /**
   * @param {any[]} keys
   * @param {T} value
   */
  set(keys, value) {
    let map = this.items;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!map.has(key)) {
        map.set(key, new Map());
      }
      // @ts-expect-error: trust me, I just added it
      map = map.get(key);
    }
    map.set(keys[keys.length - 1], value);
  }

  /**
   * @param {any[]} keys
   */
  get(keys) {
    let map = this.items;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!map.has(key)) {
        return undefined;
      }
      // @ts-expect-error: trust me, I just checked it
      map = map.get(key);
    }
    return map.get(keys[keys.length - 1]);
  }
}

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
// OBJECT //
//========//
/**
 * Check if two objects are equal.
 * @param {object} a
 * @param {object} b
 */
export function equals(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}

//======//
// POOL //
//======//
/** @template T */
export class Pool {
  /** @param {() => T} create */
  constructor(create) {
    this.create = create;
    this.values = [];
  }

  borrow() {
    if (this.values.length === 0) {
      const value = this.create();
      this.values.push(value);
      return value;
    }

    return this.values.pop();
  }

  /** @param {T} value */
  free(value) {
    this.values.push(value);
  }
}

//=======//
// QUEUE //
//=======//
/** @template T */
export class Queue {
  /** @param {Iterable<T>} iterable */
  constructor(iterable = []) {
    this.values = [...iterable];
  }

  /** @param {T} value */
  push(value) {
    this.values.push(value);
  }

  shift() {
    return this.values.shift();
  }

  get length() {
    return this.values.length;
  }

  [Symbol.iterator]() {
    return this.values[Symbol.iterator]();
  }
}

//==========//
// REGISTER //
//==========//
/** @template T */
export class Register {
  /** @type {Map<number, T>} */
  items = new Map();

  /** @type {number[]} */
  freeKeys = [];

  /** @param {T} value */
  add(value) {
    const key = this.freeKeys.pop() ?? this.items.size;
    this.items.set(key, value);
    return key;
  }

  /** @param {number} key */
  remove(key) {
    this.items.delete(key);
    this.freeKeys.push(key);
  }

  /** @param {number} key */
  get(key) {
    return this.items.get(key);
  }

  /** @param {number} key */
  has(key) {
    return this.items.has(key);
  }

  /**
   * @param {number} key
   * @param {T} value
   */
  set(key, value) {
    this.items.set(key, value);
  }
}

//========//
// SIGNAL //
//========//
/** @template T */
export class Signal {
  /** @type {Set<Observer>} */
  children = new Set();

  /** @type {T} */
  #value;

  /** @param {T} value */
  constructor(value) {
    this.#value = value;
  }

  /** @param {T} value */
  set(value) {
    this.#value = value;
    for (const child of this.children) {
      child.update();
    }
  }

  get() {
    return this.#value;
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

/**
 * @template T
 * @param {(previous: T) => T | T} value
 * @param {(Signal | Observer)[]} dependencies
 */
export function use(value, dependencies) {
  if (typeof value === "function") {
    const callback = value;
    return new Observer(callback, dependencies);
  }

  return new Signal(value);
}

//=======//
// STACK //
//=======//
/** @template T */
export class Stack {
  /** @param {Iterable<T>} iterable */
  constructor(iterable = []) {
    this.values = [...iterable];
  }

  /** @param {T} value */
  push(value) {
    this.values.push(value);
  }

  pop() {
    return this.values.pop();
  }

  get length() {
    return this.values.length;
  }

  [Symbol.iterator]() {
    return this.values[Symbol.iterator]();
  }
}

//============//
// STATE NODE //
//============//
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

//=========//
// VECTOR2 //
//=========//
export const Vector2D = {
  /**
   * @param {[number, number]} a
   * @param {[number, number]} b
   * @returns {[number, number]}
   */
  add([ax, ay], [bx, by]) {
    return [ax + bx, ay + by];
  },

  /**
   * @param {[number, number]} a
   * @param {[number, number]} b
   * @returns {[number, number]}
   */
  subtract([ax, ay], [bx, by]) {
    return [ax - bx, ay - by];
  },

  /**
   * @param {[number, number]} a
   * @param {number} scalar
   * @returns {[number, number]}
   */
  multiply([x, y], scalar) {
    return [x * scalar, y * scalar];
  },

  /**
   * @param {[number, number]} a
   * @param {[number, number]} b
   * @returns {number}
   */
  dotProduct([ax, ay], [bx, by]) {
    return ax * bx + ay * by;
  },

  /**
   * @param {[number, number]} a
   * @param {[number, number]} b
   * @returns {number}
   */
  crossProduct([ax, ay], [bx, by]) {
    return ax * by - ay * bx;
  },

  /**
   * @param {[number, number]} a
   * @param {[number, number]} b
   * @returns {number}
   */
  distanceBetween([ax, ay], [bx, by]) {
    return Math.hypot(ax - bx, ay - by);
  },

  /**
   * @param {[number, number]} vector
   * @returns {number}
   */
  distance([x, y]) {
    return Math.hypot(x, y);
  },

  /**
   * @param {[number, number]} a
   * @param {[number, number]} b
   * @returns {number}
   */
  angleBetween([ax, ay], [bx, by]) {
    return Math.atan2(by - ay, bx - ax);
  },

  /**
   * @param {[number, number]} a
   * @param {number} angle
   * @param {[number, number]} [origin]
   * @returns {[number, number]}
   */
  rotate([x, y], angle, [ox, oy] = [0, 0]) {
    const dx = x - ox;
    const dy = y - oy;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [ox + dx * cos - dy * sin, oy + dx * sin + dy * cos];
  },

  /**
   * @param {[number, number]} vector
   * @returns {[number, number]}
   */
  normalise([x, y]) {
    const length = Math.hypot(x, y);
    return [x / length, y / length];
  },
};

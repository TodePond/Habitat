// import { Observer, Signal } from "./habitat.js";

// const firstName = new Signal("Luke");
// const lastName = new Signal("Wilson");
// const fullName = new Observer(
//   () => firstName.get() + " " + lastName.get(),
//   [firstName, lastName]
// );

// console.log(fullName.get());

// firstName.set("Lu");
// console.log(fullName.get());

// import { StateNode } from "./habitat.js";

// class Root extends StateNode {}

// class Idle extends StateNode {
//   enter() {
//     console.log("Idle: enter");
//   }
//   exit() {
//     console.log("Idle: exit");
//   }
//   pointerDown() {
//     this.parent?.transition(new Pointing());
//   }
// }

// class Pointing extends StateNode {
//   enter() {
//     console.log("Pointing: enter");
//   }
//   exit() {
//     console.log("Pointing: exit");
//   }
//   pointerUp() {
//     this.parent?.transition(new Idle());
//   }
// }

// const root = new Root();
// root.transition(new Idle());

// addEventListener("pointerdown", (e) => root.fire("pointerDown", [e]));
// addEventListener("pointerup", (e) => root.fire("pointerUp", [e]));

// import { DeepMap } from "./habitat.js";

// const map = new DeepMap();

// map.set(["a", "b"], "foo");
// // map.set(["a", "b", "c"], "bar");
// // console.log(map.get(["a", "b", "c"]));
// console.log(map.get(["a", "b"]));

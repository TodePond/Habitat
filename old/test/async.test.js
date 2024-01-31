import { sleep } from "../source/async.js"
import { assertEquals, describe, it } from "./libraries/deno-test.js"

describe("Async", () => {
	it("sleeps", async () => {
		let name = "Luke"
		setTimeout(() => {
			name = "Lu"
		}, 10)
		assertEquals(name, "Luke")
		await sleep(20)
		assertEquals(name, "Lu")
	})
})

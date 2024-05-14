import { expect, describe, it } from "vitest"
import { encode } from "../encoder"

describe("encoder.encode", () => {
  it("should return a encoded unit of type `string`", () => {
    expect(encode("string")).toBeTypeOf("string")
  })
})

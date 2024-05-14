import { expect, describe, it } from "vitest"
import { byteLength, encode } from "../encoder"

describe("[encoder] module", () => {
  const textEncoder = new TextEncoder()

  const stringOne = "Hello, World!"
  const encodedStringOne = textEncoder.encode(stringOne)
  const stringTwo = "Hello, 世界!"
  const encodedStringTwo = textEncoder.encode(stringTwo)
  const stringThree = "Hello, 🎉!"
  const encodedStringThree = textEncoder.encode(stringThree)

  it("should calculate `byteLength` correctly", () => {
    expect(byteLength(stringOne)).toBe(encodedStringOne.byteLength)
    expect(byteLength(stringTwo)).toBe(encodedStringTwo.byteLength)
    expect(byteLength(stringThree)).toBe(encodedStringThree.byteLength)
  })

  it("should encode string into Uint8Array", () => {
    expect(encode(stringOne)).toBeInstanceOf(Uint8Array)
  })

  it("should encode string", () => {
    expect(encode(stringOne)).toEqual(encodedStringOne)
    expect(encode(stringTwo)).toEqual(encodedStringTwo)
    expect(encode(stringThree)).toEqual(encodedStringThree)
  })
})

import { expect, describe, it } from "vitest"

describe("Strings", () => {
  // Most JS engines/runtimes handle strings as streams of UTF-16 encoded values
  it("should be UTF-16 encoded (internally)", () => {
    const popperEmoticon = "🎉" // requires 32 bits
    expect(popperEmoticon.length).toBe(2)
  })
})

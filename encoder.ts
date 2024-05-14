const UTFMax = 4

const byte1Max = 0x007f
const byte2Max = 0x07ff
const byte3Max = 0xffff

const surrogateRange = {
  hi: [0xd800, 0xdbff], // high surrogate area (utf-16)
  lo: [0xdc00, 0xdfff], // low surrogate area (utf-16)
}

const surrogateMin = surrogateRange.hi[0]
const surrogateMax = surrogateRange.lo[1]

const t1 = 0b00000000
const t2 = 0b11000000
const t3 = 0b11100000
const t4 = 0b11110000
const tx = 0b10000000

const maskx = 0b00111111

export const byteLength = (text: string): number => {
  const textLength = text.length
  let byteCount = 0

  for (let i = 0; i < textLength; i++) {
    let cc = text.charCodeAt(i)

    if (cc <= byte1Max) {
      byteCount++
    } else if (cc <= byte2Max) {
      byteCount += 2
    } else if (
      cc <= byte3Max &&
      // surrogate pair values fall in the same range
      // hence they must be ignored
      !(surrogateMin <= cc && cc <= surrogateMax)
    ) {
      byteCount += 3
    } else {
      i++ // increment the counter since next char is skipped (surrogate pair)
      byteCount += 4
    }
  }

  return byteCount
}

export const encode = (text: string): Uint8Array => {
  const textLength = text.length
  const byteStream = []

  for (let i = 0; i < textLength; i++) {
    let cc = text.charCodeAt(i)

    if (cc <= byte1Max) {
      // plain old ASCII
      // push into the stream as-is
      byteStream.push(t1 | cc)
    } else if (cc <= byte2Max) {
      // requires 2 bytes for encoding
      byteStream.push(t2 | ((cc >> 6) & maskx))
      byteStream.push(tx | (cc & maskx))
    } else if (cc <= byte3Max && !(surrogateMin <= cc && cc <= surrogateMax)) {
      // requires 3 bytes for encoding
      byteStream.push(t3 | (cc >> 12))
      byteStream.push(tx | ((cc >> 6) & maskx))
      byteStream.push(tx | (cc & maskx))
    } else {
      // 4-byte encoding
      // we need to handle the surrogate pair used by UTF-16 encoding;
      // we reverse engineer the UTF-16 algorithm to find the character code
      // and increment the iterator to jump ahead to new character
      i++
      let ncc = text.charCodeAt(i)
      let codePoint = 0x10000 + ((cc & 0x3ff) << 10) + (ncc & 0x3ff)

      byteStream.push(t4 | (codePoint >> 18))
      byteStream.push(tx | ((codePoint >> 12) & maskx))
      byteStream.push(tx | ((codePoint >> 6) & maskx))
      byteStream.push(tx | (codePoint & maskx))
    }
  }

  return new Uint8Array(byteStream)
}

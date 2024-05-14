# text-encoder
Turns JavaScript strings into streams of UTF-8 encoded values (Uint8Array)

> This package is **NOT** a published npm module

## Inspiration

While writing [sqldb](https://github.com/yatharthx/sqldb), I came about this situation where I needed to store a column of type `text` in a table that must be of length 255 bytes. Since JavaScript strings may contain graphemes that are variable in length (ranging from 1 to 4 bytes in length), encoded as UTF-16 internally, I couldn't use the `String.prototype.length` property to check the length of string in bytes. The solution was to turn the string into a stream of bytes. Typically, an instance of `Uint8Array`.

Since `sqldb` is meant to run on server, there are APIs like Node's `Buffer` to help us. Also, we could use `TextEncoder` that does exactly what we need. It turns JS strings into `Uint8Array` array. Nice.

That looks like problem solved, and well, it is indeed. However, this problem made me curious about the working of Unicode. So I went on to read the Unicode spec, specifically the implementation details `UTF-16` and `UTF-8`. This repo contains my implementation of turning JavaScript strings into `Uint8Array`s.

## Project by
[yatharthx](http://twitter.com/yatharthx_)

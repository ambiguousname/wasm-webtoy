/**
 * Copyright (c) Bruno Garcia
 * 
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 * OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 *  PERFORMANCE OF THIS SOFTWARE.
 * 
 */
// Taken directly from https://github.com/aduros/wasm4/blob/main/cli/lib/utils/z85.js
/**
 * @param {Buffer|string|Array<number>|Uint8Array} src
 * @returns {string}
 */
function encode(src) {
    const ENCODER =
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.-:+=^!/*?&<>()[]{}@%$#'.split(
            ''
        );

    const size = src.length;
    const extra = size % 4;
    const paddedSize = extra ? size + 4 - extra : size;

    let str = '',
        byte_nbr = 0,
        value = 0;
    while (byte_nbr < paddedSize) {
        const b = byte_nbr < size ? src[byte_nbr] : 0;
        ++byte_nbr;
        value = value * 256 + b;
        if (byte_nbr % 4 == 0) {
            let divisor = 85 * 85 * 85 * 85;
            while (divisor >= 1) {
                const idx = Math.floor(value / divisor) % 85;
                str += ENCODER[idx];
                divisor /= 85;
            }
            value = 0;
        }
    }

    return str;
}
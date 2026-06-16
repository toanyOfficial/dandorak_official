#!/usr/bin/env python3
"""Generate lightweight menu thumbnails from goods PNG images.

This script intentionally uses only Python's standard library so server startup does
not depend on native image packages. It supports the PNG formats used by the menu
assets: 8-bit truecolor (RGB) and truecolor with alpha (RGBA).
"""

from __future__ import annotations

import os
import struct
from concurrent.futures import ProcessPoolExecutor
import sys
import zlib
from pathlib import Path

PNG_SIGNATURE = b"\x89PNG\r\n\x1a\n"
MAX_WIDTH = 180
ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "public" / "assets" / "images" / "goods"
TARGET_DIR = ROOT / "public" / "assets" / "images" / "goods-lite"


def warn(message: str) -> None:
    print(f"[menu-thumbs] warning: {message}", file=sys.stderr)


def read_chunks(data: bytes):
    if not data.startswith(PNG_SIGNATURE):
        raise ValueError("not a PNG file")

    offset = len(PNG_SIGNATURE)
    while offset < len(data):
        if offset + 8 > len(data):
            raise ValueError("truncated PNG chunk")
        length = struct.unpack(">I", data[offset:offset + 4])[0]
        chunk_type = data[offset + 4:offset + 8]
        chunk_data = data[offset + 8:offset + 8 + length]
        offset += 12 + length
        yield chunk_type, chunk_data
        if chunk_type == b"IEND":
            break


def paeth_predictor(a: int, b: int, c: int) -> int:
    p = a + b - c
    pa = abs(p - a)
    pb = abs(p - b)
    pc = abs(p - c)
    if pa <= pb and pa <= pc:
        return a
    if pb <= pc:
        return b
    return c


def unfilter_scanlines(raw: bytes, width: int, height: int, channels: int) -> bytearray:
    stride = width * channels
    output = bytearray(height * stride)
    src_offset = 0

    for y in range(height):
        filter_type = raw[src_offset]
        src_offset += 1
        scanline = bytearray(raw[src_offset:src_offset + stride])
        src_offset += stride
        prev_offset = (y - 1) * stride
        out_offset = y * stride

        for x in range(stride):
            left = scanline[x - channels] if x >= channels else 0
            up = output[prev_offset + x] if y > 0 else 0
            upper_left = output[prev_offset + x - channels] if y > 0 and x >= channels else 0

            if filter_type == 1:
                scanline[x] = (scanline[x] + left) & 0xFF
            elif filter_type == 2:
                scanline[x] = (scanline[x] + up) & 0xFF
            elif filter_type == 3:
                scanline[x] = (scanline[x] + ((left + up) // 2)) & 0xFF
            elif filter_type == 4:
                scanline[x] = (scanline[x] + paeth_predictor(left, up, upper_left)) & 0xFF
            elif filter_type != 0:
                raise ValueError(f"unsupported PNG filter: {filter_type}")

        output[out_offset:out_offset + stride] = scanline

    return output


def decode_png(path: Path):
    width = height = color_type = bit_depth = interlace = None
    compressed = bytearray()

    for chunk_type, chunk_data in read_chunks(path.read_bytes()):
        if chunk_type == b"IHDR":
            width, height, bit_depth, color_type, _compression, _filter, interlace = struct.unpack(">IIBBBBB", chunk_data)
        elif chunk_type == b"IDAT":
            compressed.extend(chunk_data)

    if width is None or height is None:
        raise ValueError("missing PNG IHDR")
    if bit_depth != 8 or color_type not in (2, 6) or interlace != 0:
        raise ValueError("unsupported PNG format; expected non-interlaced 8-bit RGB/RGBA")

    channels = 4 if color_type == 6 else 3
    raw = zlib.decompress(bytes(compressed))
    return width, height, channels, unfilter_scanlines(raw, width, height, channels)


def resize_to_max_width(pixels: bytearray, width: int, height: int, channels: int, target_width: int):
    if width <= target_width:
        return width, height, pixels

    target_height = max(1, round(height * target_width / width))
    resized = bytearray(target_width * target_height * channels)

    for y in range(target_height):
        source_y = min(height - 1, (y * height) // target_height)
        source_row = source_y * width * channels
        target_row = y * target_width * channels
        for x in range(target_width):
            source_x = min(width - 1, (x * width) // target_width)
            source_offset = source_row + source_x * channels
            target_offset = target_row + x * channels
            resized[target_offset:target_offset + channels] = pixels[source_offset:source_offset + channels]

    return target_width, target_height, resized


def png_chunk(chunk_type: bytes, chunk_data: bytes) -> bytes:
    return struct.pack(">I", len(chunk_data)) + chunk_type + chunk_data + struct.pack(">I", zlib.crc32(chunk_type + chunk_data) & 0xFFFFFFFF)


def encode_png(path: Path, width: int, height: int, channels: int, pixels: bytearray) -> None:
    color_type = 6 if channels == 4 else 2
    stride = width * channels
    raw = bytearray()
    for y in range(height):
        raw.append(0)
        raw.extend(pixels[y * stride:(y + 1) * stride])

    data = bytearray(PNG_SIGNATURE)
    data.extend(png_chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, color_type, 0, 0, 0)))
    data.extend(png_chunk(b"IDAT", zlib.compress(bytes(raw), level=6)))
    data.extend(png_chunk(b"IEND", b""))
    path.write_bytes(data)


def generate_thumbnail(source: Path, target: Path) -> bool:
    if target.exists() and target.stat().st_mtime >= source.stat().st_mtime:
        return False

    width, height, channels, pixels = decode_png(source)
    thumb_width, thumb_height, resized = resize_to_max_width(pixels, width, height, channels, MAX_WIDTH)
    encode_png(target, thumb_width, thumb_height, channels, resized)
    return True


def generate_thumbnail_result(source: Path):
    target = TARGET_DIR / source.name
    try:
        generated = generate_thumbnail(source, target)
        return source.name, "generated" if generated else "up-to-date", ""
    except Exception as error:  # noqa: BLE001 - startup must keep serving original-image fallback.
        return source.name, "failed", str(error)


def main() -> int:
    try:
        TARGET_DIR.mkdir(parents=True, exist_ok=True)
    except OSError as error:
        warn(f"could not create {TARGET_DIR}: {error}")
        return 0

    if not SOURCE_DIR.exists():
        warn(f"source directory does not exist: {SOURCE_DIR}")
        return 0

    sources = sorted(SOURCE_DIR.glob("*.png"))
    max_workers = min(4, os.cpu_count() or 1)
    generated = 0
    skipped = 0
    failed = 0

    with ProcessPoolExecutor(max_workers=max_workers) as executor:
        for filename, status, error in executor.map(generate_thumbnail_result, sources):
            if status == "generated":
                generated += 1
            elif status == "up-to-date":
                skipped += 1
            else:
                failed += 1
                warn(f"failed to generate {filename}: {error}")

    print(f"[menu-thumbs] generated={generated} up-to-date={skipped} failed={failed}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

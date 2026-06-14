---
title: "Fragment Derivative Builtins"
---

## Fragment Derivative Builtins in WGSL

Fragment derivative builtins in WGSL are used to compute the rate of change of a value across the surface of a primitive. These builtins are useful for various effects, such as mipmapping, bump mapping, and other texture-related operations.

### Available Builtins

WGSL provides three fragment derivative builtins:

1. `dpdx`
2. `dpdy`
3. `fwidth`

### `dpdx`

The `dpdx` function computes the partial derivative of an expression with respect to the screen-space x-coordinate.

**Syntax:**
```wgsl
fn dpdx(e: T) -> T
```

- `e`: The expression to compute the derivative of.
- Returns the partial derivative of `e` with respect to x.

**Example:**
```wgsl
let dx: f32 = dpdx(someValue);
```

### `dpdy`

The `dpdy` function computes the partial derivative of an expression with respect to the screen-space y-coordinate.

**Syntax:**
```wgsl
fn dpdy(e: T) -> T
```

- `e`: The expression to compute the derivative of.
- Returns the partial derivative of `e` with respect to y.

**Example:**
```wgsl
let dy: f32 = dpdy(someValue);
```

### `fwidth`

The `fwidth` function computes the sum of the absolute values of the partial derivatives of an expression with respect to the screen-space x and y coordinates.

**Syntax:**
```wgsl
fn fwidth(e: T) -> T
```

- `e`: The expression to compute the width of.
- Returns the sum of the absolute values of the partial derivatives of `e`.

**Example:**
```wgsl
let width: f32 = fwidth(someValue);
```

### Practical Usage

Fragment derivative builtins are often used in texture mapping to compute mipmap levels or to create smooth transitions in shading.

**Example: Using `fwidth` for Mipmapping:**
```wgsl
@fragment
fn main(@location(0) uv: vec2<f32>) -> @location(0) vec4<f32> {
    let texCoord = uv * textureSize(texture, 0);
    let mipLevel = log2(max(fwidth(texCoord.x), fwidth(texCoord.y)));
    return textureSampleLevel(texture, sampler, uv, mipLevel);
}
```

In this example, `fwidth` is used to compute the appropriate mipmap level for a texture sample based on the rate of change of the texture coordinates.

### Summary

Fragment derivative builtins in WGSL provide powerful tools for computing the rate of change of values across the surface of a primitive. By using `dpdx`, `dpdy`, and `fwidth`, you can implement advanced texture and shading techniques in your shaders.

* `dpdx(e)`: Computes the partial derivative of `e` with respect to x.
* `dpdy(e)`: Computes the partial derivative of `e` with respect to y.
* `fwidth(e)`: Computes the sum of the absolute values of the partial derivatives of `e`.

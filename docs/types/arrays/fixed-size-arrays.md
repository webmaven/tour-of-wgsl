---
title: "Fixed-Size Arrays"
shader: ./fixed-size-arrays.wgsl
visualizer: /ts/value_visualizer.ts
visualizerOptions: '{"fields": [
    {"expr": "ith_fib",  "type": "i32"},
    {"expr": "ith_zero", "type": "u32"}
]}'
---

A fixed-size array type is declared as <span class="template">array&lt;(T),(N)&gt;</span>, where
<span class="template">(T)</span> is the element type (with some restrictions), and
<span class="template">(N)</span> is the element count.

In most cases <span class="template">(N)</span> is a
[const-expression](../../expressions/evaluation-stage/constant/index.md).

> There is one exception to this rule:
> When the array is used as the type of a workgroup variable,
> <span class="template">(N)</span> can be an [override-expression](../../expressions/evaluation-stage/override/index.md).
> That means the array size can be adjusted at
> [pipeline-creation time](../../expressions/evaluation-stage/overview/index.md).
> It's still "fixed" before the shader executes.

<details class='example'>
<summary>Examples:</summary>

|                          |                                                                                          |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| `array<f32,5>`           | A 5-element array of `f32`.                                                              |
| `array<array<f32,4>,8>`  | An array of 8 arrays of 4 f32's.                                                         |
| `array<S,c>`             | An array of `c` elements of type `S`. Here `c` must be const-declared.                   |
| `array<i32,4*blockSize>` | An array of i32 with 4 \* `blockSize` elements. Here `blockSize` must be const-declared. |

</details>

With the one exception above, fixed-size array values can be used like other plain values, for example:

- in an expression,
- passed as a function argument,
- returned from a function,
- assigned to a variable, or
- used as the initializer for a variable or declared value.

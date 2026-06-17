---
title: 'Matrices'
shader: ./index.wgsl
---

WGSL supports matrices between 2x2 and 4x4 `f32` elements.

WGSL matrices are column-major.

Matrices are declared with the form <span class="template">mat(C)x(R)&lt;f32&gt;</span>, where <span class="template">(C)</span> is the number of columns in the matrix, <span class="template">(R)</span> is the number of rows in the matrix.

<details class='example'>
  <summary>Example</summary>

|               |                                                    |
| ------------- | -------------------------------------------------- |
| `mat2x3<f32>` | A matrix with two columns and three rows of `f32`. |
| `mat4x2<f32>` | A matrix with four columns and two rows of `f32`.  |

</details>

<span class="template">mat(C)x(R)&lt;(T)&gt;</span> can be thought as <span class="template">(C)</span> column vectors of <span class="template">vec(R)&lt;(T)&gt;</span>.

WGSL also predeclares the alias <span class="template">mat(C)x(R)f</span> to <span class="template">mat(C)x(R)&lt;f32&gt;</span>.

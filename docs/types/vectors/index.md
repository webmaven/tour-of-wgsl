---
title: 'Vectors'
shader: ./index.wgsl
---

WGSL supports 2-element, 3-element and 4-element vectors of scalar types.

Vectors are declared with the form <span class="template">vec(N)&lt;(T)&gt;</span>, where <span class="template">(N)</span> is the number of elements in the vector, and <span class="template">(T)</span> is the element type.

<details class='example'>
<summary>Example</summary>

|              |                                  |
| ------------ | -------------------------------- |
| `vec2<f32>`  | A two-element vector of `f32`.   |
| `vec3<u32>`  | A three-element vector of `u32`. |
| `vec4<bool>` | A four-element vector of `bool`. |

</details>

WGSL also predeclares the aliases <span class="template">vec(N)(S)</span>, where <span class="template">(S)</span> is one of `i`, `u` or `f`:

- <span class="template">vec(N)i</span> is an alias to <span class="template">vec(N)&lt;i32&gt;</span>
- <span class="template">vec(N)u</span> is an alias to <span class="template">vec(N)&lt;u32&gt;</span>
- <span class="template">vec(N)f</span> is an alias to <span class="template">vec(N)&lt;f32&gt;</span>

<details class='example'>
<summary>Example</summary>

|         |                             |
| ------- | --------------------------- |
| `vec2f` | is an alias to `vec2<f32>`. |
| `vec3u` | is an alias to `vec3<u32>`. |
| `vec4i` | is an alias to `vec4<i32>`. |

</details>

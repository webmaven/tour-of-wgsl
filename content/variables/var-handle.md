---
title: "var (handle)"
shader: ./var-handle.wgsl
---

## Handle Variables

In WGSL, `handle` variables are used to reference resources such as textures and buffers. These variables allow shaders to access and manipulate external resources efficiently.

### Declaring Handle Variables

Handle variables are declared using the `var<handle>` keyword followed by the variable name and type. The type specifies the kind of resource the handle references.

**Syntax:**
```wgsl
var<handle> varName: Type;
```

- `varName`: The name of the handle variable.
- `Type`: The data type of the resource being referenced.

### Example: Declaring a Texture Handle

**WGSL Code:**
```wgsl
@group(0) @binding(0) var<handle> myTexture: texture_2d<f32>;
@group(0) @binding(1) var<handle> mySampler: sampler;
```

### Using Handle Variables

Handle variables can be used in your shader code to sample textures, read from buffers, and perform other resource-related operations.

**Example: Sampling a Texture**

**WGSL Code:**
```wgsl
@group(0) @binding(0) var<handle> myTexture: texture_2d<f32>;
@group(0) @binding(1) var<handle> mySampler: sampler;

@fragment
fn main(@location(0) uv: vec2<f32>) -> @location(0) vec4<f32> {
    let color = textureSample(myTexture, mySampler, uv);
    return color;
}
```

### JavaScript to WGSL Mapping

To use handle variables in a WebGPU application, you need to create the resources in JavaScript and bind them to the appropriate resource group and binding.

**JavaScript Code:**
```javascript
// Create the texture
const texture = device.createTexture({
  size: [width, height, 1],
  format: 'rgba8unorm',
  usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
});

// Create the sampler
const sampler = device.createSampler({
  magFilter: 'linear',
  minFilter: 'linear',
});

// Create the bind group layout
const bindGroupLayout = device.createBindGroupLayout({
  entries: [
    {
      binding: 0,
      visibility: GPUShaderStage.FRAGMENT,
      texture: {
        sampleType: 'float',
      },
    },
    {
      binding: 1,
      visibility: GPUShaderStage.FRAGMENT,
      sampler: {},
    },
  ],
});

// Create the bind group
const bindGroup = device.createBindGroup({
  layout: bindGroupLayout,
  entries: [
    {
      binding: 0,
      resource: texture.createView(),
    },
    {
      binding: 1,
      resource: sampler,
    },
  ],
});
```

### Summary

Handle variables in WGSL provide a way to reference and manipulate external resources such as textures and buffers. By using the `var<handle>` keyword, you can declare handle variables in WGSL. In JavaScript, you create and bind these resources to the shader using WebGPU APIs.

* `var<handle> varName: Type;`: Declares a handle variable.
* Handle variables are used to reference resources like textures and buffers.
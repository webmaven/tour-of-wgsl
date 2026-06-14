---
title: "var<uniform>"
shader: ./var-uniform.wgsl
---

## Uniform Variables

Uniform variables in WGSL are used to store read-only data that can be accessed by shaders. They are typically used to store transformation matrices, lighting information, and other constant data that does not change frequently during the rendering of a frame.

### Declaring Uniform Variables

Uniform variables are declared using the `var<uniform>` keyword followed by the variable name and type.

**Syntax:**
```wgsl
var<uniform> varName: Type;
```

- `varName`: The name of the uniform variable.
- `Type`: The data type of the variable.

**Example:**
```wgsl
struct Uniforms {
    modelMatrix: mat4x4<f32>;
    viewMatrix: mat4x4<f32>;
    projectionMatrix: mat4x4<f32>;
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
```

### Using Uniform Variables

Uniform variables can be accessed in your shader code to perform various calculations. They are read-only and provide constant data to the shader.

**Example:**
```wgsl
@vertex
fn main(@location(0) position: vec4<f32>) -> @builtin(position) vec4<f32> {
    return uniforms.projectionMatrix * uniforms.viewMatrix * uniforms.modelMatrix * position;
}
```

### JavaScript to WGSL Mapping

To use uniform variables in a WebGPU application, you need to create the buffer in JavaScript and bind it to the appropriate resource group and binding.

**JavaScript Code:**
```javascript
// Define the uniform buffer data
const uniformData = new Float32Array([
  // modelMatrix
  1.0, 0.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 1.0, 0.0,
  0.0, 0.0, 0.0, 1.0,
  // viewMatrix
  1.0, 0.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 1.0, 0.0,
  0.0, 0.0, 0.0, 1.0,
  // projectionMatrix
  1.0, 0.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 1.0, 0.0,
  0.0, 0.0, 0.0, 1.0,
]);

// Create the uniform buffer
const uniformBuffer = device.createBuffer({
  size: uniformData.byteLength,
  usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
});

// Write data to the uniform buffer
device.queue.writeBuffer(uniformBuffer, 0, uniformData);

// Create the bind group layout
const bindGroupLayout = device.createBindGroupLayout({
  entries: [
    {
      binding: 0,
      visibility: GPUShaderStage.VERTEX,
      buffer: {
        type: 'uniform',
      },
    },
  ],
});

// Create the bind group
const bindGroup = device.createBindGroup({
  layout: bindGroupLayout,
  entries: [
    {
      binding: 0,
      resource: {
        buffer: uniformBuffer,
      },
    },
  ],
});
```

### Summary

Uniform variables in WGSL are essential for storing constant data that shaders can read. By using the `var<uniform>` keyword, you can declare uniform variables in WGSL. In JavaScript, you create and bind these buffers to the shader using WebGPU APIs.

* `var<uniform> varName: Type;`: Declares a uniform variable.
* Uniform variables are read-only and typically used for storing constant data like transformation matrices.

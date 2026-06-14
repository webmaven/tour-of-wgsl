---
title: "Uniform Buffers"
---

## Uniform Buffers

Uniform buffers in WGSL are used to store read-only data that can be accessed by shaders. They are typically used to store transformation matrices, lighting information, and other constant data that does not change frequently.

### Declaring Uniform Buffers

**Syntax:**
```wgsl
var<uniform> u: T;
```

- `T` is the type of the data stored in the buffer.

### Example: Declaring a Uniform Buffer

**WGSL Code:**
```wgsl
struct MyUniformBufferType {
    modelMatrix: mat4x4<f32>;
    viewMatrix: mat4x4<f32>;
    projectionMatrix: mat4x4<f32>;
};

@group(0) @binding(0) var<uniform> myUniformBuffer: MyUniformBufferType;
```

### JavaScript to WGSL Mapping

To use uniform buffers in a WebGPU application, you need to create the buffer in JavaScript and bind it to the appropriate resource group and binding.

#### Example: Uniform Buffer

**WGSL Code:**
```wgsl
struct MyUniformBufferType {
    modelMatrix: mat4x4<f32>;
    viewMatrix: mat4x4<f32>;
    projectionMatrix: mat4x4<f32>;
};

@group(0) @binding(0) var<uniform> myUniformBuffer: MyUniformBufferType;
```

**JavaScript Code:**
```javascript
// Define the uniform buffer data
const modelMatrix = new Float32Array([
  1.0, 0.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 1.0, 0.0,
  0.0, 0.0, 0.0, 1.0,
]);

const viewMatrix = new Float32Array([
  1.0, 0.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 1.0, 0.0,
  0.0, 0.0, 0.0, 1.0,
]);

const projectionMatrix = new Float32Array([
  1.0, 0.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 1.0, 0.0,
  0.0, 0.0, 0.0, 1.0,
]);

const uniformData = new Float32Array([
  ...modelMatrix,
  ...viewMatrix,
  ...projectionMatrix,
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

Uniform buffers are essential for storing constant data that shaders can read. By using the `var<uniform>` keyword, you can declare uniform buffers in WGSL. In JavaScript, you create and bind these buffers to the shader using WebGPU APIs.

* `var<uniform> u: T`: Declares a uniform buffer with type `T`.
* Uniform buffers are read-only and typically used for storing constant data like transformation matrices.

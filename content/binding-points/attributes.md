---
title: "Attributes"
---

## Attributes in WGSL

WebGPU Shading Language (WGSL) uses attributes to provide additional information about variables, functions, and other elements in shader code. Attributes are specified using the `@` symbol followed by the attribute name and any necessary parameters.

### @group

The `@group` attribute is used to specify the resource group that a binding belongs to. Resource groups are a way to organize and manage resources such as textures, buffers, and samplers in a shader. By grouping resources, you can efficiently bind and unbind them as needed.

**Syntax:**
```wgsl
@group(n)
```

- `n`: The group index, which is a non-negative integer.

**Example:**

```wgsl
@group(0) @binding(0) var<uniform> myUniformBuffer: MyUniformBufferType;
```

### @binding

The `@binding` attribute is used to specify the binding index within a resource group. Each resource within a group must have a unique binding index.

**Syntax:**
```wgsl
@binding(n)
```
- `n`: The binding index, which is a non-negative integer.

**Example:**
```wgsl
@group(0) @binding(1) var<storage, read_write> myStorageBuffer: MyStorageBufferType;
```

### Combining @group and @binding

Attributes can be combined to fully specify the location of a resource in the shader. This is useful for ensuring that resources are correctly bound and accessible within the shader code.

**Example:**
```wgsl
@group(1) @binding(2) var<uniform> anotherUniformBuffer: AnotherUniformBufferType;
```

In this example, `anotherUniformBuffer` is part of group 1 and has a binding index of 2.

### JavaScript to WGSL Mapping

To use WGSL shaders in a WebGPU application, you need to map JavaScript variables to WGSL variables. This involves creating buffers and binding them to the appropriate resource groups and bindings.

#### Example 1: Uniform Buffer

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
```js
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

### Example 2: Storage Buffer

**WGSL Code:**
```wgsl
@group(0) @binding(1) var<storage, read_write> myStorageBuffer: MyStorageBufferType;
```

**JavaScript Code:**
```js
// Define the storage buffer data
const storageData = new Float32Array([5.0, 6.0, 7.0, 8.0]);

// Create the storage buffer
const storageBuffer = device.createBuffer({
  size: storageData.byteLength,
  usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
});

// Write data to the storage buffer
device.queue.writeBuffer(storageBuffer, 0, storageData);

// Update the bind group layout to include the storage buffer
const bindGroupLayout = device.createBindGroupLayout({
  entries: [
    {
      binding: 0,
      visibility: GPUShaderStage.VERTEX,
      buffer: {
        type: 'uniform',
      },
    },
    {
      binding: 1,
      visibility: GPUShaderStage.VERTEX,
      buffer: {
        type: 'storage',
      },
    },
  ],
});

// Update the bind group to include the storage buffer
const bindGroup = device.createBindGroup({
  layout: bindGroupLayout,
  entries: [
    {
      binding: 0,
      resource: {
        buffer: uniformBuffer,
      },
    },
    {
      binding: 1,
      resource: {
        buffer: storageBuffer,
      },
    },
  ],
});
```


### JavaScript to WGSL Mapping

To use WGSL shaders in a WebGPU application, you need to map JavaScript variables to WGSL variables. This involves creating buffers and binding them to the appropriate resource groups and bindings.

#### Example 1: Uniform Buffer

**WGSL Code:**
```wgsl
@group(0) @binding(0) var<uniform> myUniformBuffer: MyUniformBufferType;
```

**JavaScript Code:**
```javascript
// Define the uniform buffer data
const uniformData = new Float32Array([1.0, 2.0, 3.0, 4.0]);

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

#### Example 2: Storage Buffer

**WGSL Code:**
```wgsl
@group(0) @binding(1) var<storage, read_write> myStorageBuffer: MyStorageBufferType;
```

**JavaScript Code:**
```javascript
// Define the storage buffer data
const storageData = new Float32Array([5.0, 6.0, 7.0, 8.0]);

// Create the storage buffer
const storageBuffer = device.createBuffer({
  size: storageData.byteLength,
  usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
});

// Write data to the storage buffer
device.queue.writeBuffer(storageBuffer, 0, storageData);

// Update the bind group layout to include the storage buffer
const bindGroupLayout = device.createBindGroupLayout({
  entries: [
    {
      binding: 0,
      visibility: GPUShaderStage.VERTEX,
      buffer: {
        type: 'uniform',
      },
    },
    {
      binding: 1,
      visibility: GPUShaderStage.VERTEX,
      buffer: {
        type: 'storage',
      },
    },
  ],
});

// Update the bind group to include the storage buffer
const bindGroup = device.createBindGroup({
  layout: bindGroupLayout,
  entries: [
    {
      binding: 0,
      resource: {
        buffer: uniformBuffer,
      },
    },
    {
      binding: 1,
      resource: {
        buffer: storageBuffer,
      },
    },
  ],
});
```

These examples demonstrate how to create and bind uniform and storage buffers in JavaScript, and how to map them to WGSL variables using the `@group` and `@binding` attributes.
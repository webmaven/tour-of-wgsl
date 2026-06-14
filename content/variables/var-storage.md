---
title: "var<storage>"
shader: ./var-storage.wgsl
---

## Storage Variables

Storage variables in WGSL are used to store large amounts of data that can be read from and written to by shaders. They are declared using the `var<storage>` keyword and can have different access modes: `read`, `write`, and `read_write`.

### Declaring Storage Variables

Storage variables are declared using the `var<storage>` keyword followed by the variable name, type, and access mode.

**Syntax:**
```wgsl
var<storage, access_mode> varName: Type;
```

- `varName`: The name of the storage variable.
- `Type`: The data type of the variable.
- `access_mode`: The access mode, which can be `read`, `write`, or `read_write`.

**Example:**
```wgsl
struct MyStorageBufferType {
    data: array<f32>;
};

@group(0) @binding(0) var<storage, read_write> myStorageBuffer: MyStorageBufferType;
```

### Using Storage Variables

Storage variables can be accessed in your shader code to perform various read and write operations. They are useful for tasks such as image processing, physics simulations, and other compute-intensive operations.

**Example: Reading and Writing to a Storage Buffer**

**WGSL Code:**
```wgsl
struct MyStorageBufferType {
    data: array<f32>;
};

@group(0) @binding(0) var<storage, read_write> myStorageBuffer: MyStorageBufferType;

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let index = global_id.x;
    myStorageBuffer.data[index] = myStorageBuffer.data[index] * 2.0;
}
```

### JavaScript to WGSL Mapping

To use storage variables in a WebGPU application, you need to create the buffer in JavaScript and bind it to the appropriate resource group and binding.

**JavaScript Code:**
```javascript
// Define the storage buffer data
const storageData = new Float32Array([1.0, 2.0, 3.0, 4.0]);

// Create the storage buffer
const storageBuffer = device.createBuffer({
  size: storageData.byteLength,
  usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
});

// Write data to the storage buffer
device.queue.writeBuffer(storageBuffer, 0, storageData);

// Create the bind group layout
const bindGroupLayout = device.createBindGroupLayout({
  entries: [
    {
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      buffer: {
        type: 'storage',
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
        buffer: storageBuffer,
      },
    },
  ],
});
```

### Summary

Storage variables in WGSL are essential for handling large datasets that need to be read from and written to by shaders. By using the `var<storage>` keyword, you can declare storage variables with different access modes. In JavaScript, you create and bind these buffers to the shader using WebGPU APIs.

* `var<storage, access_mode> varName: Type;`: Declares a storage variable with a specified access mode.
* Storage variables are used for read and write operations in shaders.
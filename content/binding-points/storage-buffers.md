---
title: "Storage Buffers"
---

## Storage Buffers in WGSL

Storage buffers in WGSL are used to store large amounts of data that can be read from and written to by shaders. They are declared using the `var<storage>` keyword and can have different access modes: `read`, `write`, and `read_write`.

### Declaring Storage Buffers

**Syntax:**
```wgsl
var<storage> s: T;
var<storage, read> s: T;
var<storage, read_write> s: T;
var<storage> arr: array<f32>;
```

### Example: Declaring a Storage Buffer

**WGSL Code:**
```wgsl
struct MyStorageBufferType {
    data: array<f32>;
};

@group(0) @binding(1) var<storage, read_write> myStorageBuffer: MyStorageBufferType;
```

### JavaScript to WGSL Mapping

To use storage buffers in a WebGPU application, you need to create the buffer in JavaScript and bind it to the appropriate resource group and binding.

#### Example: Storage Buffer

**WGSL Code:**
```wgsl
struct MyStorageBufferType {
    data: array<f32>;
};

@group(0) @binding(1) var<storage, read_write> myStorageBuffer: MyStorageBufferType;
```

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
      binding: 1,
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
      binding: 1,
      resource: {
        buffer: storageBuffer,
      },
    },
  ],
});
```

### Summary

Storage buffers are essential for handling large datasets in WGSL shaders. By using the `var<storage>` keyword, you can declare storage buffers with different access modes. In JavaScript, you create and bind these buffers to the shader using WebGPU APIs.

* `var<storage> s: T`: Declares a storage buffer with default access.
* `var<storage, read> s: T`: Declares a read-only storage buffer.
* `var<storage, read_write> s: T`: Declares a read-write storage buffer.
* `var<storage> arr: array<f32>`: Declares a storage buffer that stores an array of `f32` values.
```
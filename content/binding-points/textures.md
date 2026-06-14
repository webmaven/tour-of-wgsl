---
title: "Textures"
---

## Textures

Textures in WGSL are used to store image data that can be sampled or accessed in shaders. They are essential for rendering images, applying textures to 3D models, and other graphics operations.

### Types of Textures

1. **Sampled Textures**: These are textures that are sampled using a sampler. They are typically used for applying textures to 3D models.
2. **Storage Textures**: These are textures that can be read from and written to by shaders. They are used for more advanced operations like image processing.

### Declaring Textures

#### Sampled Textures

**Syntax:**
```wgsl
var myTexture: texture_2d<f32>;
var mySampler: sampler;
```

**Example:**
```wgsl
@group(0) @binding(0) var myTexture: texture_2d<f32>;
@group(0) @binding(1) var mySampler: sampler;
```

#### Storage Textures

**Syntax:**
```wgsl
var myStorageTexture: texture_storage_2d<rgba8unorm, write>;
```

**Example:**
```wgsl
@group(0) @binding(2) var myStorageTexture: texture_storage_2d<rgba8unorm, write>;
```

### JavaScript to WGSL Mapping

To use textures in a WebGPU application, you need to create the texture and sampler in JavaScript and bind them to the appropriate resource group and binding.

#### Example: Sampled Texture

**WGSL Code:**
```wgsl
@group(0) @binding(0) var myTexture: texture_2d<f32>;
@group(0) @binding(1) var mySampler: sampler;
```

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

#### Example: Storage Texture

**WGSL Code:**
```wgsl
@group(0) @binding(2) var myStorageTexture: texture_storage_2d<rgba8unorm, write>;
```

**JavaScript Code:**
```javascript
// Create the storage texture
const storageTexture = device.createTexture({
  size: [width, height, 1],
  format: 'rgba8unorm',
  usage: GPUTextureUsage.STORAGE_BINDING | GPUTextureUsage.COPY_DST,
});

// Update the bind group layout to include the storage texture
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
    {
      binding: 2,
      visibility: GPUShaderStage.FRAGMENT,
      storageTexture: {
        access: 'write-only',
        format: 'rgba8unorm',
      },
    },
  ],
});

// Update the bind group to include the storage texture
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
    {
      binding: 2,
      resource: storageTexture.createView(),
    },
  ],
});
```

### Summary

Textures are a crucial part of WGSL for handling image data. By using the appropriate syntax and bindings, you can efficiently use sampled and storage textures in your shaders.

* `texture_2d<f32>`: Declares a 2D sampled texture.
* `sampler`: Declares a sampler for sampling textures.
* `texture_storage_2d<rgba8unorm, write>`: Declares a 2D storage texture with write access.

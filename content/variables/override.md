---
title: "Override Variables"
---

## Override Variables

In WGSL, `override` variables are used to define constants that can be overridden at pipeline creation time. These variables are useful for setting shader parameters that can be adjusted without modifying the shader code itself.

### Declaring Override Variables

Override variables are declared using the `override` keyword followed by the variable name and type. You can also provide an optional default value.

**Syntax:**
```wgsl
override varName: Type = defaultValue;
```

- `varName`: The name of the override variable.
- `Type`: The data type of the variable.
- `defaultValue`: (Optional) The default value of the variable.

**Example:**
```wgsl
override myFloat: f32 = 1.0;
override myInt: i32 = 42;
override myBool: bool = true;
```

### Using Override Variables

Override variables can be used in your shader code just like any other constant. They are typically used to control parameters such as lighting, colors, or other configurable settings.

**Example:**
```wgsl
override lightIntensity: f32 = 1.0;

@fragment
fn main(@location(0) fragCoord: vec4<f32>) -> @location(0) vec4<f32> {
    let color = vec4<f32>(1.0, 1.0, 1.0, 1.0) * lightIntensity;
    return color;
}
```

### Overriding Variables at Pipeline Creation

When creating the pipeline in JavaScript, you can override the default values of these variables using the `pipelineLayout` and `pipeline` descriptors.

**JavaScript Code:**
```javascript
const pipelineLayout = device.createPipelineLayout({
  bindGroupLayouts: [],
});

const pipeline = device.createRenderPipeline({
  layout: pipelineLayout,
  vertex: {
    module: vertexShaderModule,
    entryPoint: 'main',
  },
  fragment: {
    module: fragmentShaderModule,
    entryPoint: 'main',
    targets: [{
      format: 'bgra8unorm',
    }],
  },
  primitive: {
    topology: 'triangle-list',
  },
  overrides: {
    lightIntensity: 2.0, // Override the default value
  },
});
```

### Summary

Override variables in WGSL provide a flexible way to define constants that can be adjusted at pipeline creation time. By using the `override` keyword, you can create configurable shaders that can be easily tuned without modifying the shader code.

* `override varName: Type = defaultValue;`: Declares an override variable.
* Override variables can be used like any other constant in shader code.
* Override the default values at pipeline creation in JavaScript.

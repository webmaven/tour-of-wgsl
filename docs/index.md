---
IsHome: true
title: WGSL
shader: ./index.wgsl
visualizer: /ts/graphics_visualizer.ts
---

# Welcome to the tour of WGSL

This site is a quick introduction to the [WebGPU Shading
Language](https://w3.org/TR/WGSL). The tour provides an overview
of the syntax and features of WGSL, but assumes a familiarity with
programming.

The tour provides the WGSL shaders for each example. The shaders can be
edited in the text view on the right (or below), and the resulting output is displayed
below the editor.

The editor provides:

- Automatic execution of the entered shader.
- Inline error messages for shader compilation errors.
  Errors also appear in the developer console, so it may be handy
  to keep that open too.
- Pressing `ctrl-o` when the cursor is on an attribute (e.g. `@builtin`)
  a builtin value (e.g. `vertex_index`) or many of the builtin functions
  (e.g. `sin`) to show documentation on selected element.

Each of these shaders can serve as the starting point for your own
exploration.

> As a warmup, edit the `frag_main` function. Change the first component of its
> return value from 1 to 0, so it's `vec4(0, sin(f32(frame) / 128), 0, 1)`.
> What happens?

The tour is organized into the following sections:

- **[Types](types/index.md)**: Explore the wide variety of types supported by WGSL, from basic scalars and vectors to structures and pointers.
- **[Variables & Constants](variables/index.md)**: Learn how to declare and use mutable variables (`var`) and immutable values (`const`, `override`, `let`).
- **[Expressions](expressions/index.md)**: Understand operators and different evaluation stages (constant, override, runtime).
- **[Control Flow](control-flow/index.md)**: Learn about branching and looping statements (`if`, `switch`, `loop`, `while`, `for`).
- **[Functions](functions/index.md)**: Explore function syntax, calls, the `@must_use` attribute, and entry points.
- **[Binding Points](binding-points/index.md)**: See how shaders connect to CPU-side resources like buffers and textures using binding points and attributes.
- **[Uniformity Analysis](uniformity-analysis/index.md)**: Understand how WGSL tracks uniformity of execution for derivative and barrier safety.

Each section has several sub-pages, and you can navigate forward
and backward using the buttons on the bottom of each page, or by using the
left and right keys on your keyboard.

You can quickly get back to a higher level page using the breadcrumb
links at the top of this pane.

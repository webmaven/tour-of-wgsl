---
title: 'Variables'
---

A _variable_ represents a value stored in memory. In WGSL, mutability and lifetimes are defined by different declaration keywords and address spaces:

- **[let](let.md)**: Block-scoped immutable values evaluated at runtime.
- **[const](const.md)**: Compile-time constant expressions.
- **[override](override.md)**: Pipeline-creation constants configured at pipeline setup time on the CPU.
- **[var-function](var-function.md)**: Mutable local variables allocated in the `function` address space.
- **[var-private](var-private.md)**: Module-scope variables unique to each invocation in the `private` address space.
- **[var-workgroup](var-workgroup.md)**: Shared memory accessible across a single workgroup in the `workgroup` address space.
- **[var-uniform](var-uniform.md)**: Read-only bindings in the `uniform` address space.
- **[var-storage](var-storage.md)**: High-capacity buffers in the `storage` address space (can be read-only or read-write).
- **[var-handle](var-handle.md)**: Opaque resource handles such as textures and samplers.
- **[shadowing](shadowing.md)**: Understand name shadowing rules within different scopes.

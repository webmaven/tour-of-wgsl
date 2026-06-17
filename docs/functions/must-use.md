---
title: '@must_use'
shader: ./must-use.wgsl
---

A function with a return type may be marked with the `@must_use` attribute, which makes it a
compile time error if there is a statement that is _just_ a call to that function.

In other words, the value resulting from calling that function must be _used_ for some purpose:

- in a larger expression,
- in an assignment or declaration, or
- to manage control flow, etc.

Many of the builtin functions are marked as `@must_use`.

---
title: 'Expressions'
---

An expression in WGSL can evaluate to a value, type, function, or builtin enumerator. Value expressions are categorized by operators and their evaluation stages:

- **[Operators](operators/index.md)**: Explore the arithmetic, logical, comparison, bitwise, and assignment operators.
- **[Evaluation Stages](evaluation-stage/index.md)**: Learn about the stages in which expressions are evaluated:
  - **[Overview](evaluation-stage/overview/index.md)**: Understand how the compilation pipeline classifies expressions.
  - **[Constant Stage](evaluation-stage/constant/index.md)**: Expressions evaluated at compile time.
  - **[Override Stage](evaluation-stage/override/index.md)**: Expressions evaluated during pipeline creation on the CPU.
  - **[Runtime Stage](evaluation-stage/runtime/index.md)**: Expressions evaluated during shader execution on the GPU.

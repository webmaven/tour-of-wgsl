---
title: 'Uniformity Analysis'
---

Uniformity analysis is a static safety check in WGSL to ensure certain operations are executed safely:

- **[Invocations](invocations.md)**: Learn how multiple shader invocations execute, and what "uniform" vs. "non-uniform" control flow means.
- **[Fragment Derivative Builtins](fragment-derivative-builtins.md)**: Explore why derivative builtins (like `dpdx`, `dpdy`, and texture sampling with implicit derivatives) must be invoked inside uniform control flow to avoid undefined results.

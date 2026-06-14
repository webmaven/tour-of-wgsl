---
title: "Loop Statements"
---

## Loop Statements

Loop statements in WGSL are used to execute a block of code repeatedly. WGSL supports several types of loop constructs, including `for`, `while`, and `loop` statements.

### `for` Loop

The `for` loop is used to iterate over a range of values. It consists of an initialization, a condition, and an increment expression.

**Syntax:**
```wgsl
for (initializer; condition; increment) {
    // loop body
}
```

**Example:**
```wgsl
for (var i: i32 = 0; i < 10; i = i + 1) {
    // Code to execute in each iteration
}
```

### `while` Loop

The `while` loop continues to execute as long as the condition is true.

**Syntax:**
```wgsl
while (condition) {
    // loop body
}
```

**Example:**
```wgsl
var i: i32 = 0;
while (i < 10) {
    // Code to execute in each iteration
    i = i + 1;
}
```

### `loop` Statement

The `loop` statement is a more flexible loop construct that can be controlled using `break` and `continue` statements.

**Syntax:**
```wgsl
loop {
    // loop body
    if (condition) {
        break;
    }
}
```

**Example:**
```wgsl
var i: i32 = 0;
loop {
    // Code to execute in each iteration
    if (i >= 10) {
        break;
    }
    i = i + 1;
}
```

### Controlling Loop Execution

- **`break`**: Exits the loop immediately.
- **`continue`**: Skips the rest of the loop body and proceeds to the next iteration.

**Example: Using `break` and `continue`:**
```wgsl
for (var i: i32 = 0; i < 10; i = i + 1) {
    if (i == 5) {
        continue; // Skip the rest of the loop body when i is 5
    }
    if (i == 8) {
        break; // Exit the loop when i is 8
    }
    // Code to execute in each iteration
}
```

### Summary

Loop statements in WGSL provide powerful constructs for repeating code execution. By using `for`, `while`, and `loop` statements, you can control the flow of your shader programs effectively.

* `for` loop: Iterates over a range of values.
* `while` loop: Continues as long as the condition is true.
* `loop` statement: A flexible loop controlled with `break` and `continue`.

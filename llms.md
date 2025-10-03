---
description: "Use TS Markdown for generating dynamic markdown."
globs: "*.tsmd"
alwaysApply: false
---

# TS Markdown

TS Markdown is a TypeScript-based framework for generating dynamic markdown. It uses a functional JSX-like syntax within `.tsmd` files.

`.tsmd` files are transpiled into native Typescript `.ts`. 
`export` functions for use in the external application.

## Core Concepts

Markdown blocks return a multi-line block wrapped in `()` from a function.
```tsmd
export function Doc() {
  return (
    # Title
    My content.
  )
}
```
*Renders to:*
```md
# Title
My content
```

Dynamic Interpolation use `{{ expression }}` to embed the result of any TypeScript expression.
Example: `Version: {{ getVersion() }}`

Conditional Rendering use `&&` or ternary operators inside `{{ }}`. Falsy values (`false`, `undefined`, `0`) render nothing.
  - `{{ null }}` removes the preceding empty line, useful for cleaning up whitespace.

List Rendering use `array.map()` inside an interpolation. Each item is rendered on a new line.
```tsmd
const items = ['A', 'B'];
return (
  Items:
  {{ items.map(item => (
    - {{ item }}
  )) }}
)
```
*Renders to:*
```md
Items:
- A
- B
```

Components A component is a TypeScript function that accepts props and returns a TSM block. Use with `<@ComponentName prop="value" />`.
```tsmd
function UserBadge(props: { name: string }) {
  return (
    **{{ props.name }}**
  )
}

function Document() {
  return (
    User: <@UserBadge name="Alex" />
  )
}
```

Comments lines starting with `//` inside a TSM block are ignored and no empty space is rendered.
```tsmd
function doc() {
  return (
    # Title
    // This is a comment so this line will not be in the output.
    My content.
  )
}
```
*Renders to*:
```markdown
# Title
My content.
```
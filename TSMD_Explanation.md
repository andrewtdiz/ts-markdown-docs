# TS Markdown: Dynamic Markdown in TypeScript

TS Markdown (TSM) is a framework that lets you write Markdown with the full power of TypeScript. It's designed to be intuitive, allowing you to embed dynamic data, logic, and reusable components directly into your markdown files, which are then converted into standard markdown strings.

Think of it as JSX, but for generating Markdown.

## Getting Started: Your First TSM File

Creating dynamic markdown is as simple as writing a TypeScript function that returns a markdown block. TSM files use the `.tsm` or `.tsm.ts` extension.

To return markdown, simply wrap it in parentheses `()` within a `return` statement.

```typescript
// greeting.tsm.ts
function getGreeting() {
  const user = "World";
  return (
    # Hello, {{user}}!

    Welcome to TS Markdown. This is a regular markdown paragraph.
  )
}
```

## Core Concepts

### 1. Dynamic Content with `{{ }}`

You can embed any TypeScript variable or expression directly into your markdown using double curly braces `{{ }}`.

```typescript
// dynamic.tsm.ts
function showDynamicContent() {
  const version = "1.0";
  return (
    ## Version {{ version }}
    
    This document was generated on: {{ new Date().toLocaleDateString() }}.
  )
}
```

### 2. Conditional Rendering

Use standard JavaScript conditional logic within expressions to control what content gets rendered. Falsy values (`false`, `null`, `undefined`, `0`) render nothing, keeping your output clean.

```typescript
// conditional.tsm.ts
function showAuthMessage(isLoggedIn: boolean) {
  return (
    {{ isLoggedIn && (
      **Success!** You are logged in.
    )}}

    {{ !isLoggedIn ? (
      *Please log in to continue.*
    ) : (
      *You have access to all content.*
    )}}
  )
}
```

**Pro Tip:** To remove a preceding empty line, you can return `null`. This is useful for cleaning up whitespace around conditional blocks.

```typescript
function example() {
  const showDetails = false;
  return (
    # Summary
    
    {{ showDetails ? (
      This is the detailed view.
    ) : null }}

    This text will appear directly after the summary heading if details are not shown.
  )
}
```

### 3. Rendering Lists from Arrays

You can easily generate lists by using `.map()` on an array. TSM automatically handles placing each item on a new line.

```typescript
// list.tsm.ts
function featureList() {
  const features = ["Dynamic Content", "Components", "Conditional Logic"];
  return (
    ### Key Features

    {{ features.map(feature => `- ${feature}`) }}
  )
}
```

### 4. Reusable Components with `<@... />`

For more complex and reusable content, you can create components. A component is just a TypeScript function that returns a TSM block. You can call it using a special tag syntax: `<@ComponentName />`.

You can also pass props to your components, just like in React or Vue.

**Defining a Component:**
```typescript
// components.tsm.ts
interface AlertProps {
  type: 'success' | 'error';
  message: string;
}

function Alert(props: AlertProps) {
  const { type, message } = props;
  const title = type === 'success' ? "Success" : "Error";
  return (
    > **{{ title }}**
    > {{ message }}
  )
}
```

**Using the Component:**
```typescript
// main.tsm.ts
import { Alert } from './components';

function mainContent() {
  return (
    # System Status

    <@Alert type="success" message="Everything is running smoothly." />

    <@Alert type="error" message="Failed to load user data." />
  )
}
```

## Advanced Tips

### Authoring Comments

You can add comments within your TSM blocks using `//`. These comments will not appear in the final rendered markdown.

```typescript
function withComments() {
  return (
    # My Document
    // This is a comment and will be ignored.
    This is real content that will be rendered.
  )
}
```

### Whitespace and Indentation

TSM is smart about indentation. It automatically detects the baseline indentation of your code block and strips it from the output, so you can write markdown naturally without worrying about extra whitespace. Any intentional indentation you add *beyond* the baseline is preserved.

# Test TSMD Language

Here's a simple TypeScript code block:

```typescript
function hello(name: string): string {
  return `Hello, ${name}!`;
}

const result = hello("World");
console.log(result);
```

Now let's test the TSMD language:

```tsmd
function createGreeting(name: string) {
  return (
    # Hello {{ name }}!

    Welcome to TS Markdown! This is a **bold** statement.

    {{ name === 'World' ? (
      You are from Earth! 🌍
    ) : (
      You are from somewhere else! 🚀
    ) }}

    ## Features

    - Dynamic content: {{ name }}
    - Conditional rendering
    - **Bold text**
    - *Italic text*
  )
}

// Test the function
const greeting = createGreeting("World")
console.log(greeting)
```

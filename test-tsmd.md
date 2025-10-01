# TS Markdown Docs

A type-safe, component based markdown engine for embedding markdown content with TypeScript.
Create dynamic, template-driven markdown with full type support.

## ✨ Features

1. **TypeScript Integration** - Full TypeScript support with type checking and IntelliSense
2. **Template Interpolation** - Dynamic content with `{{ expression }}` syntax
3. **Conditional Rendering** - Smart conditional blocks with ternary operators and logical AND
4. **Developer Tools** - Comprehensive CLI, VS Code extension, and testing utilities
Now let's test the TS Markdown language:

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

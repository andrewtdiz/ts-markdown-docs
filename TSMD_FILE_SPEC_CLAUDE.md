# TypeScript-Markdown (TSM) Syntax Specification

## Overview

TypeScript-Markdown (TSM) is a syntax extension that allows embedding markdown content within TypeScript functions using special block expressions. TSM files (`.tsmd`) contain standard TypeScript code with embedded markdown blocks that are transpiled to produce markdown strings.

## File Structure

TSM files are standard TypeScript files with the `.tsmd` extension that can contain:
- Standard TypeScript code (imports, exports, functions, classes, etc.)
- TSM block expressions within function bodies
- Standard TypeScript control flow and async/await patterns

## TSM Block Expressions

### Basic Block Syntax

TSM blocks are defined using parentheses `()` containing markdown content:

```ts
return (
  # Header
  - List item
  {{ expression }}
)
```

## Text Content

### Literal Text

Any text content within TSM blocks is treated as literal markdown and preserved exactly as written, including:
- Headers (`#`, `##`, `###`, etc.)
- Lists (`-`, `*`, `1.`, etc.)
- Emphasis (`**bold**`, `*italic*`, `` `code` ``)
- Links, images, and other markdown syntax
- Indentation and whitespace

### Comments

Lines beginning with `//` inside TSM blocks are treated as authoring comments and are not emitted in the output:

```ts
return (
  # Header
  // This comment won't appear in output
  - List item
)
```

## Interpolations

### Basic Interpolation

Use `{{ expression }}` to embed TypeScript expressions within markdown:

```ts
return (
  # Hello {{ name }}
  - Status: {{ status }}
  - Count: {{ count }}
)
```

### Expression Types

Interpolations can contain any valid TypeScript expression:
- Variables: `{{ user.name }}`
- Function calls: `{{ formatDate(date) }}`
- Computed properties: `{{ data[key] }}`
- Complex expressions: `{{ user.isActive ? 'Active' : 'Inactive' }}`

### Falsy Values

When interpolations evaluate to falsy values (`false`, `null`, `undefined`, `""`), they emit nothing and do not leave placeholder whitespace:

```ts
return (
  - Name: {{ name }}        // If name is null, no "Name: " text appears
  - Status: {{ status }}    // If status is false, no "Status: " text appears
)
```

### Type Conversion

- **Strings**: Emitted as-is
- **Numbers/Booleans**: Converted to strings using `String(value)`
- **Objects**: Call `.toString()` method
- **Arrays**: Converted to strings (joined with commas by default)

## Conditional Rendering

### Ternary Operator

Use ternary operators for conditional content:

```ts
return (
  {{ user.isAdmin ? (
    # Admin Panel
    - Manage users
    - System settings
  ) : (
    # User Panel
    - View profile
    - Settings
  ) }}
)
```

### Logical AND

Use `&&` for conditional rendering:

```ts
return (
  # Dashboard
  {{ user.isAdmin && (
    - Admin tools
    - User management
  ) }}
  {{ !user.isActive && (
    **Warning**: Account is inactive
  ) }}
)
```

### Nested Conditionals

Conditionals can be nested and combined:

```ts
return (
  {{ user.isAdmin ? (
    # Admin View
    {{ system.isMaintenance && (
      **System Maintenance Mode**
    ) }}
    - Admin tools
  ) : (
    # User View
    - User tools
  ) }}
)
```

## Line Erase Escape

Use `{{ null }}` to remove the previously emitted empty line:

```ts
return (
  # Header
  
  {{ null }}  // Removes the empty line above
  Content here
)
```

This is useful for conditional spacing where you want to remove trailing empty lines when certain content is not rendered.

## Components

### Self-Closing Components

Use `<@ComponentName/>` to call component functions:

```ts
return (
  # Dashboard
  <@Header />
  <@UserList />
  <@Footer />
)
```

### Components with Props

Pass props to components using attributes:

```ts
return (
  <@UserCard 
    name="John Doe" 
    age={25} 
    isActive={true}
  />
)
```

### Dynamic Props

Props can use expressions:

```ts
return (
  <@UserCard 
    name={{ user.name }} 
    age={{ user.age }} 
    isActive={{ user.isActive }}
  />
)
```

### Component Return Types

Components should return:
- `string` - Markdown content
- `null`/`undefined`/`false` - No output
- `Promise<string>` - Async markdown content
- `Iterable<string>` - Streaming content (future)

## XML Groups

### Structural Wrappers

Use XML-style tags like `<content>...</content>` for structural grouping without output:

```ts
return (
  # Main Content
  <content>
    - Item 1
    - Item 2
    {{ dynamicContent }}
  </content>
)
```

XML groups are purely structural and do not emit any wrapper tags in the output.

## Whitespace and Indentation

### Preservation

TSM preserves author indentation and whitespace exactly as written:

```ts
return (
  # Header
    - Indented item
      - Nested item
  
  Another section
)
```

### Falsy Spacing

When interpolations are falsy, surrounding whitespace is handled intelligently:
- Leading/trailing spaces around falsy interpolations are not emitted
- Spaces between text and falsy interpolations are preserved only if they're not at line boundaries

## Async Support

### Async Functions

TSM blocks work within async functions and can await component calls:

```ts
async function generateReport() {
  const data = await fetchData();
  
  return (
    # Report
    - Data: {{ data.count }} items
    <@AsyncChart data={{ data }} />
  )
}
```

### Async Components

Components can be async and return Promises:

```ts
async function AsyncChart({ data }) {
  const chartData = await processData(data);
  return `![Chart](${chartData.url})`;
}
```

## Error Handling

### Common Errors

- **Unbalanced braces**: `{{ expression` (missing closing `}}`)
- **Unmatched tags**: `<@Component>` without closing or self-closing
- **Missing imports**: Using `<@Component/>` without importing `Component`
- **Invalid expressions**: Syntax errors within `{{ }}`

### Type Safety

TSM maintains TypeScript's type checking for:
- Variable references in interpolations
- Component prop types
- Function return types
- Import/export statements

## File Processing

### Input Processing

1. Parse TypeScript code normally
2. Identify TSM block expressions within function bodies
3. Parse markdown content within blocks
4. Transform blocks to runtime calls
5. Emit standard TypeScript

### Output

TSM files are transpiled to standard TypeScript files that:
- Import runtime helpers (`__tsm`, `__tsmJoin`, `__erasePrevLine`)
- Replace TSM blocks with function calls
- Preserve all original TypeScript logic
- Return markdown strings from functions

## Examples

### Complete Example

```ts
import { User } from './types';
import { formatDate } from './utils';
import { UserCard, AdminPanel } from './components';

async function generateUserReport(user: User) {
  if (!user) {
    return (
      **Error**: No user data available
      
      {{ null }}
    );
  }

  return (
    # User Report
    
    ## Basic Information
    - Name: {{ user.name }}
    - Email: {{ user.email }}
    - Created: {{ formatDate(user.createdAt) }}
    
    {{ user.isAdmin ? (
      <@AdminPanel user={{ user }} />
    ) : (
      <@UserCard user={{ user }} />
    ) }}
    
    {{ !user.isActive && (
      **Warning**: This user account is inactive
    ) }}
    
    <content>
      Generated on {{ new Date().toISOString() }}
    </content>
  );
}
```

This specification covers all the essential syntax elements of TSM, providing a complete reference for writing TSM files without implementation details.

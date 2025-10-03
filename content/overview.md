---
title: What is TS Markdown?
description: TS Markdown is a type component-based markdown engine.
date: 2024-01-15
author: TS Markdown Team
tags: [overview, introduction, typescript, markdown, beginner]
---

TS Markdown is a type component-based markdown engine.

It allows you to write markdown using TypeScript functions and components, ensuring that all your content is type-checked and easy to manage. This approach is great for building documentation, generating reports, or any other content that needs to be dynamic and maintainable.

## Why TS Markdown?

- **Type Safety**: Catch errors at compile time, not runtime. With full TypeScript integration, you get autocomplete and type-checking for all your markdown content.
- **Component-Based**: Build reusable components for your markdown, just like you would in a modern frontend framework.
- **Dynamic Content**: Easily insert variables, render content conditionally, and map over data to generate dynamic markdown.

## Basic Example

```tsmd
function Profile({ user }: { user: User }) {
  
  return (
    # {{ user.name }}'s Profile

    <@ProfileDetailView user={user} />

    Skills:
    {{ user.skills.map(skill => (
      - {{ skill }}
    ))}}
  )
}
```

This generates clean markdown like:

```markdown
# Alice's Profile

Role: Senior Engineer
Experience: 8 years
Status: Active ✅

Skills:
- React
- TypeScript
- Bun
```

## Key Features

- **Markdown Blocks**: Write multi-line markdown directly in TypeScript with `return ( ... )`
- **Dynamic Interpolation**: Use `{{ variable }}` for dynamic content
- **Conditional Rendering**: `{{ condition ? (content) : (alternative) }}`
- **Component Integration**: `<@ComponentName props={...} />` for reusable components
- **Type Safety**: Full TypeScript integration with autocomplete and error checking

## Use Cases

TS Markdown can be used for:
- **LLM API calls** with dynamic content
- **MCP Servers** 
- **Tool call responses**
- **llms.txt** formatting

Start writing markdown in TypeScript today - it's faster, cleaner, and more maintainable than traditional approaches!

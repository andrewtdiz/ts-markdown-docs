---
title: Markdown Blocks
description: Learn how to write multi-line markdown directly in TypeScript functions
date: 2024-01-15
author: TS Markdown Team
tags: [syntax, markdown-blocks, basics]
---

The core feature of TS Markdown is the ability to write **multi-line markdown directly in TypeScript functions**. This eliminates the need for template strings or separate markdown files while maintaining full type safety.

## Basic Structure

A markdown block is created using a `return` statement with parentheses containing your markdown:

```typescript
function simpleMessage() {
  return (
    # Hello World
    This is a simple markdown block.
  )
}
```

## Why Use Markdown Blocks?

**Saves Time**: No need to concatenate strings or manage complex template systems
**Readable**: Your content stays in your code, making it easy to maintain
**Type Safe**: Full TypeScript integration with autocomplete and error checking
**Flexible**: Mix static content with dynamic variables and logic

## Common Elements

### Headings

```typescript
function documentHeader(title: string, level: number) {
  return (
    {{ level === 1 ? '#' : level === 2 ? '##' : '###' }} {{ title }}

    Some introductory text here.
  )
}
```

### Lists

```typescript
function todoList(items: string[]) {
  return (
    ## Todo List
    {{ items.map(item => (
      - {{ item }}
    )) }}
  )
}
```

### Code Blocks

```typescript
function codeExample(language: string, code: string) {
  return (
    Here's some {{ language }} code:

    ```{{ language }}
    {{ code }}
    ```
  )
}
```

### Tables

```typescript
function dataTable(rows: Array<{ name: string; value: string }>) {
  return (
    | Name | Value |
    |------|--------|
    {{ rows.map(row => (
      | {{ row.name }} | {{ row.value }} |
    )) }}
  )
}
```

## Real-World Example

Here's a complete example of a markdown block in action:

```typescript
interface BlogPost {
  title: string
  author: string
  publishedAt: string
  tags: string[]
  content: string
  readTime: number
}

function createBlogPost(post: BlogPost) {
  return (
    ---
    title: {{ post.title }}
    author: {{ post.author }}
    date: {{ post.publishedAt }}
    tags: [{{ post.tags.join(', ') }}]
    ---

    # {{ post.title }}

    **By {{ post.author }}** • {{ post.publishedAt }} • {{ post.readTime }} min read

    {{ post.tags.map(tag => (`#{{ tag }}`)).join(' ') }}

    {{ post.content }}

    ---

    **Tags:** {{ post.tags.join(', ') }}
    **Read Time:** {{ post.readTime }} minutes
  )
}
```

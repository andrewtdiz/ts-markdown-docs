---
title: Complete Syntax Guide
description: Comprehensive reference for all TS Markdown syntax and features
date: 2024-01-15
author: TS Markdown Team
tags: [syntax, reference, guide, complete]
---

This guide covers all TS Markdown syntax, from basic markdown blocks to advanced features.

## Basic Structure

### Markdown Blocks

TS Markdown content is written in **markdown blocks** using `return ( ... )`:

```typescript
function simpleContent() {
  return (
    # Hello World
    This is a simple markdown block.
  )
}
```

## Dynamic Content

### Variable Interpolation

Insert variables using `{{ variable }}`:

```typescript
function userProfile(user: User) {
  return (
    # {{ user.name }}

    **Email:** {{ user.email }}
    **Age:** {{ user.age }}
  )
}
```

### Expressions

Use any valid TypeScript expression:

```typescript
function calculations(data: Data) {
  return (
    # Results

    **Total:** {{ data.items.reduce((sum, item) => sum + item.value, 0) }}
    **Average:** {{ (data.total / data.count).toFixed(2) }}
    **Formatted:** {{ data.title.toUpperCase() }}
  )
}
```

### String Methods

```typescript
function stringOperations(text: string) {
  return (
    # String Operations

    **Original:** {{ text }}
    **Uppercase:** {{ text.toUpperCase() }}
    **Length:** {{ text.length }}
    **Substring:** {{ text.substring(0, 10) }}
  )
}
```

## Conditional Rendering

### Ternary Operator

```typescript
function conditionalContent(user: User) {
  return (
    # Status

    {{ user.isActive ? (
      You're active! ✅
    ) : (
      Account inactive.
    ) }}
  )
}
```

### Logical AND

```typescript
function optionalContent(user: User) {
  return (
    # Dashboard

    {{ user.hasNotifications && (
      You have {{ user.notificationCount }} notifications.
    ) }}
  )
}
```

### Nested Conditions

```typescript
function complexLogic(user: User, data: Data) {
  return (
    {{ user.isPremium ? (
      {{ data.items.length > 10 ? (
        Premium with many items
      ) : (
        Premium with few items
      ) }}
    ) : (
      Standard account
    ) }}
  )
}
```

## Components

### Basic Components

```typescript
function MyComponent({ title }: { title: string }) {
  // Note: Styling has been removed as it relies on HTML.
  return (
    ## {{ title }}
    Component content here.
  )
}

function page() {
  return (
    # My Page

    <@MyComponent title="Getting Started" />
  )
}
```

### Components with Props

```typescript
function Card({ title, children }: { title: string; children: any }) {
  // Note: Styling has been removed as it relies on HTML.
  return (
    ## {{ title }}
    {{ children }}
  )
}
```

### Self-Closing Components

```typescript
function Icon({ name }: { name: string }) {
  return ({{ name }})
}
```

## Lists and Iteration

### Array Mapping

```typescript
function itemList(items: Item[]) {
  return (
    ## Items:
    {{ items.map(item => (
      - {{ item.name }}: {{ item.value }}
    )) }}
  )
}
```

### Filtered Lists

```typescript
function activeItems(items: Item[]) {
  return (
    ## Active Items:
    {{ items.filter(item => item.isActive).map(item => (
      - {{ item.name }}
    )) }}
  )
}
```

### Nested Lists

```typescript
function nestedList(data: Data) {
  return (
    {{ data.categories.map(category => (
      ### {{ category.name }}
      {{ category.items.map(item => (
        - {{ item.name }}
      )) }}
    )) }}
  )
}
```

## Tables

### Dynamic Tables

```typescript
function dataTable(data: Data[]) {
  return (
    | Name | Value | Status |
    |------|--------|--------|
    {{ data.map(row => (
      | {{ row.name }} | {{ row.value }} | {{ row.isActive ? 'Active' : 'Inactive' }} |
    )) }}
  )
}
```

### Conditional Table Rows

```typescript
function filteredTable(items: Item[]) {
  return (
    | Name | Value |
    |------|--------|
    {{ items.filter(item => item.value > 10).map(item => (
      | {{ item.name }} | {{ item.value }} |
    )) }}
  )
}
```

## Styling

### Inline Styles

```typescript
function styledContent(user: User) {
  // Note: Styling has been removed as it relies on HTML.
  return (
    **Status:** {{ user.isActive ? 'Active' : 'Inactive' }}
  )
}
```

### Dynamic Styles

```typescript
function dynamicStyling(percentage: number) {
  // Note: Styling has been removed as it relies on HTML.
  return (
    Progress: {{ percentage }}%
  )
}
```

## Code Blocks

### Dynamic Code

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

### Code with Variables

```typescript
function apiExample(endpoint: string, method: string) {
  return (
    ```javascript
    fetch('{{ endpoint }}', {
      method: '{{ method }}',
      headers: { 'Content-Type': 'application/json' }
    })
    ```
  )
}
```

## Links and URLs

### Dynamic Links

```typescript
function linkGenerator(user: User) {
  return (
    # Profile

    [View Profile]({{ `/users/${user.id}` }})
    [Settings]({{ `/settings?user=${user.id}` }})

    {{ user.isAdmin ? (
      [Admin Panel]({{ '/admin' }})
    ) : null }}
  )
}
```

### External Links

```typescript
function socialLinks(user: User) {
  return (
    [GitHub]({{ user.githubUrl }})
    [Twitter]({{ user.twitterUrl || 'https://twitter.com' }})
  )
}
```

## Comments and Whitespace

### Comments in Markdown

```typescript
function documentedContent() {
  return (
    # My Content

    <!-- This is a comment -->

    Regular content here.

    <!--
      Multi-line comment
      explaining this section
    -->
  )
}
```

### Line Breaks

```typescript
function formattedText() {
  return (
    Line 1
    Line 2
    Line 3
  )
}
```

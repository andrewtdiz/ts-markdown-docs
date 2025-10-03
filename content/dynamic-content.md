---
title: Dynamic Content
description: Insert variables, expressions, and dynamic values in your TS Markdown
date: 2024-01-15
author: TS Markdown Team
tags: [syntax, dynamic-content, variables, expressions]
---

TS Markdown makes it easy to insert **dynamic values** into your markdown using `{{ }}` interpolation. This allows you to display variables, call functions, and include any valid TypeScript expression directly in your content.

## Basic Interpolation

Insert variables directly into your markdown:

```tsmd
function userGreeting(user: { name: string; title: string }) {
  return (
    # Welcome {{ user.name }}!

    You're logged in as a {{ user.title }}.
  )
}
```

### Variable Types

TS Markdown handles different variable types automatically:

```tsmd
function mixedTypes(user: User) {
  return (
    # {{ user.name }}

    **Age:** {{ user.age }}
    **Active:** {{ user.isActive }}
    **Joined:** {{ user.joinedAt }}
    **Score:** {{ user.score.toFixed(2) }}
  )
}
```

## Expressions and Functions

Use any valid TypeScript expression within `{{ }}`:

```tsmd
function withExpressions(data: Data) {
  return (
    # Report for {{ data.title.toUpperCase() }}

    **Total Items:** {{ data.items.length }}
    **Average:** {{ data.items.reduce((a, b) => a + b, 0) / data.items.length }}
    **Last Updated:** {{ new Date().toLocaleDateString() }}
  )
}
```

## String Formatting

Combine static text with dynamic content:

```tsmd
function formattedContent(user: User, stats: Stats) {
  return (
    # Hello {{ user.name }}!

    You've completed {{ stats.completedTasks }} out of {{ stats.totalTasks }} tasks
    ({{ (stats.completedTasks / stats.totalTasks * 100).toFixed(1) }}% complete).

    Your current streak: {{ stats.streakDays }} days 🔥
  )
}
```

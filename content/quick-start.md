---
title: Quick Start Guide
description: Get up and running with TS Markdown in just a few minutes
date: 2024-01-15
author: TS Markdown Team
tags: [quick-start, tutorial, getting-started]
---

Get started with TS Markdown in 3 simple steps.

## Step 1: Create Your First TS Markdown File

Create a file in `/tsmd`. For example `/tsmd/Greeting.ts`:

```tsmd
export function Greeting({ name }: { name: string }) {
  return (
    # Hello, {{ name }}

    Welcome to your first TS Markdown document.
  )
}
```

## Step 2: Transpile into TS

Since TS Markdown outputs plain TypeScript, you can run your code directly with Bun, Node, or any other TypeScript runtime:

```shell
npm run tsmd
```

## Step 3: Call the TS Markdown Function

Now you can use the `Greeting` function just like any other TypeScript function:

```ts
import { Greeting } from "./tsmd-generated/Greeting"

const markdown = Greeting({ name: 'World' });

console.log(markdown);
```

Output:

```markdown
# Hello, World!

Welcome to your first TS Markdown document.
```

That's it! You've created your first dynamic markdown document using TS Markdown.

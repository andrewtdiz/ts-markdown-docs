---
title: Quick Start Guide
description: Get up and running with TS Markdown in just a few minutes
date: 2024-01-15
author: TS Markdown Team
tags: [quick-start, tutorial, getting-started]
---

Get started with TS Markdown in 3 simple steps.

## Step 1: Create Your First TSM File

Create a file in `/tsmd` named `greeting.ts`:

```ts
import { TSM } from 'ts-markdown';

function Greeting({ name }: { name: string }) {
  return TSM`
    # Hello, ${name}!

    Welcome to your first TS Markdown document.
  `;
}
```

## Step 2: Use Your TSM Function

Now you can use the `Greeting` function just like any other TypeScript function:

```ts
const markdown = Greeting({ name: 'World' });

console.log(markdown);
```

## Step 3: Run Your Code

Since TS Markdown is just TypeScript, you can run your code directly with Bun, Node, or any other TypeScript runtime:

```shell
bun run hello.ts
```

Output:

```markdown
# Hello, World!

Welcome to your first TS Markdown document.
```

That's it! You've created your first dynamic markdown document using TS Markdown. No special compilers or build steps are needed.

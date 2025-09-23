---
title: Quick Start Guide
description: Get up and running with TS Markdown in just a few minutes
date: 2024-01-15
author: TS Markdown Team
tags: [quick-start, tutorial, getting-started]
---

Get started with TS Markdown in 3 simple steps.

## Step 1: Create Your First TSM File

Create a file called `welcome.tsmd`:

```typescript
// welcome.tsmd
import { getUser } from './api.js'

async function WelcomeMessage(userId: string) {
  const user = await getUser(userId)

  return (
    # Welcome {{ user.isNew ? 'back' : 'aboard' }}, {{ user.name }}! 👋

    {{ user.isNew ? (
      Thanks for joining us! Let's get you started:
    ) : (
      Great to see you again! Here's what's new:
    ) }}

    - Check out our latest features
    - Update your profile settings
    {{ user.isNew ? '- Complete your onboarding' : '- Review recent changes' }}

    <@UserStatus user={user} />
  )
}

export default WelcomeMessage
```

## Step 2: Transpile Your Code

Run the TSMD transpiler:

```shell
bun run tsmd welcome.tsmd
```

This creates `welcome.ts` that produces markdown strings:

```typescript
// welcome.ts (generated)
import { getUser } from './api.js'
import { UserStatus } from './UserStatus.js'

async function WelcomeMessage(userId: string): Promise<string> {
  const user = await getUser(userId)

  return __tsm([
    "# Welcome ", (user.isNew ? "back" : "aboard"), ", ", user.name, "! 👋\n",
    (user.isNew ? __tsm([
      "Thanks for joining us! Let's get you started:\n"
    ]) : __tsm([
      "Great to see you again! Here's what's new:\n"
    ])),
    "- Check out our latest features\n",
    "- Update your profile settings\n",
    (user.isNew ? "- Complete your onboarding\n" : "- Review recent changes\n"),
    await UserStatus({ user })
  ])
}

export default WelcomeMessage
```

## Step 3: Use Your Generated Function

Now use it like any TypeScript function:

```typescript
// app.ts
import WelcomeMessage from './welcome.js'

const markdown = await WelcomeMessage('user123')
console.log(markdown)

// Output:
// # Welcome back, Alice! 👋
// Great to see you again! Here's what's new:
// - Check out our latest features
// - Update your profile settings
// - Review recent changes
// [User status rendered by UserStatus component]
```

## Core Syntax

### Dynamic Content

```typescript
function UserProfile(user: User) {
  return (
    # {{ user.name }}'s Profile
    **Role:** {{ user.role }}
    **Location:** {{ user.city }}, {{ user.country }}
  )
}
```

### Conditional Rendering

```typescript
function StatusMessage(user: User) {
  return (
    {{ user.isActive ? (
      You're all set! ✅
    ) : (
      Please activate your account first.
    ) }}
  )
}
```

### Components

```typescript
function Dashboard(data: Data) {
  return (
    <@UserProfile user={data.user} />
    <@RecentActivity items={data.activity} />
  )
}
```

## Simple Examples

### Basic Template

```typescript
function Hello(name: string) {
  return (
    # Hello {{ name }}!
    How are you today?
  )
}
```

### With Data

```typescript
function Report(user: User, posts: Post[]) {
  return (
    # Report for {{ user.name }}

    **Posts:** {{ posts.length }}
    **Last Active:** {{ user.lastActive }}

    {{ posts.length > 0 ? (
      ## Recent Posts:
      {{ posts.slice(0, 5).map(post => (
        - {{ post.title }} ({{ post.date }})
      )) }}
    ) : (
      No posts yet.
    ) }}
  )
}
```

### Error Handling

```typescript
function SafeTemplate(data: Data | null) {
  return (
    {{ data ? (
      # Welcome {{ data.user.name }}!
      Content based on data...
    ) : (
      # Error
      Unable to load user data. Please try again.
    ) }}
  )
}
```

## Next Steps

1. **[Syntax Guide](syntax-guide)** - Learn all TSMD features
2. **[Components](components)** - Create reusable components
3. **[Best Practices](best-practices)** - Write clean TSM code

**Quick Start Complete!** You can now write markdown in TypeScript functions.

---
title: Components
description: Create reusable components in TS Markdown with <@ComponentName /> syntax
date: 2024-01-15
author: TS Markdown Team
tags: [syntax, components, reusability, modularity]
---

TS Markdown components let you create **reusable pieces of content** using the `<@ComponentName />` syntax. This keeps your code DRY (Don't Repeat Yourself) and makes complex layouts maintainable.

## Basic Component Usage

Define a component function and use it in your markdown:

```tsmd
// Define a component
function UserCard({ user }: { user: User }) {
  return (
    **Name:** {{ user.name }}
    **Email:** {{ user.email }}
    **Status:** {{ user.isActive ? '✅ Active' : '⏸️ Inactive' }}
  )
}

// Use the component
function userList(users: User[]) {
  return (
    # Our Users

    {{ users.map(user => (
      <@UserCard user={user} />
    )) }}
  )
}
```

## Component Props

Pass data to components using props:

```tsmd
function StatusBadge({ status, type }: { status: string; type?: 'success' | 'warning' | 'error' }) {

  return (
    {{ type === "success" && "Great job!" }}
    {{ type === "warning" && "Uh oh" }}
    {{ type === "error" && (
        Oops!
        We made an error
    ) }}
    Status: {{ status }}
  )
}

function Dashboard({ info }: { info: DashboardInfo }) {
  return (
    # Dashboard

    **Server Status:** <@StatusBadge status={info.serverStatus} type={info.ok ? 'success' : 'error'} />
  )
}
```

## Component Children

Components can accept child content:

```tsmd
function Card({ title, children }: { title: string; children: any }) {
  return (
      ## {{ title }}
      {{ children }}
  )
}

function layout() {
  return (
    # My Layout

    <@Card title="Getting Started">
      Welcome to our platform! Here's how to get started:
      - Step 1: Create account
      - Step 2: Set preferences
      - Step 3: Start using
    </@Card>

    <@Card title="Pro Tips">
      Here are some advanced tips to improve your workflow.
    </@Card>
  )
}
```

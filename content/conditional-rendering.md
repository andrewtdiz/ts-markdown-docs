---
title: Conditional Rendering
description: Show or hide content based on conditions in TS Markdown
date: 2024-01-15
author: TS Markdown Team
tags: [syntax, conditional-rendering, logic, control-flow]
---

TS Markdown's conditional rendering lets you **show or hide content** based on data conditions. Use familiar JavaScript syntax like ternary operators (`? :`) and logical operators (`&&`, `||`) to control what content appears.

## Basic Conditional Rendering

The most common pattern is the **ternary operator**:

```typescript
function statusMessage(user: User) {
  return (
    # Welcome {{ user.name }}!

    {{ user.isActive ? (
      You're all set! ✅ Ready to continue.
    ) : (
      Please activate your account to get started.
    ) }}
  )
}
```

## Ternary Operator (`? :`)

Use `condition ? trueContent : falseContent` to choose between two options:

```typescript
function userProfile(user: User) {
  return (
    # {{ user.name }}'s Profile

    **Account Type:** {{ user.isPremium ? 'Premium' : 'Free' }}
    **Status:** {{ user.isActive ? 'Active' : 'Inactive' }}

    {{ user.isPremium ? (
      ## Premium Features
      - Advanced analytics
      - Priority support
      - Unlimited exports
    ) : (
      ## Free Features
      - Basic analytics
      - Community support
      - 5 exports/month
    ) }}
  )
}
```

## Logical AND (`&&`)

Show content only when a condition is true:

```typescript
function optionalContent(user: User) {
  return (
    # Dashboard

    ## Recent Activity
    - Latest login: {{ user.lastLogin }}

    {{ user.hasNotifications && (
      ## Notifications
      - You have {{ user.notificationCount }} unread messages
      - Last notification: {{ user.lastNotification }}
    ) }}

    {{ user.isAdmin && (
      ## Admin Panel
      - Manage users
      - View reports
      - System settings
    ) }}
  )
}
```

## Logical OR (`||`)

Show content when either condition is true (less common but useful):

```typescript
function flexibleMessage(user: User) {
  return (
    # Hello {{ user.name }}!

    {{ user.isNew || user.hasUpdates ? (
      Check out what's new!
    ) : (
      Welcome back!
    ) }}
  )
}
```

## Nested Conditions

Combine multiple conditions for complex logic:

```typescript
function complexLayout(user: User, data: Data) {
  return (
    # {{ user.name }}

    {{ user.isPremium ? (
      {{ data.items.length > 10 ? (
        ## Premium Dashboard (Full)
        You have {{ data.items.length }} items
        {{ data.items.slice(0, 5).map(item => `- ${item.name}`) }}
      ) : (
        ## Premium Dashboard (Compact)
        You have {{ data.items.length }} items
      ) }}
    ) : (
      {{ data.items.length > 5 ? (
        ## Standard Dashboard (Limited)
        Showing first 5 of {{ data.items.length }} items
      ) : (
        ## Standard Dashboard
        Your items: {{ data.items.length }}
      ) }}
    ) }}
  )
}
```

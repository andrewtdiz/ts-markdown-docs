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

```typescript
// Define a component
function UserCard({ user }: { user: User }) {
  return (
    <div style="border: 1px solid #ddd; padding: 16px; margin: 10px 0; border-radius: 8px;">
      **Name:** {{ user.name }}
      **Email:** {{ user.email }}
      **Status:** {{ user.isActive ? '✅ Active' : '⏸️ Inactive' }}
    </div>
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

```typescript
function StatusBadge({ status, type }: { status: string; type?: 'success' | 'warning' | 'error' }) {
  const color = type === 'success' ? '#4caf50' : type === 'warning' ? '#ff9800' : '#f44336'

  return (
    <span style="background: {{ color }}; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px;">
      {{ status }}
    </span>
  )
}

function dashboard(stats: Stats) {
  return (
    # Dashboard

    <@StatusBadge status="Online" type="success" />
    <@StatusBadge status="Warning" type="warning" />
    <@StatusBadge status="Offline" type="error" />

    **Server Status:** <@StatusBadge status={stats.serverStatus} type={stats.isHealthy ? 'success' : 'error'} />
  )
}
```

## Component Children

Components can accept child content:

```typescript
function Card({ title, children }: { title: string; children: any }) {
  return (
    <div style="border: 1px solid #ddd; padding: 20px; margin: 10px 0; border-radius: 8px;">
      ## {{ title }}

      {{ children }}
    </div>
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

## Best Practices

### Keep Components Focused

```typescript
// Good - single responsibility
function UserAvatar({ user }: { user: User }) {
  return (
    <img src="{{ user.avatar }}" alt="{{ user.name }}" style="width: 50px; height: 50px; border-radius: 50%;" />
  )
}

function UserInfo({ user }: { user: User }) {
  return (
    <div>
      **Name:** {{ user.name }}
      **Role:** {{ user.role }}
    </div>
  )
}

// Avoid - multiple responsibilities
function userProfileCard({ user }: { user: User }) {
  return (
    <div>
      <img src="{{ user.avatar }}" alt="{{ user.name }}" style="width: 50px;" />
      **Name:** {{ user.name }}
      **Role:** {{ user.role }}
      **Bio:** {{ user.bio }}
      **Last Login:** {{ user.lastLogin }}
      **Theme:** {{ user.preferences.theme }}
    </div>
  )
}
```

### Use Descriptive Names

```typescript
// Good - clear purpose
function ProductCard({ product }: { product: Product }) {
  return (
    <div style="border: 1px solid #ddd; padding: 16px;">
      **{{ product.name }}** - ${{ product.price }}
      {{ product.description }}
    </div>
  )
}

// Avoid - unclear purpose
function PC({ p }: { p: Product }) {
  return (<div>**{{ p.name }}** - ${{ p.price }}</div>)
}
```

### Handle Optional Props

```typescript
function OptionalCard({ title, subtitle, children }: {
  title: string;
  subtitle?: string;
  children: any
}) {
  return (
    <div style="border: 1px solid #ddd; padding: 16px;">
      ## {{ title }}

      {{ subtitle && (
        **{{ subtitle }}**
      ) }}

      {{ children }}
    </div>
  )
}
```

## Advanced Examples

### Nested Components

```typescript
function Header({ user }: { user: User }) {
  return (
    <div style="background: #f5f5f5; padding: 20px;">
      # Welcome {{ user.name }}!

      <@UserMenu user={user} />
    </div>
  )
}

function UserMenu({ user }: { user: User }) {
  return (
    <div style="float: right;">
      <@UserAvatar user={user} />
      <@UserDropdown user={user} />
    </div>
  )
}

function pageLayout(user: User, content: any) {
  return (
    <@Header user={user} />

    <div style="padding: 20px;">
      {{ content }}
    </div>
  )
}
```

### Dynamic Component Lists

```typescript
function FeatureList({ features }: { features: Feature[] }) {
  return (
    ## Features

    {{ features.map(feature => (
      <@FeatureCard feature={feature} />
    )) }}
  )
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div style="border: 1px solid #ddd; padding: 16px; margin: 10px 0;">
      ### {{ feature.title }}

      {{ feature.description }}

      {{ feature.isNew && (
        <span style="background: #e3f2fd; padding: 2px 8px; border-radius: 12px; font-size: 12px;">
          New!
        </span>
      ) }}
    </div>
  )
}
```

### Layout Components

```typescript
function Grid({ columns, children }: { columns: number; children: any }) {
  const gridStyle = `display: grid; grid-template-columns: repeat(${columns}, 1fr); gap: 20px;`

  return (
    <div style="{{ gridStyle }}">
      {{ children }}
    </div>
  )
}

function dashboard() {
  return (
    # Dashboard

    <@Grid columns={3}>
      <@Card title="Users" content="1,234 active users" />
      <@Card title="Revenue" content="$12,345 this month" />
      <@Card title="Growth" content="+15% from last month" />
    </@Grid>
  )
}
```

## Performance Considerations

### Component Reuse

```typescript
// Good - compile once, use many times
const userCardComponent = compileTSM(parser.parse(UserCard.toString()))

function userList(users: User[]) {
  return (
    # Users

    {{ users.map(user => (
      <div>
        {{ executeTSMTemplate(userCardComponent, { user }) }}
      </div>
    )) }}
  )
}

// Avoid - compiling on every render
function badUserList(users: User[]) {
  return (
    # Users

    {{ users.map(user => (
      <@UserCard user={user} />
    )) }}
  )
}
```

### Conditional Components

```typescript
function optionalComponents(user: User) {
  return (
    # Dashboard

    <@Header user={user} />

    {{ user.isAdmin && (
      <@AdminPanel user={user} />
    ) }}

    <@UserProfile user={user} />

    {{ user.hasNotifications && (
      <@NotificationCenter user={user} />
    ) }}
  )
}
```

## Common Patterns

### Data Display Components

```typescript
function DataTable({ data, columns }: { data: any[]; columns: string[] }) {
  return (
    | {{ columns.join(' | ') }} |
    | {{ columns.map(() => '---').join(' | ') }} |
    {{ data.map(row => (
      | {{ columns.map(col => row[col] || '').join(' | ') }} |
    )) }}
  )
}

function report(data: ReportData) {
  return (
    # Sales Report

    <@DataTable
      data={data.sales}
      columns={['Product', 'Units', 'Revenue', 'Date']}
    />
  )
}
```

### Interactive Components

```typescript
function ActionButton({ label, onClick, variant }: {
  label: string;
  onClick: string;
  variant?: 'primary' | 'secondary'
}) {
  const style = variant === 'primary'
    ? 'background: #007bff; color: white; padding: 8px 16px; border: none; border-radius: 4px;'
    : 'background: #6c757d; color: white; padding: 8px 16px; border: none; border-radius: 4px;'

  return (
    <button style="{{ style }}" onclick="{{ onClick }}">
      {{ label }}
    </button>
  )
}

function toolbar() {
  return (
    <div style="display: flex; gap: 10px;">
      <@ActionButton label="Save" onClick="saveData()" variant="primary" />
      <@ActionButton label="Cancel" onClick="cancelEdit()" variant="secondary" />
    </div>
  )
}
```

### Form Components

```typescript
function InputField({ label, type, value, onChange }: {
  label: string;
  type?: string;
  value: string;
  onChange: string;
}) {
  return (
    <div style="margin: 10px 0;">
      <label style="display: block; margin-bottom: 5px;">{{ label }}</label>
      <input
        type="{{ type || 'text' }}"
        value="{{ value }}"
        onChange="{{ onChange }}"
        style="padding: 8px; border: 1px solid #ddd; border-radius: 4px; width: 100%;"
      />
    </div>
  )
}

function contactForm() {
  return (
    # Contact Form

    <@InputField label="Name" value={formData.name} onChange="updateName()" />
    <@InputField label="Email" type="email" value={formData.email} onChange="updateEmail()" />
    <@InputField label="Message" value={formData.message} onChange="updateMessage()" />
  )
}
```

## Error Handling

### Safe Component Usage

```typescript
function safeComponentUsage(user: User | null) {
  return (
    # Dashboard

    {{ user ? (
      <@UserProfile user={user} />
      <@UserStats user={user} />
    ) : (
      <@ErrorMessage message="User not found" />
    ) }}
  )
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div style="color: red; padding: 20px; background: #ffebee; border-radius: 8px;">
      **Error:** {{ message }}
    </div>
  )
}
```

### Component Fallbacks

```typescript
function withFallbacks(data: Data) {
  return (
    # Report

    {{ data.items?.length > 0 ? (
      <@DataTable data={data.items} />
    ) : (
      <@EmptyState message="No data available" />
    ) }}
  )
}
```

## Next Steps

Now that you understand components, explore:

1. **[Best Practices](best-practices)** - Optimize your TSM code
2. **[Syntax Guide](syntax-guide)** - Complete reference
3. **[Dynamic Content](dynamic-content)** - Advanced variable usage

**Pro Tip**: Use components to break down complex layouts into manageable, reusable pieces. This makes your code easier to maintain and your content more consistent.

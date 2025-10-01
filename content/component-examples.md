# Component Examples

This page demonstrates TS Markdown components with practical examples that save you time by keeping everything in TypeScript.

## Basic Components

### Alert Components

```typescript
// Define alert component
function Alert({ type, title, children }: {
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  children: any;
}) {
  // Note: Styling has been removed as it relies on HTML.
  return (
    ## {{ title }}

    {{ children }}
  )
}

// Use the component
function page() {
  return (
    # Component Examples

    <@Alert type="info" title="Information">
      This is an informational alert with important details.
    </@Alert>

    <@Alert type="success" title="Success!">
      Your setup is complete and ready to use.
    </@Alert>

    <@Alert type="warning" title="Warning">
      Always backup your data before making major changes.
    </@Alert>

    <@Alert type="error" title="Error">
      Something went wrong. Please check your configuration.
    </@Alert>
  )
}
```

### Card Components

```typescript
function Card({ title, children }: { title: string; children: any }) {
  // Note: Styling has been removed as it relies on HTML.
  return (
    ## {{ title }}

    {{ children }}
  )
}

function FeatureCard({ feature }: { feature: { name: string; description: string; icon: string } }) {
  // Note: Styling has been removed as it relies on HTML.
  return (
    ### {{ feature.icon }} {{ feature.name }}

    {{ feature.description }}
  )
}

function layout() {
  return (
    # Features

    <@Card title="Getting Started">
      Welcome to TS Markdown! Here's how to get started:
      - Install the package
      - Create your first template
      - Start building
    </@Card>

    <@FeatureCard feature={{
      name: "Type Safety",
      description: "Built with TypeScript for better development experience",
      icon: "🔒"
    }} />

    <@FeatureCard feature={{
      name: "Dynamic Content",
      description: "Insert variables and logic directly in your markdown",
      icon: "⚡"
    }} />
  )
}
```



## Data Display Components

### Table Components

```typescript
function Table({ headers, rows }: { headers: string[]; rows: any[] }) {
  return (
    | {{ headers.join(' | ') }} |
    | {{ headers.map(() => '---').join(' | ') }} |
    {{ rows.map(row => (
      | {{ headers.map(header => row[header] || '').join(' | ') }} |
    )) }}
  )
}

function userTable(users: User[]) {
  return (
    # Users

    <@Table
      headers={['Name', 'Email', 'Status', 'Role']}
      rows={users.map(user => ({
        Name: user.name,
        Email: user.email,
        Status: user.isActive ? 'Active' : 'Inactive',
        Role: user.role
      }))}
    />
  )
}
```


## Component Composition

```typescript
function Header({ user }: { user: User }) {
  return (
    # Welcome {{ user.name }}!

    <@UserMenu user={user} />
  )
}

function UserMenu({ user }: { user: User }) {
  return (
    <@Badge variant="outline">{{ user.role }}</@Badge>
    <@Button label="Profile" onClick="showProfile()" variant="secondary" />
    <@Button label="Logout" onClick="handleLogout()" variant="primary" />
  )
}

function pageLayout(user: User, content: any) {
  return (
    <@Header user={user} />

    {{ content }}

    © {{ new Date().getFullYear() }} MyApp
  )
}
```

## Performance Tips

### Compile Components Once

```typescript
// Good - compile once
const parser = new TSMParser()
const compiledCard = compileTSM(parser.parse(Card.toString()))

function renderCards(items: Item[]) {
  return (
    # Items

    {{ items.map(item => (
      {{ executeTSMTemplate(compiledCard, { title: item.name, children: item.description }) }}
    )) }}
  )
}

// Avoid - compiling every time
function badRenderCards(items: Item[]) {
  return (
    # Items

    {{ items.map(item => (
      <@Card title={item.name}>
        {{ item.description }}
      </@Card>
    )) }}
  )
}
```

### Lazy Loading

```typescript
function LazyComponent({ name, data }: { name: string; data: any }) {
  const component = loadComponent(name)

  return (
    <@DynamicComponent component={component} data={data} />
  )
}
```

## Summary

Components in TS Markdown let you:

- **Create reusable UI elements** with the `<@ComponentName />` syntax
- **Pass props** using standard JavaScript object syntax
- **Compose complex layouts** by nesting components
- **Handle interactivity** with event handlers
- **Maintain type safety** with TypeScript interfaces

**Pro Tip**: Start with simple components and gradually build more complex ones. This approach keeps your code maintainable and your content consistent.

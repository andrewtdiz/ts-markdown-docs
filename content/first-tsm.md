---
title: Create Your First File
description: Build a complete TS Markdown application from scratch
date: 2024-01-15
author: TS Markdown Team
tags: [tutorial, first-file, complete-example]
---

Let's build a complete TS Markdown application that demonstrates all the core features: dynamic content, conditional rendering, components, and real-time updates.

## Project Setup

```shell
mkdir my-tsm-dashboard
cd my-tsm-dashboard
bun init -y
bun add tsm
```

## Sample Data

Create `src/data/sample-data.ts`:

```typescript
export interface User {
  id: string
  name: string
  email: string
  avatar: string
  isOnline: boolean
  lastSeen: string
  preferences: {
    theme: 'light' | 'dark'
    language: string
    notifications: boolean
  }
}

export interface Todo {
  id: string
  text: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
}

export interface DashboardData {
  user: User
  todos: Todo[]
  stats: {
    completedTodos: number
    totalTodos: number
    completionRate: number
  }
  weather: {
    temperature: number
    condition: string
    location: string
  }
}

export const sampleData: DashboardData = {
  user: {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    isOnline: true,
    lastSeen: new Date().toISOString(),
    preferences: {
      theme: 'dark',
      language: 'en',
      notifications: true
    }
  },
  todos: [
    {
      id: '1',
      text: 'Learn TS Markdown',
      completed: true,
      priority: 'high',
      dueDate: '2024-01-20'
    },
    {
      id: '2',
      text: 'Build a dashboard',
      completed: false,
      priority: 'medium',
      dueDate: '2024-01-25'
    },
    {
      id: '3',
      text: 'Write documentation',
      completed: false,
      priority: 'low'
    }
  ],
  stats: {
    completedTodos: 1,
    totalTodos: 3,
    completionRate: 33.3
  },
  weather: {
    temperature: 22,
    condition: 'Sunny',
    location: 'San Francisco'
  }
}
```

## Dashboard Template

Create `src/templates/dashboard.tsm`:

```typescript
import { TSMParser, compileTSM, executeTSMTemplate } from 'tsm'

// Weather Card Component
function WeatherCard({ weather }: { weather: { temperature: number; condition: string; location: string } }) {
  // Note: Styling has been removed as it relies on HTML.
  return (
    ## 🌤️ Weather

    **{{ weather.location }}**
    {{ weather.temperature }}°C - {{ weather.condition }}
  )
}

// Stats Card Component
function StatsCard({ stats }: { stats: { completedTodos: number; totalTodos: number; completionRate: number } }) {
  // Note: Styling has been removed as it relies on HTML.
  return (
    ## 📊 Progress

    {{ stats.completedTodos }} of {{ stats.totalTodos }} todos completed
    **Completion rate:** {{ stats.completionRate.toFixed(1) }}%
  )
}

// Todo Item Component
function TodoItem({ todo, onToggle }: { todo: Todo; onToggle: (id: string) => void }) {
  // Note: Styling and interactivity have been removed as they rely on HTML.
  return (
    - [{{ todo.completed ? 'x' : ' ' }}] {{ todo.text }} ({{ todo.priority.toUpperCase() }})
  )
}

// Todo List Component
function TodoList({ todos, onToggleTodo }: { todos: Todo[]; onToggleTodo: (id: string) => void }) {
  return (
    ## Your Todos

    {{ todos.map(todo => (
      <@TodoItem todo={todo} onToggle={onToggleTodo} />
    )) }}
  )
}

// Main Dashboard Function
function createDashboard(data: DashboardData) {
  // Note: Styling and interactivity have been removed as they rely on HTML.
  return (
    # Welcome {{ data.user.isOnline ? 'back' : 'aboard' }}, {{ data.user.name }}! 👋

    ## Today's Overview

    <@WeatherCard weather={data.weather} />
    <@StatsCard stats={data.stats} />

    ## Your Profile

    **Name:** {{ data.user.name }}
    **Email:** {{ data.user.email }}
    **Status:** {{ data.user.isOnline ? '🟢 Online' : '🔴 Offline' }}
    **Theme:** {{ data.user.preferences.theme }}

    ## Quick Actions

    *Note: Buttons removed as they are HTML elements.*

    <@TodoList todos={data.todos} onToggleTodo={(id) => console.log('Toggle todo:', id)} />

    ## Recent Activity

    {{ data.user.isOnline ? (
      '✅ You\'re currently online and active\n' +
      '**Last seen:** ' + new Date(data.user.lastSeen).toLocaleString()
    ) : (
      '⏰ You were last online at ' + new Date(data.user.lastSeen).toLocaleString()
    ) }}

    ## Settings

    ### Preferences

    - **Theme:** {{ data.user.preferences.theme }}
    - **Language:** {{ data.user.preferences.language }}
    - **Notifications:** {{ data.user.preferences.notifications ? 'Enabled' : 'Disabled' }}
  )
}

// Compile the template
const parser = new TSMParser()
const compiledDashboard = compileTSM(parser.parse(createDashboard.toString()))
```

## Main Application

Create `src/index.ts`:

```typescript
import { executeTSMTemplate } from 'tsm'
import { sampleData, DashboardData } from './data/sample-data'
import { compiledDashboard } from './templates/dashboard'

function main() {
  console.log('=== TSM Dashboard Demo ===\n')

  // Render initial dashboard
  const initialResult = executeTSMTemplate(compiledDashboard, sampleData)
  console.log(initialResult)

  console.log('\n=== Updated Data Demo ===\n')

  // Demonstrate dynamic updates
  const updatedData: DashboardData = {
    ...sampleData,
    todos: sampleData.todos.map(todo =>
      todo.id === '2' ? { ...todo, completed: true } : todo
    ),
    stats: {
      completedTodos: 2,
      totalTodos: 3,
      completionRate: 66.7
    }
  }

  const updatedResult = executeTSMTemplate(compiledDashboard, updatedData)
  console.log(updatedResult)
}

main()
```


```



🎉 **Congratulations!** You've built a complete TS Markdown application!

## What You've Built

Your dashboard includes:

✅ **Dynamic Content**: User name, weather, and stats update based on data
✅ **Interactive Components**: Clickable buttons and todo checkboxes
✅ **Conditional Rendering**: Different content based on user status
✅ **Real-time Updates**: Todo completion updates the stats
✅ **Component Reusability**: Modular, maintainable components
✅ **Type Safety**: Full TypeScript integration

## Key Features Demonstrated

### 1. **Markdown Blocks**
```typescript
function createDashboard(data: DashboardData) {
  return (
    # Welcome {{ data.user.name }}!

    Regular markdown content here...
  )
}
```

### 2. **Dynamic Interpolation**
```typescript
**Name:** {{ data.user.name }}
**Status:** {{ data.user.isOnline ? '🟢 Online' : '🔴 Offline' }}
**Completion rate:** {{ data.stats.completionRate.toFixed(1) }}%
```

### 3. **Conditional Rendering**
```typescript
{{ data.user.isOnline ? (
  'Online content'
) : (
  'Offline content'
)}}
```

### 4. **Component Usage**
```typescript
<@WeatherCard weather={data.weather} />
<@TodoList todos={data.todos} onToggleTodo={handleToggle} />
```

## Next Steps

Now that you have a working application, try these enhancements:

1. **Add More Components**: Create charts, calendars, or forms
2. **Data Persistence**: Save todos to localStorage or an API
3. **Real-time Updates**: Add WebSocket integration for live data
4. **Theming**: Implement a full theme system
5. **Responsive Design**: Make it work on mobile devices

## Advanced Patterns

### Data Fetching
```typescript
async function generateReport(userId: string) {
  const user = await fetchUser(userId)
  const todos = await fetchTodos(userId)

  return (
    # Report for {{ user.name }}

    <@TodoList todos={todos} onToggleTodo={handleToggle} />
  )
}
```

### Error Handling
```typescript
function safeTemplate(data: DashboardData | null) {
  return (
    {{ data ? (
      {{ createDashboard(data) }}
    ) : (
      # Error
      Unable to load dashboard data.
    ) }}
  )
}
```

### Performance Optimization
```typescript
// Compile once, use many times
const compiledDashboard = compileTSM(parser.parse(createDashboard.toString()))

function renderDashboard(data: DashboardData) {
  return executeTSMTemplate(compiledDashboard, data)
}
```

**Complete Application Built!** You now have a fully functional TS Markdown dashboard with dynamic content, interactivity, and real-time updates.

Ready to explore more features? Check out the [Syntax Guide](syntax-guide) to learn about advanced TS Markdown capabilities!

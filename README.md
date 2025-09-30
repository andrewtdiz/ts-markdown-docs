# Markdoc + Bun + React + shadcn/ui Template

A type-safe, component based markdown engine for embedding markdown content with TypeScript.
Create dynamic, template-driven markdown with full type support.

## ✨ Features

1. **TypeScript Integration** - Full TypeScript support with type checking and IntelliSense
2. **Template Interpolation** - Dynamic content with `{{ expression }}` syntax
3. **Conditional Rendering** - Smart conditional blocks with ternary operators and logical AND
4. **Developer Tools** - Comprehensive CLI, VS Code extension, and testing utilities

## Quick Start

### Install Dependencies

```shell
bun install
```

### Start Development Server

```shell
bun dev
```

The server will start at `http://localhost:3000` with hot reload enabled.

### Production Build

```shell
bun run build
```

### Run Production Server

```shell
bun start
```


## Available Scripts

- `bun dev` - Start development server with hot reload
- `bun start` - Start production server
- `bun run build` - Build for production
- `bun run type-check` - Run TypeScript type checking
- `bun run clean` - Clean build artifacts

## Customization

### Adding New Content

1. Add `.md` files to the `content/` directory
2. Update `src/lib/content-manifest.ts` to include new files
3. Add navigation buttons in `App.tsx`

### Styling

The project uses Tailwind CSS with the typography plugin for prose styling. Customize styles in:

- `src/index.css` - Global styles
- `styles/globals.css` - Additional global styles
- Component files - Component-specific styles

### Adding New Markdoc Tags

1. Create schema file in `schema/`
2. Create React component
3. Update server config in `src/index.tsx`
4. Register component in `App.tsx`

## Technologies Used

- [Bun](https://bun.com) - JavaScript runtime and package manager
- [React](https://react.dev) - UI library
- [Markdoc](https://markdoc.dev) - Content authoring framework
- [shadcn/ui](https://ui.shadcn.com) - UI component library
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [TypeScript](https://www.typescriptlang.org) - Type safety

## License

MIT

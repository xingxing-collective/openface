# AGENTS.md

This document provides guidelines for agentic coding agents working in this repository.

## Project Overview

OpenFace is a Bun-based TypeScript project implementing a Terminal User Interface (TUI) for running Hugging Face Transformers models using Transformers.js and Solid.js. The project provides an interactive CLI interface for various AI tasks including translation, text generation, and model management.

## Architecture

### Core Components
- **CLI Layer**: Command-line interface built with yargs
- **Task Layer**: Task-specific implementations (translation, text-generation, pull)
- **Model Layer**: Hugging Face Transformers integration
- **UI Layer**: Terminal-based user interface with Solid.js

### Project Structure
```
openface/
├── src/
│   ├── cli/           # CLI command definitions and utilities
│   │   ├── cmd/       # Individual command implementations
│   │   └── utils/     # Shared CLI utilities
│   ├── tasks/         # Task-specific logic
│   │   ├── translation/    # Translation functionality
│   │   ├── text-generation/ # Text generation
│   │   └── pull/           # Model pulling
│   └── config/        # Configuration management
├── packages/
│   └── openface/      # Main application package
└── test/              # Test files (future implementation)
```

## Commands

### Development
```bash
# Install dependencies
bun install

# Run the main TUI application
bun run dev

# Run individual commands
bun run translation "Hello world" --src_lang en --target_lang zh
bun run text-generation "Continue this story..."
bun run pull
```

### Transformers CLI
```bash
# From root directory
bun run --cwd packages/transformers --conditions=browser src/index.ts

# From transformers directory
cd packages/transformers
bun run --conditions=browser src/index.ts
```

### Testing & Quality
```bash
# Run tests (when implemented)
bun test

# Format code with Prettier
bun run prettier --write "src/**/*.ts" "src/**/*.tsx"
```

## Code Style Guidelines

### Imports and Requirements
- Use `import` syntax (ES modules - `"type": "module"` in package.json)
- Place imports at the top of files
- Use single quotes for import paths
- Group and organize imports logically:

```typescript
// Third-party imports first
import yargs from 'yargs'
import { hideBin } from "yargs/helpers"
import { pipeline } from "@huggingface/transformers"
import { createStore, createEffect } from "solid-js/store"
import { render } from "@opentui/solid"

// Internal/relative imports second
import { TranslationCommand } from "./cli/cmd/translation"
import { Translation } from "@/translation"
import { useTheme } from "@tui/composables/theme"
```

### Path Aliases
Use defined path aliases from tsconfig.json:
- `@/*` → `./src/*`
- `@tui/*` → `./src/cli/cmd/tui/*`

### Formatting
- No semicolons (enforced by Prettier)
- Print width: 120 characters
- Single quotes for strings (except JSX attributes where double quotes may be used)
- Consistent indentation (2 spaces preferred)

### TypeScript and Types
- Use TypeScript for all new files
- Define interfaces for complex types
- Use `type` for type aliases when appropriate
- Namespace patterns for grouped types (e.g., `TranslationLanguages.LanguageCode`)

```typescript
export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export namespace TranslationLanguages {
  export const languages = { /* ... */ } as const
  export type LanguageCode = typeof languages[keyof typeof languages]
}
```

### Naming Conventions
- **Files**: kebab-case for files (e.g., `thread.ts`, `border.tsx`)
- **Components**: PascalCase for components (e.g., `Home`, `Prompt`)
- **Functions**: camelCase (e.g., `getTerminalBackgroundColor`, `addMessage`)
- **Constants**: PascalCase for objects/constants (e.g., `EmptyBorder`, `SplitBorder`)
- **Interfaces/Types**: PascalCase (e.g., `Router`, `Message`)
- **Classes**: PascalCase (e.g., `Translation`)
- **Enums**: PascalCase

### React/Solid.js Patterns
- Use functional components with JSX
- Leverage Solid.js reactive primitives (`createEffect`, `createStore`, `createMemo`)
- Use refs for DOM-like elements:

```typescript
let input: TextareaRenderable
// ... in JSX
<textarea
  ref={(r: TextareaRenderable) => {
    input = r
  }}
/>
```

- Use context pattern for state management (see `composables/context.tsx`)

### CLI Commands with Yargs
Use the `cmd()` wrapper from `@/cli/cmd/cmd` for command definitions:

```typescript
export const TranslationCommand = cmd({
  command: "translation [message..]",
  describe: "Translate with a message.",
  builder: (yargs) =>
    yargs
      .positional("translation", {
        describe: "message to send",
        type: "string",
        array: true,
        default: [],
      })
      .option("src_lang", {
        type: "string",
        describe: "The source language code (e.g., 'en' for English)."
      }),
  handler: async (args) => {
    // Handle command execution
  }
})
```

### Error Handling
- Use try/catch for async operations
- CLI has global error handling in main entry point
- Use type assertions sparingly; prefer proper TypeScript types
- Use `@ts-ignore` or `@ts-expect-error` when necessary with comments

```typescript
try {
  await cli.parse()
} catch (error) {
  process.exitCode = 1
}
```

### Exports
- Use named exports for functions, classes, interfaces
- Export types when used externally
- Use default exports only when file is intended as primary module entry

### Comments
- Keep code self-documenting where possible
- Use JSDoc-style comments for exported functions/classes:

```typescript
/**
 * This class uses the Singleton pattern to ensure that only one instance of the
 * pipeline is loaded. This is because loading the pipeline is an expensive
 * operation and we don't want to do it every time we want to translate a sentence.
 */
export class Translation {
  // ...
}
```

### File Organization
- `src/cli/cmd/` - CLI command definitions
- `src/cli/cmd/tui/` - TUI implementation (components, composables, routes)
- `src/translation/` - Translation logic and utilities
- `test/` - Test files (when added)

### Key Dependencies
- **@huggingface/transformers** - ML model pipeline
- **@opentui/core** & **@opentui/solid** - TUI framework
- **solid-js** - Reactive UI framework
- **yargs** - CLI argument parsing
- **clipboardy** - Clipboard integration

### Running a Single File
```bash
# From root
bun run --cwd packages/transformers --conditions=browser src/cli/cmd/translation.ts

# From packages/transformers directory
bun run --conditions=browser src/index.ts
```

### Notes
- The project uses `--conditions=browser` for conditional imports
- JSX is set to "preserve" mode in tsconfig.json
- The codebase is a Bun workspace with catalog dependencies
- No strict mode on indexed access (`noUncheckedIndexedAccess: false`)

# OpenFace

A Terminal User Interface (TUI) for running Hugging Face Transformers models directly in your terminal using Transformers.js and Solid.js.

## Features

- **Multiple Task Support**: Translation, Text Generation, and more
- **Model Management**: Pull and manage transformer models locally
- **CLI Interface**: Command-line interface for seamless integration
- **Bun Runtime**: Fast all-in-one JavaScript runtime
- **Solid.js**: Reactive UI framework for better performance
- **TypeScript**: Full type safety and developer experience

## Installation

```bash
# Install dependencies
bun install
```

## Usage

### Development Mode
```bash
# Run the main TUI application
bun run dev
```

### CLI Commands
```bash
# Translation
bun run translation "Hello world" --src_lang en --target_lang zh

# Text Generation
bun run text-generation "Continue this story: Once upon a time..."

# Pull models
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

## Project Structure

```
├── src/
│   ├── cli/           # CLI command definitions
│   │   ├── cmd/       # Command implementations
│   │   └── utils/     # CLI utilities
│   ├── tasks/         # Task-specific implementations
│   │   ├── translation/
│   │   ├── text-generation/
│   │   └── pull/
│   └── config/        # Configuration files
├── packages/
│   └── openface/      # Main application package
└── test/              # Test files (when added)
```

## Key Dependencies

- **@huggingface/transformers** - ML model pipeline
- **@opentui/core** & **@opentui/solid** - TUI framework
- **solid-js** - Reactive UI framework
- **yargs** - CLI argument parsing
- **bun** - Fast JavaScript runtime

## How It Works

This project leverages [Transformers.js](https://huggingface.co/docs/transformers.js) to run transformer models directly in JavaScript/TypeScript. The system provides:

1. **Task Selection**: Choose from supported AI tasks
2. **Model Management**: Pull and organize models locally
3. **Interactive Interface**: Terminal-based user experience
4. **Real-time Processing**: Instant results for your queries

## Development

### Code Style
- No semicolons (enforced by Prettier)
- Print width: 120 characters
- Single quotes for strings
- TypeScript for all files

### Testing
```bash
# To run tests (when implemented)
bun test
```

### Linting/Formatting
```bash
# Format code with Prettier
bun run prettier --write "src/**/*.ts" "src/**/*.tsx"
```

## License

This project is built with [Bun](https://bun.com) and open source.

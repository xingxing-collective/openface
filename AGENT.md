# OpenFace AGENTS.md

## Build & Development Commands

### Project Setup
```bash
# Install dependencies
bun install

# Run development server
bun dev

# Type checking (main project)
bun typecheck

# Run type checking on specific file
bunx tsc --noEmit packages/openface/src/index.ts

# Pre-commit hooks (husky)
# Automatically runs type checking on commit
```

### Package-Specific Commands (packages/openface/)
```bash
# Run CLI directly
bun run --conditions=browser src/index.ts --help

# Run with specific command
bun run --conditions=browser src/index.ts translation "hello" --model Helsinki-NLP/opus-mt-zh-en

# Development mode
bun run dev
```

### Testing (Framework not implemented yet)
```bash
# No test framework currently implemented
# Consider adding vitest for future tests:
# bun add vitest --dev
# bunx vitest run packages/openface/src/**/*.test.ts

# Mock external dependencies for testing:
# - Hugging Face models
# - File system operations
# - CLI arguments
```

## Code Style Guidelines

### Import Conventions
- Use TypeScript path aliases: `@/` imports for src/ directory
- Group imports: external libs → internal modules → relative paths
- Type imports on separate lines

```typescript
import { cmd } from "../utils/cmd";
import { useTranslation } from "@/tasks/translation";
import { TextStreamer, type TranslationOutput } from "@huggingface/transformers";
```

### Naming Conventions
- **Files**: kebab-case (`translation-command.ts`)
- **Classes**: PascalCase (`TextStreamer`)
- **Functions/Variables**: camelCase (`useTranslation`)
- **Constants**: SCREAMING_SNAKE_CASE (`DEFAULT_MODEL`)
- **Commands**: kebab-case (`text-generation`)

### TypeScript Best Practices
- Strict typing everywhere
- `interface` over `type` for object types
- Always specify return types
- Minimal `as` usage
- Enable strict mode in tsconfig

```typescript
export async function useTranslation(model?: string, opts?: PretrainedModelOptions) {
  const options = defu(opts, { ...pretrained.model });
  const pipe = await pipeline<'translation'>('translation', model, options);
  
  return { options, ...pipe, translator };
}
```

### Error Handling
- `try/catch` for async operations
- Meaningful error messages
- Graceful exits
- Use consola for logging

```typescript
try {
  const { translator, tokenizer } = await useTranslation(args.model);
} catch (error) {
  consola.error('Translation failed:', error);
  process.exitCode = 1;
}
```

### Formatting Standards
- Prettier: no semicolons, 120 char width
- 2-space indentation
- Max line length: 120 characters
- Single quotes for strings

### Project Structure
```
packages/openface/src/
├── cli/
│   ├── commands/     # Command implementations
│   └── utils/        # CLI utilities
├── tasks/            # Business logic
├── config/           # Configuration
└── index.ts          # Entry point
```

### Configuration
- **tsconfig**: Extends `@tsconfig/bun/tsconfig.json`
- **prettier**: `semi: false`, `printWidth: 120`
- **husky**: Pre-commit type checking
- **workspaces**: Monorepo structure
- **path aliases**: `@/*` → `src/`

### Key Development Notes
- Bun runtime with TypeScript 5.8.2
- Browser conditions for web compatibility
- No existing test framework - plan to add vitest
- Hugging Face Transformers for NLP tasks
- yargs for CLI framework

## Core Capabilities

### 1. Translation Agent
- **Function**: Translate text between multiple languages
- **Models**: Supports any Hugging Face translation models
- **Features**:
  - Batch translation of multiple texts
  - Interactive REPL mode for continuous translation
  - Custom language pair selection
  - Real-time streaming output

### 2. Text Generation Agent
- **Function**: Generate text using state-of-the-art language models
- **Models**: Compatible with various text generation models
- **Features**:
  - Creative writing assistance
  - Content generation
  - Interactive generation mode
  - Context-aware text continuation

### 3. Model Management Agent
- **Function**: Pull and manage Hugging Face models locally
- **Features**:
  - Efficient model downloading
  - Model caching
  - Progress tracking

## Agent Architecture

### Command Structure
```
openface [command] [options]
├── translation
│   ├── --model <model-id>
│   ├── --src_lang <language-code>
│   ├── --tgt_lang <language-code>
│   └── [text-to-translate...]
├── text-generation
│   ├── --model <model-id>
│   └── [prompt...]
└── pull
    └── <model-id>
```

### Interactive Mode
Both translation and text-generation commands support interactive REPL mode for continuous operation without re-invoking the command.

### Configuration Management
- Uses TypeScript configuration with Bun-specific settings
- Path aliases for clean imports (`@/*`)
- Extensible configuration system for model options

## Usage Patterns

### Scripting Integration
Perfect for automation scripts, content pipelines, and developer workflows:

```bash
# Batch file translation
for file in *.txt; do
  openface translation --model Helsinki-NLP/opus-mt-zh-en < "$file" > "${file}.en"
done

# Interactive content generation
openface text-generation --model gpt2 > story.txt
```

### Development Workflow
- Type-safe development with TypeScript
- Fast iteration with Bun's hot reload
- Integrated linting and type checking

## Technical Stack

- **Runtime**: Bun 1.3.5
- **Language**: TypeScript 5.8.2
- **CLI Framework**: yargs
- **AI/ML**: Hugging Face Transformers
- **Logging**: Consola
- **Configuration**: Custom config system

## Agent Behaviors

### Error Handling
- Graceful handling of unknown arguments
- Comprehensive error messaging
- Automatic help display on usage errors

### Performance Optimizations
- Model caching for repeated operations
- Streaming output for large texts
- Efficient memory management

### Security Considerations
- Model validation before execution
- Safe argument parsing
- No network exposure of sensitive data

## Extensibility

The agent architecture is designed for easy extension:

### Adding New Commands
1. Create command handler in `src/cli/commands/`
2. Register command in main CLI entry point
3. Implement business logic in `src/tasks/`

### Adding New Models
- Extend the task system for new model types
- Add configuration options for model-specific settings
- Implement custom output formatters

## Agent Limitations

1. **Local Processing**: Models run locally, requiring sufficient computational resources
2. **Internet Dependency**: Initial model download requires internet connection
3. **Memory Usage**: Large models may consume significant RAM

## Future Enhancements

- Model quantization for better performance
- Multi-model composition
- Enhanced interactive features
- Plugin system for custom commands
- Configuration profiles for different use cases
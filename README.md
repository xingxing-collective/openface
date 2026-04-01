# OpenFace

OpenFace is a command-line interface built with Bun and TypeScript, leveraging the Hugging Face Transformers library for natural language processing tasks.

## Features

- **Translation**: Translate text between different languages using various transformer models
- **Text Generation**: Generate text using state-of-the-art language models
- **Model Management**: Pull and manage Hugging Face models for local use
- **Interactive REPL**: Interactive mode for continuous text processing

## Installation

This project uses [Bun](https://bun.sh/) as the package manager. Make sure you have Bun installed:

```bash
curl -fsSL https://bun.sh/install | bash
```

Then install dependencies:

```bash
bun install
```

## Usage

### Translation

```bash
# Translate text from Chinese to English
openface translation "你好世界" --model Helsinki-NLP/opus-mt-zh-en

# Translate with custom source and target languages
openface translation "Hello world" --model model-name --src_lang eng_Latn --tgt_lang zho_Hans

# Interactive translation mode
openface translation --model Helsinki-NLP/opus-mt-zh-en
```

### Text Generation

```bash
# Generate text using a model
openface text-generation "Once upon a time" --model gpt2

# Interactive text generation mode
openface text-generation --model gpt2
```

### Model Management

```bash
# Pull a model for local use
openface pull Helsinki-NLP/opus-mt-zh-en

# List available models (if implemented)
openface pull --list
```

## Development

### Setup

```bash
# Install dependencies
bun install

# Run development mode
bun dev
```

### Scripts

- `bun dev` - Run the development server
- `bun typecheck` - Run TypeScript type checking
- `bun run --cwd packages/openface --conditions=browser src/index.ts` - Run the CLI directly

## Configuration

The project uses TypeScript with Bun-specific configuration. Type paths are set up for `@/*` imports to resolve from the `src/` directory.

## Dependencies

- **@huggingface/hub**: Hugging Face Hub client
- **@huggingface/transformers**: Transformer models library
- **yargs**: Command-line argument parsing
- **consola**: Logging utility
- **clipboardy**: Clipboard access
- **defu**: Deep object merging

## License

MIT License - see LICENSE file for details.
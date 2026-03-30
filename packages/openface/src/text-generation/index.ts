import { pipeline, type Chat, type TextGenerationConfig } from "@huggingface/transformers"

export class TextGeneration {
  private model?: string
  constructor(model?: string) {
    this.model = model
  }
  async generator(messages: string | string[] | Chat | Chat[], options?: Partial<TextGenerationConfig>) {
    const pipe = await pipeline('text-generation', this.model)
    return pipe(messages, options);
  }
}
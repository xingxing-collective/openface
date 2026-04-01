import { useTextGeneration } from "@/tasks/text-generation"
import { cmd } from "../utils/cmd"
import { TextStreamer, type Chat, type Message, type TextGenerationOutput } from "@huggingface/transformers"
import { createRepl } from "../utils/createRepl"

export const TextGenerationCommand = cmd({
  command: "text-generation",
  describe: "Generation with a message.",
  builder: (yargs) =>
    yargs
      .positional("text-generation", {
        describe: "message to send",
        type: "string",
        array: true,
        default: [],
      })
      .option("model", {
        type: "string",
        alias: "m",
        demandOption: true
      })
      .option("stream", {
        type: "boolean",
        alias: "s",
        default: false
      }),
  handler: async (args) => {
    const { generator, tokenizer } = await useTextGeneration(args.model)
    const messages: Chat = []
    const streamer = args.stream ?
      new TextStreamer(tokenizer, {
        skip_prompt: true,
        skip_special_tokens: true
      }) : undefined
    const repl = await createRepl({
      input: process.stdin,
      output: process.stdout
    }, async (input) => {
      if (input) {
        messages.push({
          role: 'user',
          content: input
        })
        const output = await generator(messages, {
          streamer,
        })
        if (output) {
          messages.push((output as TextGenerationOutput).at(0)?.generated_text.at(-1) as Message)
        }
      }
    })

    repl.close()
  }
})
import { cmd } from "../utils/cmd";
import { useTranslation } from "@/tasks/translation"
import { TranslationLanguages } from '@/tasks/translation/languages'
import { TextStreamer } from "@huggingface/transformers";
import { createRepl } from "../utils/createRepl";

export const TranslationCommand = cmd({
  command: "translation",
  describe: "Translate with a message.",
  builder: (yargs) =>
    yargs
      .positional("translation", {
        describe: "message to send",
        type: "string",
        array: true,
        default: [],
      })
      .option("model", {
        alias: 'm',
        type: "string",
        demandOption: true
      })
      .option("src_lang", {
        alias: 's',
        type: "string",
        default: "zho_Hans"
      })
      .option("tgt_lang", {
        alias: 't',
        type: "string",
        default: "eng_Latn"
      }),
  handler: async (args) => {
    const { translator, tokenizer } = await useTranslation(args.model)

    const repl = await createRepl({
      input: process.stdin,
      output: process.stdout
    }, async (input) => {
      await translator(input, {
        src_lang: args.src_lang as TranslationLanguages.LanguageCode,
        tgt_lang: args.tgt_lang as TranslationLanguages.LanguageCode,
        streamer: new TextStreamer(tokenizer, {
          skip_prompt: true,
          skip_special_tokens: true
        }),
      })
    })

    repl.close()
  }
})
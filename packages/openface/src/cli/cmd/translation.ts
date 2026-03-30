import { cmd } from "./cmd";
import { Translation } from "../../translation"
import consola from "consola";

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
      .option("model", {
        type: "string",
        describe: ""
      })
      .option('message', {
        type: 'string',
        describe: 'The message to be translated.',
        demandOption: true
      }),
  handler: async (args) => {
    let message = [...args.message, ...(args["--"] || [])]
      .map((arg) => (arg.includes(" ") ? `"${arg.replace(/"/g, '\\"')}"` : arg))
      .join(" ")

    const translation = new Translation(args.model)

    const output = await translation.translator(message)

    consola.log(`Text:${message} tranlationed ${JSON.stringify({output})};`);
  }
})
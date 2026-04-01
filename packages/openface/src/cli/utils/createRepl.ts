import { createInterface, type ReadLineOptions } from 'node:readline/promises'

export async function createRepl(options: ReadLineOptions, callback: (input: string) => void) {
  const repl = createInterface(options)
  while (true) {
    const input = await repl.question("> ")
    if (input === ".exit") {
      break
    }
    callback(input)
  }
  return repl
}
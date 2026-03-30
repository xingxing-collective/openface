import os from 'node:os'
import { resolve } from 'node:path'
import Bun from 'bun'
import { name } from '../../package.json'
import { env } from '@huggingface/transformers'
import { defu } from 'defu'
import { config as defaultConfig } from './default'

export type TransformersEnvironment = typeof env

export async function useConfig() {
  const GLOBAL_CONFIG_PATH = resolve(os.homedir(), '.config', name, `config.json`)
  const file = await Bun.file(GLOBAL_CONFIG_PATH)
  if (!(await file.exists())) {
    await file.write(JSON.stringify({}))
  }

  const config = defu(await Bun.file(GLOBAL_CONFIG_PATH).json() as typeof defaultConfig, defaultConfig)

  function setEnv(opts: TransformersEnvironment) {
    Object.assign(env, opts)
  }
  setEnv(config.huggingface.env)

  return {
    config,
    setEnv
  }
}
import os from 'node:os'
import { resolve } from 'node:path'
import { name } from '../../package.json'
import { env } from '@huggingface/transformers'
import { defu } from 'defu'
import type { DataType, DeviceType, PretrainedModelOptions } from '@huggingface/transformers'
import type { TransformersEnvironment } from '.'

export type Config = typeof config

export const config = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  ref: "Config",
  type: "object",
  properties: {
    $schema: {
      description: "JSON schema reference for configuration validation",
      type: "string"
    },
  },
  huggingface: {
    env: defu({
      cacheDir: resolve(os.homedir(), `.local/share/${name}/models`),
      remoteHost: 'https://modelscope.cn/'
    } as TransformersEnvironment, env),
    pretrained: {
      model: {
        local_files_only: false,
        device: 'auto' as DeviceType,
        dtype: 'auto' as DataType
      } as PretrainedModelOptions
    }
  },
  openface: {
    tasks: {
      translation: {
        default: {
          model: "Xenova/t5-small"
        }
      }
    }
  }
}
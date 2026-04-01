import { pipeline } from "@huggingface/transformers"
import type { PretrainedModelOptions, TextGenerationConfig } from "@huggingface/transformers"
import { TranslationLanguages } from "./languages"
import { defu } from "defu"
import { useConfig } from "@/config"

const { config: { huggingface: { pretrained } } } = await useConfig()

export interface TranslationConfig extends Partial<TextGenerationConfig> {
  src_lang?: TranslationLanguages.LanguageCode
  tgt_lang?: TranslationLanguages.LanguageCode
}

export async function useTranslation(model?: string, opts?: PretrainedModelOptions) {
  const options = defu(opts, {
    ...pretrained.model
  })
  const pipe = await pipeline<'translation'>('translation', model, options)

  function translator(texts: string | string[], config?: TranslationConfig) {
    // @ts-ignore
    return pipe(texts, config);
  }

  return {
    options,
    ...pipe,
    translator
  }
}
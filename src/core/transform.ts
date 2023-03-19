import { MagicString } from '@vue/compiler-sfc'
import {
  parseSFC,
} from './utils'
import type { TransformResult } from 'unplugin'

export const transform = async (code: string, id: string): Promise<TransformResult> => {
  const sfc = await parseSFC(code, id)
  if (!sfc) return
  if (!sfc.template) return

  const { source } = sfc

  const s = new MagicString(source)
  // console.log(s.toString())

  return {
    code: s.toString(),
    get map() {
      return s.generateMap({
        source: id,
        includeContent: true,
      })
    },
  }
}

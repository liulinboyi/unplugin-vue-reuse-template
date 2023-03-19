import { parse } from '@vue/compiler-sfc'
import * as CompilerDOM from '@vue/compiler-dom'
import { parse as _parse } from '@babel/parser'
import { MagicString } from './magic-string'
import type { CompilerError } from '@vue/compiler-sfc'

export function doNothing(code?, id?) {
  const { descriptor } = parse(code, {
    filename: id,
  })
  return descriptor
}

export const errors: (CompilerError | SyntaxError)[] = []
export const parseSFC = async (code: string, id: string) => {
  
  const s = new MagicString(code)
  
  const random =  new Date().valueOf() + Math.random()
  const ast = parse(code, {
    filename: `${random}-${id}`
  });
  const template = ast.descriptor.template;
  if (!template) {
    return
  }
  let templateProps = template.ast.props
  if (templateProps.filter(n => n.name.startsWith('$')).length) {
    return
  }
  let validErrors = []
  let regx = new RegExp(/<template[ ]+(\$[A-Za-z]+)>[\s\S]*?<\/template>/)
  let regx1 = new RegExp(/<template[ ]+\$[A-Za-z]+>([\s\S]*?)<\/template>/g)

  function replacer(match, p1, offset, string) {
    let i = match.indexOf(p1)
    return match.slice(0, i - 1) + ' v-if="true"' + '>' + match.slice(i, match.length)
  }

  if (ast.errors) {
    validErrors = ast.errors.filter((n: any) => {
      let origin = n.loc.source
       let result = origin.match(regx)
       if (result) {
          n.outLetName = result[1]
       }
       n.loc.source = origin.replace(regx1, replacer)
      return regx.test(origin)
    })
  }

  CompilerDOM.transform(template.ast as any, {
    nodeTransforms: [
      (node: any) => {
        if (node.tag === 'container' && node.props.length === 1) {
          
          if (node.props[0].name === 'outlet') {
            const value = node.props[0].value.content
            let cur = validErrors.find(n => {
              return n.outLetName === `$${value}`
            })
            if (cur) {
              s.overwrite(node.loc.start.offset, node.loc.end.offset, cur.loc.source)
            }
          }
        }
      },
    ],
  })
  validErrors.forEach(n => {
    s.overwrite(n.loc.start.offset, n.loc.end.offset, '')
  })
  
  let afterReplace = s.toString()
  const { descriptor } = parse(afterReplace ? afterReplace : code, {
    filename: id
  });
  return descriptor;
}

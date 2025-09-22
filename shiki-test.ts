import { codeToTokens, codeToHtml } from 'shiki'

const html = await codeToHtml('<div class="foo">bar</div>', {
  lang: 'html',
  theme: 'min-dark'
})

console.log(html)
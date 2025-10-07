import { codeToTokens, codeToHtml } from 'shiki'

const html = await codeToHtml(`import { List } from './List';

export function HelloWorld({ features }: Props) {
  const greeting = "Hello from TS Markdown!";

  return (
    # {{ greeting }}

    Render markdown with:
    <@List items={features} />
  )
}
`, {
  lang: 'typescript',
  theme: 'min-dark'
})

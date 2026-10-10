import { readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { PAGES } from './locale-pages.ts'

/**
 * Puts the rendered content into every language page that `vite build` wrote, using the server
 * build of src/entry-server.ts. The pages stay static files; the app hydrates them in the browser.
 */
const root = fileURLToPath(new URL('..', import.meta.url))
const SERVER_DIR = `${root}dist-ssr`
const MOUNT = '<div id="app"></div>'

const { render } = (await import(`${SERVER_DIR}/entry-server.js`)) as {
  render: (locale: string) => Promise<string>
}

for (const page of PAGES) {
  const file = `${root}dist${page.path}index.html`
  const html = await readFile(file, 'utf8')
  if (!html.includes(MOUNT)) throw new Error(`${file} has no empty ${MOUNT} to render into.`)
  const app = await render(page.locale)
  // A function replacement, so `$` in the content is not read as a replacement pattern.
  await writeFile(
    file,
    html.replace(MOUNT, () => `<div id="app">${app}</div>`)
  )
  console.log(`prerendered ${page.locale} -> dist${page.path}index.html`)
}

await rm(SERVER_DIR, { recursive: true, force: true })

import fs from 'node:fs'
import path from 'node:path'

import { App } from '@/app' // Ensure Node.js types are available

import { renderToString } from 'react-dom/server'

const rootDir = process.cwd()

const HTML_PATH = path.resolve(rootDir, 'dist', 'index.html')

export const readHTML = (): string => {
  try {
    const content = fs.readFileSync(HTML_PATH, 'utf-8')
    return content
  } catch (error) {
    console.error(`Error reading file at ${HTML_PATH}:`, error)
    return ''
  }
}

export const writeHTML = (html: string): void => {
  try {
    fs.writeFileSync(HTML_PATH, html, 'utf-8')
    console.log(`HTML file written successfully to ${HTML_PATH}`)
  } catch (error) {
    console.error(`Error writing file at ${HTML_PATH}:`, error)
  }
}

export const renderAppToHTML = (): string => {
  try {
    const html = renderToString(<App />)
    return html
  } catch (error) {
    console.error('Error rendering App to HTML:', error)
    return ''
  }
}

export const generateHTML = (): void => {
  const htmlContent = readHTML()
  const appContent = renderAppToHTML()

  if (htmlContent && appContent) {
    const updatedHTML = htmlContent.replace(
      '<div id="root"></div>',
      `<div id="root">${appContent}</div>`
    )
    writeHTML(updatedHTML)
  } else {
    console.error('Failed to generate HTML: content is empty')
  }
}

generateHTML()

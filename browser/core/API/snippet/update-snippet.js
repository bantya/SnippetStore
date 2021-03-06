import { findIndexObject } from 'lib/util'
import fetchSnippets from './fetch-snippets'
import { getSnippetFile } from '../config'
const sander = require('sander')

function updateSnippet (snippet) {
  const snippets = fetchSnippets()

  const snippetIndex = findIndexObject(snippets, 'key', snippet.key)

  if (snippetIndex === -1) {
    throw new Error(`Can't find a snippet with key: ${snippets.key}`)
  }

  snippet.updateAt = new Date().getTime()
  snippets[snippetIndex] = snippet
  sander.writeFileSync(getSnippetFile(), JSON.stringify(snippets), {
    encoding: 'utf-8'
  })

  return snippetIndex
}

module.exports = updateSnippet

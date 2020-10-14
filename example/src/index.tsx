import React from 'react'
import { render } from 'react-dom'
import ReactMarkdownHeading from '../../src/index'

const markdown = '## [h2](#foo)\n### h3\n#### h4\n### h3\n# h1\n### h 3'

const App = () => (
  <ReactMarkdownHeading
    markdown={markdown}
    ulClassName="ul"
    liClassName="li"
    anchorClassName="anchor"
    hyperlink={true}
    blankSpaceReplaceText={'_'}
  />
)

render(<App />, document.getElementById('root'))

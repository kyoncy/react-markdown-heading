import React from 'react'
import { render } from 'react-dom'
import ReactMarkdownHeading from '../../src/index'

const markdown = '## h2\n### h3\n#### h4\n### h3\n# h1\n### h 3'

const App = () => {
  const [value, setValue] = React.useState(markdown)

  return (
    <div>
      <ReactMarkdownHeading
        markdown={value}
        hyperlink={true}
        hyperLinkPrefix="h-"
      />
      <textarea
        defaultValue={value}
        onChange={(event) => setValue(event.target.value)}
        style={{ width: 300, height: 300 }}
      />
    </div>
  )
}

render(<App />, document.getElementById('root'))

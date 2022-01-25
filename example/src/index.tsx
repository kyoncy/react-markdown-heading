import React from 'react'
import { render } from 'react-dom'
import ReactMarkdownHeading from '../../src/index'
import { Heading } from '../../src/util/parseHeadingText'
import './index.css'

const markdown = '## h2\n### h3\n#### h4\n### h3\n# h1\n### h 3'

const App = () => {
  const [value, setValue] = React.useState(markdown)
  const [activeHeading, setActiveHeading] = React.useState<Heading[]>([])

  return (
    <div>
      <ReactMarkdownHeading
        markdown={value}
        hyperlink={true}
        hyperLinkPrefix="h-"
        onChangeHeading={(headingList) => {
          setActiveHeading([headingList[2]])
        }}
        liClassName="li"
        activeLiClassName="activeLi"
        activeAnchorClassName="activeAnchor"
        activeHeading={activeHeading}
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

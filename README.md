# react-markdown-heading

Render markdown headings to sidebar.

## Install

```
npm install react-markdown-heading
```

## How to Use

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import ReactMarkdownHeading from 'react-markdown-heading'

const markdown = '## h2\n### h3\n#### h4\n### h3\n# h1\n### h3'

render(
  <ReactMarkdownHeading markdown={markdown} />,
  document.getElementById('root')
)
```

<kbd><img src="https://i.imgur.com/7G1VSns.png" width="100%" height="auto" alt="screen shot" /></kbd>

## Option

- `markdown` - _string_, The Markdown source to parse (**required**)
- `ulClassName` - _string_, Class name of the ul element
- `liClassName` - _string_, Class name of the li element

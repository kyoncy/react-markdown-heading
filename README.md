# react-markdown-heading

Render markdown headings to sidebar.

[![npm version](https://badge.fury.io/js/react-markdown-heading.svg)](https://badge.fury.io/js/react-markdown-heading)
[![install size](https://packagephobia.com/badge?p=react-markdown-heading)](https://packagephobia.com/result?p=react-markdown-heading)
[![minified size](https://badgen.net/bundlephobia/min/react-markdown-heading)](https://bundlephobia.com/result?p=react-markdown-heading)
[![minzipped size](https://badgen.net/bundlephobia/minzip/react-markdown-heading)](https://bundlephobia.com/result?p=react-markdown-heading)

## Install

```
npm install react-markdown-heading
```

## How to Use

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import ReactMarkdownHeading from 'react-markdown-heading'

const markdown = '## [h2](#foo)\n### h3\n#### h4\n### h3\n# h1\n### h3'

render(
  <ReactMarkdownHeading markdown={markdown} hyperlink={true} />,
  document.getElementById('root')
)
```

<kbd><img src="https://i.imgur.com/7G1VSns.png" width="100%" height="auto" alt="screen shot" /></kbd>

## Option

- `markdown` - _string_, The Markdown source to parse (**required**)
- `ulClassName` - _string_, Class name of the ul tag (optional)
- `liClassName` - _string_, Class name of the li tag (optional)
- `anchorClassName` - _string_, Class name of the a tag (optional)
- `hyperlink` - _boolean_, Add hyperlink to text (default `false`)
- `blankSpaceReplaceText` - _string_, Replace blank space in hyperlink to this (default `-`)
  - The markdown `## foo bar`'s hyperlink is `href="#foo-bar"`

# react-markdown-heading

Render markdown table of contents as React component.

[![npm version](https://badge.fury.io/js/react-markdown-heading.svg)](https://badge.fury.io/js/react-markdown-heading)
[![install size](https://packagephobia.com/badge?p=react-markdown-heading)](https://packagephobia.com/result?p=react-markdown-heading)
[![minified size](https://badgen.net/bundlephobia/min/react-markdown-heading)](https://bundlephobia.com/result?p=react-markdown-heading)
[![minzipped size](https://badgen.net/bundlephobia/minzip/react-markdown-heading)](https://bundlephobia.com/result?p=react-markdown-heading)
[![codecov](https://codecov.io/gh/kyoncy/react-markdown-heading/branch/main/graph/badge.svg?token=SOQUUD4XH1)](https://codecov.io/gh/kyoncy/react-markdown-heading)

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
  <ReactMarkdownHeading markdown={markdown} hyperlink={true} />,
  document.getElementById('root')
)
```

<kbd><img src="https://i.imgur.com/7G1VSns.png" height="auto" alt="screen shot" /></kbd>

## Option

- **markdown** - `string`, The Markdown source to parse (**required**)
- **ulClassName** - `string`, Class name of the ul tag (optional)
- **liClassName** - `string`, Class name of the li tag (optional)
- **anchorClassName** - `string`, Class name of the anchor tag (optional)
- **hyperlink** - `boolean`, Add hyperlink to text (default `false`)
- **blankSpaceReplaceText** - `string`, Replace blank space in hyperlink to this (default `-`)
- **headingDepth** - `1 | 2 | 3 | 4 | 5 | 6`, Depth of heading to display (default `6`)

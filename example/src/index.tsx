import React from "react";
import { render } from "react-dom";
import ReactMarkdownHeading from "../../src/index"

const markdown = "## h2\n### h3\n#### h4\n### h3\n# h1\n### h3"

const App = () => <ReactMarkdownHeading markdown={markdown} />;
// const App = () => <div>hoge</div>

render(<App />, document.getElementById('root'));

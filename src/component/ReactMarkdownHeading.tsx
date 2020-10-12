import React, { useEffect } from "react";
import Heading from "./Heading";
import markdownToAST from "../util/markdownToAST";
import pickHeadingFromAST from "../util/pickHeadingFromAST";
import parseHeadingAST from "../util/parseHeadingAST";

interface ReactMarkdownHeadingProps {
  markdown: string;
}

const ReactMarkdownHeading: React.FC<ReactMarkdownHeadingProps> = ({ markdown }) => {
  const ast = markdownToAST(markdown);
  const headingAst = pickHeadingFromAST(ast);
  const headingList = parseHeadingAST(headingAst);

  return (
    <Heading headingList={headingList} />
  )
}

export default ReactMarkdownHeading;

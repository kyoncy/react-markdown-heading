import React, { FC } from "react";
import { HeadingWithParentId } from "../util/parseHeadingAST";

interface HeadingProps {
  headingList: HeadingWithParentId[];
  rootId?: number;
}

const Heading: FC<HeadingProps> = ({ headingList, rootId = 0 }) => {
  const filteredList = headingList.filter((item) => item.parentId === rootId);

  if (filteredList.length === 0) return null;

  return (
    <ul>
      {filteredList.map((item, index) => {
        const text = item.children[0].value as string;
        return (
          <li key={index}>
            <a href={`#${text}`}>{text}</a>
            <Heading headingList={headingList} rootId={item.id} />
          </li>
        )
      })}
    </ul>
  );
}

export default Heading;

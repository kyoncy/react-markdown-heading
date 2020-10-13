import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Heading from '../../src/component/Heading'
import markdownToAST from '../../src/util/markdownToAST'
import pickHeadingFromAST from '../../src/util/pickHeadingFromAST'
import parseHeadingAST from '../../src/util/parseHeadingAST'

configure({ adapter: new Adapter() })

describe('Heading component', () => {
  test('display Heading', () => {
    const markdown = '## h2\n### h3\n#### h4\n### h3\n# h1\n### h3'

    const ast = markdownToAST(markdown)
    const headingAst = pickHeadingFromAST(ast)
    const headingList = parseHeadingAST(headingAst)
    const rootId = 0

    const component = mount(
      <Heading headingList={headingList} rootId={rootId} />
    )

    const headings = component.childAt(0)
    expect(headings.find(Heading)).toHaveLength(headingList.length)
    const rootUl = component.find('ul').at(0)
    expect(rootUl.children()).toHaveLength(2)

    // id: 1's children is [2, 3, 4]
    const firstDepth1Ul = rootUl.childAt(0).find('ul').at(0)
    expect(firstDepth1Ul.find(Heading)).toHaveLength(3)

    // id: 2's children is [3]
    const firstDepth2Ul = firstDepth1Ul.childAt(0).find('ul').at(0)
    expect(firstDepth2Ul.find(Heading)).toHaveLength(1)

    // id: 3's children is []
    const firstDepth3Ul = firstDepth2Ul.childAt(0).find('ul').at(0)
    expect(firstDepth3Ul.find(Heading)).toHaveLength(0)

    // id: 4's children is []
    const secondDepth2Ul = firstDepth1Ul.childAt(1).find('ul').at(0)
    expect(secondDepth2Ul.find(Heading)).toHaveLength(0)

    // id: 5's children is [6]
    const secondDepth1Ul = rootUl.childAt(1).find('ul').at(0)
    expect(secondDepth1Ul.find(Heading)).toHaveLength(1)

    // id: 6's children is []
    const thirdDepth2Ul = secondDepth1Ul.childAt(0).find('ul').at(0)
    expect(thirdDepth2Ul.find(Heading)).toHaveLength(0)
  })
})

import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Heading from '../../src/component/Heading'
import markdownToAst from '../../src/util/markdownToAst'
import pickHeadingFromAst from '../../src/util/pickHeadingFromAst'
import parseHeadingAST from '../../src/util/parseHeadingAST'

configure({ adapter: new Adapter() })

describe('Heading component', () => {
  const markdown = '# h1'
  const rootId = 0

  function markdownToHeadingList(markdown: string) {
    const headingAst = pickHeadingFromAst(markdownToAst(markdown))
    return parseHeadingAST(headingAst)
  }

  test('display anchor', () => {
    const headingList = markdownToHeadingList(markdown)
    let component = mount(
      <Heading
        headingList={headingList}
        rootId={rootId}
        hyperlink={true}
        anchorClassName={'anchor'}
      />
    )
    expect(component.find('li')).toHaveLength(1)
    expect(component.find('a')).toHaveLength(1)
    expect(component.find('.anchor')).toHaveLength(1)
    expect(component.find('a').prop('href')).toEqual('#h1')

    component = mount(<Heading headingList={headingList} rootId={rootId} />)
    expect(component.find('li')).toHaveLength(1)
    expect(component.find('a')).toHaveLength(0)
  })

  test('heading text has blank space', () => {
    const markdown = '# h 1'
    const headingList = markdownToHeadingList(markdown)

    const component = mount(
      <Heading headingList={headingList} rootId={rootId} hyperlink={true} />
    )
    expect(component.find('a').prop('href')).toEqual('#h-1')
  })

  test('ignore heading in code block', () => {
    const markdown =
      '```markdown\n# h1\n## h2\n```\n\n```python\n# comment\n```'
    const headingList = markdownToHeadingList(markdown)

    const component = mount(
      <Heading headingList={headingList} rootId={rootId} />
    )
    expect(component.find('li')).toHaveLength(0)
  })

  test('remove "#" from end of heading text', () => {
    const markdown = '# h1 #####'
    const headingList = markdownToHeadingList(markdown)

    const component = mount(
      <Heading headingList={headingList} rootId={rootId} hyperlink={true} />
    )
    expect(component.find('a').prop('href')).toEqual('#h1')
  })

  test('set blankSpaceReplaceText', () => {
    const markdown = '# h 1'
    const headingList = markdownToHeadingList(markdown)

    const component = mount(
      <Heading
        headingList={headingList}
        rootId={rootId}
        hyperlink={true}
        blankSpaceReplaceText="_"
      />
    )
    expect(component.find('a').prop('href')).toEqual('#h_1')
  })

  test('custom hyperlink', () => {
    const markdown = '# [h1](#foo)'
    const headingList = markdownToHeadingList(markdown)

    const component = mount(
      <Heading headingList={headingList} rootId={rootId} hyperlink={true} />
    )
    expect(component.find('a').prop('href')).toEqual('#h1')
  })

  test('display classname', () => {
    const headingList = markdownToHeadingList(markdown)
    let component = mount(
      <Heading
        headingList={headingList}
        rootId={rootId}
        ulClassName={'ul'}
        liClassName={'li'}
        anchorClassName={'anchor'}
      />
    )
    expect(component.find('.ul')).toHaveLength(1)
    expect(component.find('.li')).toHaveLength(1)
    expect(component.find('.anchor')).toHaveLength(0) // Because hyperlink is false

    component = mount(<Heading headingList={headingList} rootId={rootId} />)
    expect(component.find('.ul')).toHaveLength(0)
    expect(component.find('.li')).toHaveLength(0)
    expect(component.find('.anchor')).toHaveLength(0)
  })

  test('display Heading', () => {
    const markdown = '## h2\n### h3\n#### h4\n### h3\n# h1\n### h3'
    const headingList = markdownToHeadingList(markdown)
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

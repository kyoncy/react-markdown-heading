import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Heading from '../../src/component/Heading'
import markdownToAst from '../../src/util/markdownToAst'
import pickHeadingFromAst from '../../src/util/pickHeadingFromAst'
import parseHeadingAST from '../../src/util/parseHeadingAST'
import parseHeadingText, {
  Heading as HeadingType,
} from '../../src/util/parseHeadingText'

configure({ adapter: new Adapter() })

describe('Heading component', () => {
  function markdownToHeadingList(
    markdown: string,
    blankSpaceReplaceText = '-'
  ) {
    const headingAst = pickHeadingFromAst(markdownToAst(markdown))
    const headingList = parseHeadingAST(headingAst)
    return parseHeadingText(headingList, blankSpaceReplaceText)
  }

  test('display anchor', () => {
    const markdown = '# h1'
    const headingList = markdownToHeadingList(markdown)
    let component = mount(
      <Heading
        headingList={headingList}
        hyperlink={true}
        anchorClassName={'anchor'}
      />
    )
    expect(component.find('li')).toHaveLength(1)
    expect(component.find('a')).toHaveLength(1)
    expect(component.find('.anchor')).toHaveLength(1)
    expect(component.find('a').prop('href')).toEqual('#h1')

    component = mount(<Heading headingList={headingList} />)
    expect(component.find('li')).toHaveLength(1)
    expect(component.find('a')).toHaveLength(0)
  })

  test('heading text has blank space', () => {
    const markdown = '# h 1'
    const headingList = markdownToHeadingList(markdown)

    const component = mount(
      <Heading headingList={headingList} hyperlink={true} />
    )
    expect(component.find('a').prop('href')).toEqual('#h-1')
  })

  test('duplicate href', () => {
    const markdown = '# h1\n# h1\n# h1'
    const headingList = markdownToHeadingList(markdown)

    const component = mount(
      <Heading headingList={headingList} hyperlink={true} />
    )
    expect(component.find('a').at(0).prop('href')).toEqual('#h1')
    expect(component.find('a').at(1).prop('href')).toEqual('#h1-1')
    expect(component.find('a').at(2).prop('href')).toEqual('#h1-2')
  })

  test('ignore heading in code block', () => {
    const markdown =
      '```markdown\n# h1\n## h2\n```\n\n```python\n# comment\n```'
    const headingList = markdownToHeadingList(markdown)

    const component = mount(<Heading headingList={headingList} />)
    expect(component.find('li')).toHaveLength(0)
  })

  test('remove "#" from end of heading text', () => {
    const markdown = '# h1 #####'
    const headingList = markdownToHeadingList(markdown)

    const component = mount(
      <Heading headingList={headingList} hyperlink={true} />
    )
    expect(component.find('a').prop('href')).toEqual('#h1')
  })

  test('set blankSpaceReplaceText', () => {
    const markdown = '# h 1'
    const headingList = markdownToHeadingList(markdown, '_')

    const component = mount(
      <Heading headingList={headingList} hyperlink={true} />
    )
    expect(component.find('a').prop('href')).toEqual('#h_1')
  })

  test('custom hyperlink', () => {
    const markdown = '# [h1](#foo)'
    const headingList = markdownToHeadingList(markdown)

    const component = mount(
      <Heading headingList={headingList} hyperlink={true} />
    )
    expect(component.find('a').prop('href')).toEqual('#h1')
  })

  test('display classname', () => {
    const markdown = '# h1'
    const headingList = markdownToHeadingList(markdown)
    let component = mount(
      <Heading
        headingList={headingList}
        ulClassName={'ul'}
        liClassName={'li'}
        anchorClassName={'anchor'}
      />
    )
    expect(component.find('.ul')).toHaveLength(1)
    expect(component.find('.li')).toHaveLength(1)
    expect(component.find('.anchor')).toHaveLength(0) // Because hyperlink is false

    component = mount(<Heading headingList={headingList} />)
    expect(component.find('.ul')).toHaveLength(0)
    expect(component.find('.li')).toHaveLength(0)
    expect(component.find('.anchor')).toHaveLength(0)
  })

  test('display Heading', () => {
    const markdown = '## h2\n### h3\n#### h4\n### h3\n# h1\n### h3'
    const headingList = markdownToHeadingList(markdown)

    const component = mount(<Heading headingList={headingList} />)

    const headings = component.childAt(0)
    expect(headings.find(Heading)).toHaveLength(6)
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

  test('set headingDepth 3', () => {
    const markdown = '## h2\n### h3\n#### h4\n### h3\n# h1\n### h3'
    const headingAst = pickHeadingFromAst(markdownToAst(markdown), 3)
    const headingList = parseHeadingText(parseHeadingAST(headingAst))

    const component = mount(<Heading headingList={headingList} />)

    const headings = component.childAt(0)
    expect(headings.find(Heading)).toHaveLength(5)
  })

  test('set headingDepth 2', () => {
    const markdown = '## h2\n### h3\n#### h4\n### h3\n# h1\n### h3'
    const headingAst = pickHeadingFromAst(markdownToAst(markdown), 2)
    const headingList = parseHeadingText(parseHeadingAST(headingAst))

    const component = mount(<Heading headingList={headingList} />)

    const headings = component.childAt(0)
    expect(headings.find(Heading)).toHaveLength(2)
  })

  test('no heading', () => {
    const headingList: HeadingType[] = []
    const component = mount(<Heading headingList={headingList} />)

    expect(component.getDOMNode()).toEqual(null)
  })
})

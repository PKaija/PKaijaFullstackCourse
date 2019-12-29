import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

describe('Untoggled component is rendered correctly', () => {
  const blogObj = {
    title: 'Blog test',
    author: 'aaa',
    likes: 5,
    url: '12345',
    userId: 'PlaceholderUserId'
  }
  const userObj = {
    username: 'aaa'
  }
  let component
  beforeEach(() => {
    component = render(
      <Blog blog={blogObj} removeBlogById={() => console.log('Clicked remove button')} user={userObj}/>
    )
  })
  test('At first, only the title and author of the blog are visible', () => {
    const div = component.container.querySelector('.expandableContent')
    expect(div).toHaveStyle('display: none')
  })
  test('Unexpanded component displays right information', () => {
    const div = component.container.querySelector('.clickableText')
    expect(div).toHaveTextContent('Blog test - aaa')
  })
  test('The component expands by clicking the text', () => {
    const div = component.container.querySelector('.expandableContent')
    const clickText = component.container.querySelector('.clickableText')
    fireEvent.click(clickText)
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent('12345')
  })
})
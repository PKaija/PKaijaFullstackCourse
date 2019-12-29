import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

describe('Testing the rendering of <SimpleBlog/>', () => {
  const Blog = {
    title: 'Simple Blog test',
    author: 'aaa',
    likes: 5,
    url: 'Simple Blog url',
  }
  const mockHandler = jest.fn()
  let component
  beforeEach(() => {
    component = render(
      <SimpleBlog blog = {Blog} onClick={mockHandler}/>
    )
  })
  test('Renders title and author', () => {
    const div = component.container.querySelector('.titleAndAuthor')
    expect(div).toHaveTextContent('Simple Blog test aaa')
  })
  test('Renders the likes', () => {
    const div = component.container.querySelector('.likes')
    expect(div).toHaveTextContent('blog has 5 likes')
  })
  test('Like button works correctly', () => {
    const button = component.container.querySelector('.likeButton')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})

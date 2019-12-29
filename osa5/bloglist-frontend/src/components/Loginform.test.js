import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, waitForElement } from '@testing-library/react'
import App from '../App'
jest.mock('../services/login')
jest.mock('../services/blogs')

afterEach(cleanup)
describe('<App/>', () => {
  test('If user is not logged in, no blogs are rendered', async () => {
    const component = render(
      <App/>
    )
    component.rerender(<App/>)
    await waitForElement(
      () => component.container.querySelector('.loginForm')
    )
    const blogs = component.container.querySelectorAll('.blogComponent')
    expect(blogs.length).toBe(0)
  })
  test('If user is logged in, blog list is displayed correctly', async () => {
    const component = render(
      <App/>
    )
    const user = {
      username: 'aaa',
      token: '123123123123',
      name: 'aaa'
    }
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    component.rerender(<App/>)
    let blogs
    await waitForElement(
      () => blogs = component.container.querySelectorAll('.blogComponent')
    )
    expect(blogs.length).not.toBe(0)
  })
})
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-typos */
import React, { useState } from 'react'
import blogService from '../services/blogs.js'
import PropTypes from 'prop-types'


const Blog = ({ blog, removeBlogById, user }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const blogStyle = {
    borderWidth: 1,
    border:'solid',
    padding: 2,
  }


  const expandVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  const incrementLikes = async () => {
    const updatedBlog = blog
    updatedBlog.likes += 1
    const response = await blogService.update(blog.id, updatedBlog)
    setLikes(response.likes)
  }

  const removeBlog = async () => {
    if(window.confirm(`Are you sure you want to remove ${blog.title} by ${blog.author} ?`)){
      removeBlogById(blog.id)
    }
  }

  const isIdCorrect = user.username === blog.userId.name
  return (
    <div className="blogComponent" style={blogStyle}>
      <p className="clickableText" onClick={() => toggleVisibility()}>{blog.title} - {blog.author}</p>
      <div className="expandableContent" style={expandVisible}>
        <a href={blog.url}>{blog.url}</a>
        <p>{blog.likes}</p>
        <button onClick={() => incrementLikes()}>Like</button>
        {isIdCorrect ? <button onClick={() => removeBlog()}>Remove</button> : ''}
      </div>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  removeBlogById: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}
export default Blog
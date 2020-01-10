import React from 'react'
import PropTypes from 'prop-types'
/* eslint-disable react/no-typos */
const BlogForm = (
  {
    handleSubmit,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    title,
    author,
    url
  }) => {


  return (
    <div>
      <form onSubmit={handleSubmit}>
        Title:
        <input type="text" value={title} onChange={handleTitleChange}/><br/>
        Author:
        <input type="text" value={author} onChange={handleAuthorChange}/><br/>
        Url:
        <input type="text" value={url} onChange={handleUrlChange}/><br/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default BlogForm
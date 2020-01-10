import React, { useState } from 'react'
import { likeBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'
import store from '../store.js'



const Blog = ({ blog, removeBlogById, user }) => {
  //const [visible, setVisible] = useState(false)

  if(blog===undefined){
    return null
  }
  
  //const user = store.getState().user

  const blogStyle = {
    borderWidth: 1,
    border:'solid',
    padding: 2,
  }


/*   const expandVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
 */

  const incrementLikes = async () => {
    store.dispatch(likeBlog(blog))
  }

  const removeBlog = async () => {
    if(window.confirm(`Are you sure you want to remove ${blog.title} by ${blog.author} ?`)){
      removeBlogById(blog.id)
    }
  }

  var isUserCorrect = user.username === blog.userId.name


  return (
    <div className="blogComponent" style={blogStyle}>
      <p className="clickableText" onClick={() => console.log('penis')}>{blog.title} - {blog.author}</p>

        <a href={blog.url}>{blog.url}</a>
        <p>{blog.likes}</p>
        <button onClick={() => incrementLikes()}>Like</button>
        {isUserCorrect ? <button onClick={() => removeBlog()}>Remove</button> : ''}

    </div>
  )}


export default Blog
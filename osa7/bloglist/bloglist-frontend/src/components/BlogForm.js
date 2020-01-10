import React from 'react'
import store from '../store'
import { createNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { changeTitle, changeAuthor, changeUrl } from '../reducers/fieldReducer'

const BlogForm = () => {

  const title = store.getState().fields.title
  const author = store.getState().fields.author
  const url = store.getState().fields.url

  const resetBlogFields = () => {
    store.dispatch(changeTitle(''))
    store.dispatch(changeAuthor(''))
    store.dispatch(changeUrl(''))
  }

 
  const handleSubmit = (event) => {
    event.preventDefault()
    try{
      const newBlog = {
        title: title,
        author: author,
        url: url
      }
      store.dispatch(createBlog(newBlog))
      store.dispatch(createNotification(`Successfully added blog: ${newBlog.title} by ${newBlog.author}`, 'success'))
      resetBlogFields()
    }catch(e){
      console.log(e)
      store.dispatch(createNotification('Failed to create blog', 'error'))
      resetBlogFields()
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Title:
        <input type="text" value={title} onChange={(event) => store.dispatch(changeTitle(event.target.value))}/><br/>
        Author:
        <input type="text" value={author} onChange={(event) => store.dispatch(changeAuthor(event.target.value))}/><br/>
        Url:
        <input type="text" value={url} onChange={(event) => store.dispatch(changeUrl(event.target.value))}/><br/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}



export default BlogForm
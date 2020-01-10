import React from 'react'
import store from '../store'
import Blog from './Blog'
import { createNotification } from '../reducers/notificationReducer'
import { removeBlog } from '../reducers/blogReducer'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const BlogView = () => {
    const blogs = store.getState().blogs
    //const user = store.getState().user


    const removeBlogById = async (id) => {
        try{
            store.dispatch(removeBlog(id))
            store.dispatch(createNotification('Successfully removed blog', 'success'))
        }catch(e){
            store.dispatch(createNotification('Failed to remove blog', 'error'))
        }
    }

    const blogFormRef = React.createRef()

    return (
        <div>
            <Togglable buttonLabel = "New Blog" ref={blogFormRef}>
                <BlogForm />
            </Togglable>
            {blogs.map(blog => <Blog key={blog.id} blog={blog} removeBlogById={(id) => removeBlogById(id)}/>)}
        </div>
    )
}

export default BlogView
import React from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import store from '../store'

const BlogList = () => {
    const blogs = store.getState().blogs
    const blogFormRef = React.createRef()

    return (
        <div>
            <Togglable buttonLabel="New Blog" ref={blogFormRef}>
                <BlogForm/>
            </Togglable>
            {blogs.map(blog => <div className='blogList' key={blog.id} ><a href={`/blogs/${blog.id}`}>{blog.title}</a></div>)}
        </div>
    )
}


export default BlogList
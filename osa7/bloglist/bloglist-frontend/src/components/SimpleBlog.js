import React from 'react'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'
import store from '../store.js'

const SimpleBlog = ({blog, user}) => {

    if(blog === undefined){
        return null
    }
    const isUserCorrect = user.username === blog.userId.name

    const incrementLikes = async () => {
        store.dispatch(likeBlog(blog))
    }

    const removeThisBlog = () => {
        if(window.confirm('Are you sure you want to remove this blog?')){
            try{
                store.dispatch(removeBlog(blog.id))
                store.dispatch(createNotification('Successfully removed blog', 'success'))
            }catch(e){
                console.log(e)
                store.dispatch(createNotification('Failed to remove blog', 'error'))
            }
        }
    }
    
    
    return (
        <div className="blogComponent">
            <h2>{blog.title}</h2>
            <a href={blog.url}>{blog.url}</a>
            <p>Likes: {blog.likes}</p>
            <button onClick={() => incrementLikes()}>Like</button>
            {isUserCorrect ? <button onClick={() => removeThisBlog()}>Remove</button> : null}
        </div>
    )
}

export default SimpleBlog
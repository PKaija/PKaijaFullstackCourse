import React from 'react'

const User = ({user}) => {

    if(user===undefined){
        return null
    }
    
    return (
        <div>
            <h2>{user.username}</h2>
            <h3>Added blogs</h3>
            {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
        </div>
    )
}

export default User
import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div className='simpleBlog'>
    <div className='titleAndAuthor'>
      { blog.title } { blog.author }
    </div>
    <div className='likes'>
        blog has { blog.likes } likes
      <button className='likeButton' onClick={onClick}>Like</button>
    </div>
  </div>
)


export default SimpleBlog
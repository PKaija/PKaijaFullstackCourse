import blogService from '../services/blogs'

export const initBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const createBlog = (newBlog) => {
    return async dispatch => {
        const response = await blogService.create(newBlog)
        console.log(response)
        dispatch({
            type: 'CREATE_BLOG',
            data: response
        })
    }
}

export const removeBlog = (id) => {
    return async dispatch => {
        await blogService.deleteBlog(id)
        dispatch({
            type: 'REMOVE_BLOG',
            data: id
        })
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        const newBlog = {...blog, likes: blog.likes + 1}
        const id = blog.id
        await blogService.update(id, newBlog)
        dispatch({
            type: 'LIKE_BLOG',
            data: newBlog
        })
    }
}

export const emptyBlogs = () => {
    return {
        type: 'EMPTY_BLOGS'
    }
}

const reducer = (state = [], action) => {
    //console.log(action.type)
    switch (action.type) {

        case 'REMOVE_BLOG': return state.filter(b => b.id !== action.data).sort((a, b) => b.likes - a.likes)

        case 'CREATE_BLOG': return [...state, action.data].sort((a, b) => b.likes - a.likes)

        case 'INIT_BLOGS': return action.data.sort((a, b) => b.likes - a.likes)

        case 'EMPTY_BLOGS': return []

        case 'LIKE_BLOG': {
            const newBlog = action.data
            const newId = newBlog.id
            return state.map(b => b.id !== newId ? b : newBlog).sort((a, b) => b.likes - a.likes)
        }

        default: return state
    }
} 

export default reducer
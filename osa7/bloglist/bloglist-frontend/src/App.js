import React, { useEffect } from 'react'
import { setUser } from './reducers/userReducer'
import { initBlogs, removeBlog } from './reducers/blogReducer'
import { createNotification } from './reducers/notificationReducer'
import { getUsers } from './reducers/allUsersReducer'


import { BrowserRouter as Router, Route } from 'react-router-dom'

import blogService from './services/blogs'
import BlogView from './components/BlogView'
import Blog from './components/Blog'
import SimpleBlog from './components/SimpleBlog'
import BlogList from './components/BlogList'
import LoginForm from './components/Loginform'
import Notification from './components/Notification'
import UserList from './components/UserList'
import User from './components/User'

import store from './store'

const Menu = () => {
    return (
        <div>
            <a href='/blogs'>Blogs</a>
            <a href='/users'>Users</a>
        </div>
    )
}

const App = (props) => {

    useEffect(() => {
        const loggedUserJson = window.localStorage.getItem('loggedBlogAppUser')
        if(loggedUserJson){
            const user = JSON.parse(loggedUserJson)
            store.dispatch(setUser(user))
            blogService.setToken(user.token)
            store.dispatch(initBlogs())
            store.dispatch(getUsers())
        }
    }, [])

    const user = store.getState().user

    const removeBlogById = async (id) => {
        try{
            store.dispatch(removeBlog(id))
            store.dispatch(createNotification('Successfully removed blog', 'success'))
        }catch(e){
            store.dispatch(createNotification('Failed to remove blog', 'error'))
        }
    }

    const userById = (id) => store.getState().allUsers.find(u => u.id === id)
    const blogById = (id) => store.getState().blogs.find(b => b.id === id)

    return (
        <div>
            <Notification />

            <h2>Bloglists</h2>
            {store.getState().user === null ? null : <Menu/>}
            <LoginForm/>
            {store.getState().user === null
            ? null
            :
            <div>
            
            <Router>
            <div>
            </div>
                <Route exact path='/' render={ () => <BlogList />}/>
                <Route exact path='/blogs' render={() => <BlogList />} />
                <Route exact path='/blogs/:id' render={ ({match}) => <SimpleBlog blog={blogById(match.params.id)} removeBlogById={() => removeBlogById(match.params.id)} user={user}/>} /> 
                <Route exact path='/users' render={ () => <UserList/>}/>
                <Route exact path='/users/:id' render={({match}) => <User user={userById(match.params.id)}/>}/>
            </Router>
            </div>
            }
        </div>
    )
}

export default App
/* eslint-disable react/no-typos */
import React from 'react'
import store from '../store'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { createNotification } from '../reducers/notificationReducer'
import { changeUsername, changePassword } from '../reducers/fieldReducer'
import { setUser, emptyUser } from '../reducers/userReducer'
import { initBlogs, emptyBlogs } from '../reducers/blogReducer'

const LoginForm = () => {

  const username = store.getState().fields.username
  const password = store.getState().fields.password

  const resetLoginFields = () => {
    store.dispatch(changeUsername(''))
    store.dispatch(changePassword(''))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      store.dispatch(setUser(user))
      blogService.setToken(user.token)
      store.dispatch(initBlogs())
      store.dispatch(createNotification(`Logged in as ${username}`, 'success'))
      resetLoginFields()
    }catch(e){
      store.dispatch(createNotification(`Failed to log in: ${e}`, 'error'))
      resetLoginFields()

    }
  }

  const logOut = () => {
    window.localStorage.clear()
    store.dispatch(emptyUser())
    store.dispatch(emptyBlogs())
    store.dispatch(createNotification('Logged out', 'success'))
    

  }

  return store.getState().user === null
  ? (
      <div className="loginForm">
        <form onSubmit={handleLogin}>
        Username: <br/>
          <input type="text" value={username} onChange={(event) => store.dispatch(changeUsername(event.target.value))}/><br/>
        Password: <br/>
          <input type="text" value={password} onChange={(event) => store.dispatch(changePassword(event.target.value))}/><br/>
          <button type="submit">Log in</button>
        </form>
      </div>
    )

  : (
    <div>
      <button onClick={logOut}>Log out</button>
    </div>
  )
}


export default LoginForm
import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import LoginForm from './components/Loginform'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import ErrorBox from './components/ErrorBox'
import SuccessBox from './components/SuccessBox'
import { useField } from './hooks/index'





const App = () => {
  const [blogs, setBlogs] = useState([])
  /* const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') */
  const username = useField('text')
  const password = useField('text')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  /* const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('') */
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const [user, setUser] = useState(null)

  /* const newTitle = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('text') */


  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJson){
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
      updateBlogs(user)
    }
  }, [])


  const updateBlogs = async () => {
    const response = await blogService.getAll()
    //filter(blog => user.username === blog.userId.name)
    setBlogs(response.sort((a,b) => b.likes - a.likes))
  }

  const resetBlogFields = () => {
    /* setTitle('')
    setAuthor('')
    setUrl('') */
    title.reset()
    author.reset()
    url.reset()
  }


  const resetLoginFields = () => {
    /* setUsername('')
    setPassword('') */
    username.reset()
    password.reset()
  }

  const logOut = () => {
    window.localStorage.clear()
    setUser(null)
    setBlogs([])
    showSuccess('Successfully logged out')
  }


  const showError = (errorInput) => {
    setErrorMessage(errorInput)
    setTimeout(() => {
      setErrorMessage('')
    }, 5000)
  }
  const showSuccess = (successInput) => {
    setSuccessMessage(successInput)
    setTimeout(() => {
      setSuccessMessage('')
    }, 5000)
  }


  const handleLogin = async event => {
    event.preventDefault()
    try{

      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      updateBlogs(user)
      showSuccess(`Successfully logged in as ${username.value}`)
      resetLoginFields()

    }catch(exception){
      console.log(exception)
      showError('Incorrect credentials')
    }
  }

  const submitBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    try{
      const newTitle = title.value
      const newAuthor = author.value
      const newUrl = url.value
      await blogService.create({
        title: newTitle,
        author: newAuthor,
        url: newUrl
      })
      const all_blogs = await blogService.getAll()
      setBlogs(all_blogs.sort((a,b) => b.likes - a.likes))
      //setBlogs(blogs.concat(blog))
      showSuccess(`Successfully added blog: ${newTitle} by ${newAuthor}`)
      resetBlogFields()
    }catch(e){
      console.log(e)
      showError('Failed to submit blog')
    }
  }

  const removeBlog = async (id) => {
    try{
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      showSuccess('Successfully removed blog')
    }catch(e){
      console.log(e)
      showError('Failed to remove blog')
    }
  }


  const blogFormRef = React.createRef()

  /*
  handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}

  */


  const loginFields = {
    handleSubmit: handleLogin,
    handleUsernameChange: username.onChange,
    handlePasswordChange: password.onChange,
    username: username.value,
    password: password.value
  }

  const blogFields = {
    handleSubmit: submitBlog,
    handleTitleChange: title.onChange,
    handleAuthorChange: author.onChange,
    handleUrlChange: url.onChange,
    title: title.value,
    author: author.value,
    url: url.value,
  }


  return (
    <div>
      {errorMessage && <ErrorBox errorMessage={errorMessage}/>}
      {successMessage && <SuccessBox successMessage={successMessage}/>}
      <h3>Welcome to the service</h3>
      {user === null ?
        <LoginForm
          {...loginFields}/>
        :
        <div>
          <p>Logged in as {user.name}</p>
          <button onClick={() => logOut()}>Log out</button>
          <Togglable buttonLabel="New blog" ref={blogFormRef}>
            <BlogForm
              {...blogFields}
            />
          </Togglable>
        </div>}<br/>

      {blogs.map(blog => <Blog key={blog.id} blog={blog} removeBlogById={(id) => removeBlog(id)} user={user}/>)}
    </div>
  )
}

export default App

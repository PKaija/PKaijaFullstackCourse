/* eslint-disable react/no-typos */
import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div className="loginForm">
      <form onSubmit={handleSubmit}>
      Username: <br/>
        <input type="text" value={username} onChange={handleUsernameChange}/><br/>
      Password: <br/>
        <input type="text" value={password} onChange={handlePasswordChange}/><br/>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm
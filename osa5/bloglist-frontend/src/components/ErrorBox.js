import React from 'react'

const ErrorBox = ({ errorMessage }) => {
  return (
    <div style={{ color:'red', borderStyle:'solid', padding: 10, backgroundColor:'lightgrey' }}>
      {errorMessage}
    </div>
  )
}

export default ErrorBox
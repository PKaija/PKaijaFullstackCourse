import React from 'react'

const SuccessBox = ({ successMessage }) => {
  return (
    <div style={{ color:'green', borderStyle:'solid', padding: 10, backgroundColor:'lightgrey' }}>
      {successMessage}
    </div>
  )
}

export default SuccessBox
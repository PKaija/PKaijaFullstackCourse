import React from 'react'
import store from '../store'

const Notification = (props) => {
    const notificationReducer = store.getState().notification
    const message = notificationReducer.message
    if(message === ''){
        return null
    }
    
    const type = notificationReducer.type
    return(
        <div style={{ color: type === 'success' ? 'green' : 'red', borderStyle:'solid', padding: 10, backgroundColor:'lightgrey' }}>
            {message}
        </div>
    )
}


export default Notification
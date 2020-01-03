import React from 'react'
import {connect} from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { empty, createNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {

    
      const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
        props.createNotification(`Created anecdote "${content}"`, 5)
      }


    return (
        <div onSubmit={addAnecdote}>
            <h2>create new</h2>
            <form>
                <div><input name='anecdote'/></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    empty,
    createNotification,
    createAnecdote
}

const ConnectedAnecdoteForm = connect(
    null,
    mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm
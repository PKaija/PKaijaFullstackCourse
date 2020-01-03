import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { empty, createNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {



    const vote = (id) => {
        const voted = props.anecdotesToShow.find(anecdote => anecdote.id === id)
        props.voteAnecdote(voted)
        props.createNotification(`Voted for "${voted.content}"`, 5)
      }

    return (
        <div>
            {props.anecdotesToShow.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes} votes 
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
    return anecdotes.filter(anecdote => anecdote.content.includes(filter)).sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
    return {
        anecdotesToShow: anecdotesToShow(state),
        filter: state.filter,
    }
}

const mapDispatchToProps =  {
    voteAnecdote,
    empty,
    createNotification
}

const ConnectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList

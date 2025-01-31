import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import anecdoteService from './services/anecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initAnecdotes } from './reducers/anecdoteReducer'

const App = (props) => {

  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => props.initAnecdotes(anecdotes))
  })

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
	    <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default connect(null, { initAnecdotes })(App)

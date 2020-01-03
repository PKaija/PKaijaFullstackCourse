
import anecdoteService from '../services/anecdotes'



export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = (obj) => {
  return async dispatch => {
    const newObj = {...obj, votes: obj.votes + 1}
    const response = await anecdoteService.voteAnecdote(newObj)
    dispatch({
      type: 'VOTE',
      data: response
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}


const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type){

    case 'VOTE': {
      const id = action.data.id
      const changedAnecdote = action.data
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
    }
    case 'NEW_ANECDOTE': {
      const newAnecdote = action.data
      return [...state, newAnecdote]
    }
    case 'INIT_ANECDOTES': {
      return action.data
    }
    default: return state
  }
}

export default reducer

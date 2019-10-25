import React, {useState} from 'react';
import ReactDOM from 'react-dom';

function initArray(length, value) {
  let arr=[], i=0
  for(;i < length; i++){
    arr[i] = value;
  }
  return arr;
}


const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const Anecdote = ({anecdote, votes, selected}) => {
  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdote}</p>
      <p>Votes: {votes[selected]}</p>
    </>
  )
}


const App = () => {
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(initArray(anecdotes.length, 0))

    const randomizeAnecdote = () => {
      const newAnecdote = Math.floor(Math.random()*anecdotes.length);
      setSelected(newAnecdote);
    }
  
    const vote = () => {
      const copy = [...points]
      copy[selected] += 1
      setPoints(copy)
    }
    const maxPointsIndex = points.indexOf(points.reduce((a, b) => Math.max(a, b)))
    
    return (
      <div>
        <Anecdote anecdote={anecdotes[selected]} votes={points} selected={selected}/>
        <Button handleClick={() => randomizeAnecdote()} text="Random Anecdote"/>
        <Button handleClick={() => { vote()}} text="Vote"/>
        <h1>Anecdote with the most votes</h1>
        <p>{anecdotes[maxPointsIndex]}</p>
        <p>Votes: {points[maxPointsIndex]}</p>
      </div>
    )
  }

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  


  ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
  )
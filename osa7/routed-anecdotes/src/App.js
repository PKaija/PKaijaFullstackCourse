import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Redirect, withRouter } from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <a href='/anecdotes' style={padding}>anecdotes</a>
      <a href='/createnew' style={padding}>create new</a>
      <a href='/about' style={padding}>about</a>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} ><a href={`/anecdotes/${anecdote.id}`}>{anecdote.content}</a></li>)}
    </ul>
  </div>
)

const AnecdoteView = ({anecdote}) => (
  <div>
    <h2>{anecdote.content}</h2>
    <p>Has {anecdote.votes} votes</p>
  </div>
)


const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    props.history.push('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}


const Notification = (props) => {
  return (
    <div>
      <p>{props.message}</p>
    </div>
  )
}



const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])
  const [notification, setNotification] = useState('')



  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    const updatedAnecdotes = anecdotes.concat(anecdote)
    setAnecdotes(updatedAnecdotes)
    console.log(anecdotes)
    displayNotification(`Added anecdote ${anecdote.content}`)
  }

  const displayNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification('')
    }, 10000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const CreateNewWithHistory = withRouter(CreateNew)

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification === '' ? <div></div> : <Notification message={notification}/>}
      <Router>
        <div>
        </div>
        <Route exact path='/' render={ () => <AnecdoteList anecdotes={anecdotes} />}/>
        <Route exact path='/anecdotes' render={ () => <Redirect to='/'/>}/>
        <Route path='/about' render={() => <About />}/>
        <Route path='/createnew' render={() => <CreateNewWithHistory addNew={addNew} />}/>
        <Route exact path='/anecdotes/:id' render={({match}) => <AnecdoteView anecdote={anecdoteById(match.params.id)} />}/>
      </Router>
      <Footer />
    </div>
  )
}

export default App
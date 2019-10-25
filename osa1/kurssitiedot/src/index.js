import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <>
    <h1>{props.course.name}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.exercises}</p>
  )
}

const Content = (props) => {
   return (
    props.course.parts.map(
      n =>
       <p><Part name={n.name} exercises={n.exercises}/></p>
       )
   )
}

const Total = (props) => {
  var n = 0
    props.course.parts.forEach(i => n += i.exercises)
  return (
    <>
    <p>Number of parts {n}</p>
    </>
  )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            name: 'State of a component',
            exercises: 14
          }
        ]
      }

  return (
    <div>
      <Header course={course}/> 
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

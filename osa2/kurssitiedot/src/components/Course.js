import React from 'react'


const Header = ({course}) => {
    return (
      <>
      <h2>{course.name}</h2>
      </>
    )
  }
  
  const Part = ({name, exercises}) => {
    return (
      <p>{name} {exercises}</p>
    )
  }
  
  const Content = ({course}) => {
     return (
      course.parts.map(
        (n, index) =><Part key={index} name={n.name} exercises={n.exercises}/>
         )
     )
  }
  
  
  const Total = ({course}) => {
    let total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
      <>
      <h4>Number of parts {total}</h4>
      </>
    )
  }
  
  const Course = ({course}) => {
      return (
      <>
          <Header course={course}/> 
          <Content course={course}/>
          <Total course={course}/>
      </>
      )
  }

  export default Course
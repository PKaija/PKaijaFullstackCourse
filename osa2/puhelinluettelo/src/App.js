import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const Persons = ({persons, removePerson}) => {
  return (
    <>
    {persons.map((person, index) => <div key={index}>{person.name} {person.number} <button onClick={() => removePerson(person.id)}>Delete</button> </div>)}
    </>
  )
}


const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <>
    <form onSubmit={addPerson}>
        <div> name: <input value={newName} onChange={handleNameChange}/>  </div>
        <div> number: <input value={newNumber} onChange={handleNumberChange}/>  </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

const Filter = ({filterName, handleFilterNameChange}) => {
  return (
    <>
    Filter shown with name: <input value={filterName} onChange={handleFilterNameChange}/>
    </>
  )
}

const Notification = ({messageObject}) => {
  if(messageObject.message===null){
  return null
  }else{
    return (
      <div className={messageObject.type}>
        {messageObject.message}
      </div>
    )
  }
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [errorMessage, setErrorMessage] = useState({message: null, type: 'error'})




  useEffect(() => {
    personService.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const changeMessage = (message=null, type='error') => {
    const newMessage = {
      message: message,
      type: type
    }
    setErrorMessage(newMessage)
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value)
  }
  const checkExistingName = () => {
    return persons.some(person => person.name === newName)
  }
  const checkExistingNumber = () => {
    return persons.some(person => person.number === newNumber)
  }


  const addPerson = event => {
    event.preventDefault()
    
    if(checkExistingNumber(newNumber)){
      changeMessage(`There already is a person with the number ${newNumber}`, 'error')
      setTimeout(() => changeMessage(), 5000)
      return
    }

    if(checkExistingName(newName)){
      if(window.confirm(`${newName} already exists! Replace the old number with a new one?`)){
        const person = persons.find(person => person.name === newName)
        const newPerson = {...person, number: newNumber}
        
        personService
        .updatePerson(newPerson, person.id)
        .then(response => {
          setPersons(persons.map(n => person.id !== n.id ? n: response.data))
          changeMessage(`Changed number of ${newName}`, 'success')
          setTimeout(() => changeMessage(), 5000)
        })
        .catch(error => {
          changeMessage(`Failed to update person: ${JSON.stringify(error.response.data.error)}`, 'error')
          setTimeout(() => changeMessage(), 5000)
        })
        setNewName('')
        setNewNumber('')
        return
      }
      return
    }
    
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    personService
    .savePerson(newPerson)
    .then(response => {
      setPersons(persons.concat(response.data))
    })
    .catch(error => {
      changeMessage(`Failed to add person: ${JSON.stringify(error.response.data.error)}`, 'error')
      setTimeout(() => changeMessage(), 5000)
      setNewName('')
      setNewNumber('')
      return
    })
    changeMessage(`Added ${newName}`, 'success')
    setTimeout(() => changeMessage(), 5000)


    setNewName('')
    setNewNumber('')
  }



  const removePerson = id => {
    const removedPerson = persons.find(person => person.id === id).name
    if(window.confirm(`Deleting id:${id}, are you sure?`)){
      personService
      .deletePerson(id)
      .catch(error => {
        changeMessage(`Failed to remove person: ${JSON.stringify(error.response.data.error)}`, 'error')
        setTimeout(() => changeMessage(), 5000)
        return
      })
      setPersons(persons.filter(person => person.id !== id))
      changeMessage(`Removed ${removedPerson}`, 'success')
      setTimeout(()=>changeMessage(), 5000)
      return
    }else{
      return
    }
  }


  const personsToShow = persons.filter(person => person.name.includes(filterName))


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification messageObject={errorMessage}/>
      <Filter filterName={filterName} handleFilterNameChange={handleFilterNameChange}/>
      <h2>Add a new person</h2>
      <PersonForm
      addPerson={addPerson}
      newName={newName}
      newNumber={newNumber}
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} removePerson={removePerson}/>
    </div>
  )
}

export default App
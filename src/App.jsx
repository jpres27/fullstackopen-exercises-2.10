import { useState, useEffect } from 'react'
import axios from 'axios'
import heroesService from './services/heroes'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState(' ')
  const [newSword, setNewSword] = useState(' ')

  useEffect(() => {
    heroesService.getAll().then(initialHeroes => { setPersons(initialHeroes) })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(e => e.name === newPerson && e.sword === newSword)) {
      alert('There already exists an entry for' + newPerson)
    }
    else if (persons.some(e => e.name === newPerson)) {
      const personObject = {
        name: newPerson,
        sword: newSword,
      }
      const heroToUpdate = persons.find(e => e.name === newPerson)
      heroesService.update(heroToUpdate.id, personObject).then(returnedHero => { 
        setPersons(persons.map(person => person.id !== heroToUpdate.id ? person : returnedHero)) 
      })
    }
    else {
    const personObject = {
      name: newPerson,
      sword: newSword,
    }
    heroesService.create(personObject).then(returnedHero => { setPersons(persons.concat(returnedHero)) })
    setNewPerson(' ')
    }
  }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewPerson(event.target.value)
  }

  const handleSwordChange = (event) => {
    console.log(event.target.value)
    setNewSword(event.target.value)
  }

  return (
    <div>
      <h2>Hall of Heroes</h2>

      <form onSubmit={addPerson}>
        <div>
          name: <input value={newPerson} onChange={handlePersonChange}/>
        </div>
        <div>
          sword: <input value={newSword} onChange={handleSwordChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Warriors</h2>
      <ul>
      {persons.map(person => <li key={person.id}>{person.name} who wields {person.sword}</li>)}
      </ul>
    </div>
  )
}

export default App
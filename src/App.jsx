import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
    name: 'Ragnar',
    sword: 'Tyrfing',
    id: 1,   
    }
  ]) 
  const [newPerson, setNewPerson] = useState(' ')
  const [newSword, setNewSword] = useState(' ')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(e => e.name === newPerson)) {
      alert('There already exists an entry for' + newPerson)
    }
    else {
    const personObject = {
      name: newPerson,
      sword: newSword,
      id: persons.length + 1,
    }
    setPersons(persons.concat(personObject))
    console.log(persons)
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
import { useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchUsers = async () => {
    try {

    } catch(err) {

    } finally {

    }
  }

  return (
    <div style={{padding: '20px', fontFamily: 'Arial, sans-serif'}}>
      <h1>User List</h1>
      {loading && <p>Loading data...</p>}
      {error && <p style={{color: 'red'}}>Error: {error}</p>}


    </div>
  )
}

export default App

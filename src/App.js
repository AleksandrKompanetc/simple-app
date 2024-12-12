import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!response.ok) {
        throw new Error('Loading data error!')
      }
      const data = await response.json()
      setUsers(data)
    } catch(err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div style={{padding: '20px', fontFamily: 'Arial, sans-serif'}}>
      <h1>User List</h1>
      {loading && <p>Loading data...</p>}
      {error && <p style={{color: 'red'}}>Error: {error}</p>}
      {!loading && !error && (
        <ul style={{listStyle: 'none', padding: 0}}>
          {users.map((user) => (
            <li key={user.id} style={{
              padding: '10px',
              margin: '10px 0',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}>
              <strong>{user.name}</strong> <br />
              <em>Email:</em>{user.email} <br />
              <em>Phone:</em>{user.phone}
            </li>
          ))}
        </ul>
      )}

    </div>
  )
}

export default App

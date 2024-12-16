import React, {useEffect, useMemo, useState} from 'react'
import axios from 'axios'
import './App.css'

const App = () => {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [sortOrder, setSortOrder] = useState('asc')
  const [newUser, setNewUser] = useState({name: '', email: ''})

  useEffect(() => {
    const fetchUsers = async() => {
      try {
        const savedUsers = JSON.parse(localStorage.getItem('users'))
        if (savedUsers) {
          setUsers(savedUsers)
        } else {
          const response = await axios.get('https://jsonplaceholder.typicode.com/users')
          setUsers(response.data)
        }
      } catch(error) {
        console.log('Error fetching users', error)
      }
    }

    fetchUsers()
  }, [])

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users))
  }, [users])

  const addUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, {id: Date.now(), ...newUser}])
      setNewUser({name: '', email: ''})
    }
  }

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) =>
    sortOrder === 'asc'
    ? a.name.localeCompare(b.name)
    : b.name.localeCompare(a.name)
    )
  }, [users, sortOrder])

  const filteredUsers = useMemo(() => {
    return sortedUsers.filter((user) => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [sortedUsers, searchTerm])

  return (
    <div style={{
      backgroundColor: darkMode ? '#333' : '#fff',
      color: darkMode ? '#fff' : '#000',
      minHeight: '100vh',
      padding: '20px',
    }}>

      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? 'Light' : 'Dark'}
      </button>

      <h1>User List</h1>

      <input 
        type="text"
        placeholder='Search new users...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div style={{marginTop: '10px'}}>
        <input 
          type="text"
          placeholder='Name'
          value={newUser.name}
          onChange={(e) => setNewUser({...newUser, name: e.target.value})} 
        />

        <input 
          type="email"
          placeholder='Email'
          value={newUser.email}
          onChange={(e) => setNewUser({...newUser, email: e.target.value})} 
        />

        <button onClick={addUser}>Add User</button>
      </div>

      <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
        Sort {sortOrder === 'asc' ? 'descending' : 'ascending'}
      </button>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filteredUsers.map((user) => (
          <li key={user.id} 
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #ccc',
                padding: '10px 0'
              }}
            >
            <span>{user.name}</span>
            <button onClick={() => setSelectedUser(user)}>Info</button>
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div style={{marginTop: '20px', padding: '10px', border: '1px solid #ccc'}}>
          <h2>User Details</h2>
          <p>
            <strong>Name:</strong> {selectedUser.name}
          </p>
          <p>
            <strong>Email:</strong> {selectedUser.email}
          </p>
          {selectedUser.company && (
            <p>
              <strong>Company:</strong> {selectedUser.company.name}
            </p>
          )}
          {selectedUser.address && (
            <p>
              <strong>Address:</strong> {selectedUser.address.city}, {selectedUser.address.street}
            </p>
          )}
          <button onClick={() => setSelectedUser(null)}>Close</button>
        </div>
      )
      }
    </div>
  )
}

export default App;






// import { useEffect, useState } from 'react'
// import './App.css'

// function App() {
//   const [users, setUsers] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [searchTerm, setSearchTerm] = useState('')

//   const fetchUsers = async () => {
//     try {
//       const response = await fetch('https://jsonplaceholder.typicode.com/users')
//       if (!response.ok) {
//         throw new Error('Loading data error!')
//       }
//       const data = await response.json()
//       setUsers(data)
//     } catch(err) {
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchUsers()
//   }, [])

//   const filteredUsers = users.filter((user) =>
//     user.name.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   return (
//     <div style={{padding: '20px', fontFamily: 'Arial, sans-serif'}}>

//       <h1>User List</h1>
//       {loading && <p>Loading data...</p>}
//       {error && <p style={{color: 'red'}}>Error: {error}</p>}
//       {!loading && !error && (
//         <ul style={{listStyle: 'none', padding: 0}}>
//           {users.map((user) => (
//             <li key={user.id} style={{
//               padding: '10px',
//               margin: '10px 0',
//               border: '1px solid #ccc',
//               borderRadius: '5px',
//             }}>
//               <strong>{user.name}</strong> <br />
//               <em>Email:</em>{user.email} <br />
//               <em>Phone:</em>{user.phone}
//             </li>
//           ))}
//         </ul>
//       )}

//     </div>
//   )
// }

// export default App

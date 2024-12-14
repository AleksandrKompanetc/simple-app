import React from 'react'
import './App.css'

const App = () => {
  return (
    <div style={{
      backgroundColor: '#fff',
      color: '#000',
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

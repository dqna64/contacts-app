import { useEffect, useState } from 'react'
import UserCard from './UserCard'
import logo from './logo.svg'

const DATA_URL = 'https://jsonplaceholder.typicode.com/users'
const DATA_ERROR_MSG = "Sorry, data could not be loaded at this time."

function App() {
  const [count, setCount] = useState(0)

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch and load users on initial render.
  useEffect(() => {
    const fetchAndLoadData = async () => {
      try {
        const response = await fetch(DATA_URL)
        const data = await response.json()
        setUsers(data)
        console.log(data);
      } catch (err) {
        setError(err)
      }
      setLoading(false)
    }
    fetchAndLoadData()
  }, []);

  return (
    <div className='px-2 py-4 lg:px-12 lg:py-6'>
      <div className='border max-w-screen-sm mx-auto space-y-5 lg:space-y-8'>
        {loading ? 'Loading...' : error ? DATA_ERROR_MSG : users.map((user) => <UserCard key={user.id} data={user}/>)}
      </div>
    </div>
  )
}

export default App

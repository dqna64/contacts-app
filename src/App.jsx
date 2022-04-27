import { useEffect, useState } from 'react'
import UserCard from './UserCard'
import logo from './logo.svg'
import { Spinner } from '@chakra-ui/react'

const DATA_URL = 'https://jsonplaceholder.typicode.com/users'
const DATA_ERROR_MSG = 'Sorry, data could not be loaded at this time.'

function App() {
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
        console.log(data)
      } catch (err) {
        setError(err)
      }
      setLoading(false)
    }
    fetchAndLoadData()
  }, [])

  return (
    <div className="px-2 py-3 lg:px-12 lg:py-5">
      <div className="text-4xl lg:text-5xl font-bold text-gray-900 my-4 flex justify-center">
        {'My Contacts'}
      </div>
      <div className="max-w-screen-lg mx-auto flex justify-center items-start sm:space-x-5 lg:space-x-8">
        <div className="hidden sm:block px-2 lg:px-5 py-3 lg:py-5 grow-0 shrink-0 basis-[180px] lg:basis-[280px] border border-gray-400 bg-slate-100 space-y-2 lg:space-y-3">
          <div className='text-lg lg:text-2xl border-b border-gray-300'>{'Contacts List'}</div>
          {loading ? (
            <Spinner />
          ) : error ? (
            <></>
          ) : (
            users.map((user) => (
              <div className="font-semibold text-sm lg:text-xl p-[1px] lg:p-[2px]">{user.name}</div>
            ))
          )}
        </div>
        <div className={`${loading ? "w-full" : ""} grow-1 space-y-5 lg:space-y-8`}>
          {loading ? (
            <>
              <UserCard template />
              <UserCard template />
              <UserCard template />
            </>
          ) : error ? (
            DATA_ERROR_MSG
          ) : (
            users.map((user) => <UserCard key={user.id} data={user} />)
          )}
        </div>
      </div>
    </div>
  )
}

export default App

import { createRef, forwardRef, useEffect, useRef, useState } from 'react'
import UserCard from './UserCard'
import { Spinner } from '@chakra-ui/react'
import hoverVertStyle from './hoverEffectVert.module.css'

const DATA_URL = 'https://jsonplaceholder.typicode.com/users'
const DATA_ERROR_MSG = 'Sorry, data could not be loaded at this time.'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const userRefs = useRef([])

  // Fetch and load users on initial render.
  useEffect(() => {
    const fetchAndLoadData = async () => {
      try {
        const response = await fetch(DATA_URL)
        let data = await response.json()
        userRefs.current = data.map((user, idx) => userRefs.current[idx] ?? createRef())
        setUsers(data)
        console.log(data)
        console.log(userRefs);
      } catch (err) {
        setError(err)
      }
      setLoading(false)
    }
    fetchAndLoadData()
  }, [])

  useEffect(() => {}, [userRefs.current])

  const scrollToCard = (cardRef) =>{ console.log(cardRef); cardRef.current.scrollIntoView({ behavior: 'smooth' })}

  return (
    <div className="px-2 py-3 lg:px-12 lg:py-5">
      <div className="text-4xl lg:text-5xl font-bold text-gray-900 my-4 flex justify-center">
        {'My Contacts'}
      </div>
      <div className="max-w-screen-lg mx-auto flex justify-center items-start sm:space-x-5 lg:space-x-8">
        <div className="hidden sm:block sticky top-4 max-h-screen overflow-x-hidden px-2 lg:px-5 py-3 lg:py-5 grow-0 shrink-0 basis-[180px] lg:basis-[280px] border border-gray-400 bg-slate-100 space-y-1 lg:space-y-2">
          <div className='text-lg lg:text-2xl border-b border-gray-300'>{'Contacts List'}</div>
          {loading ? (
            <Spinner />
          ) : error ? (
            <></>
          ) : (
            users.map((user, idx) => (
              <span className={hoverVertStyle.highlightVert} onClick={() => scrollToCard(userRefs.current[idx])}><span className="font-semibold text-sm lg:text-xl">{user.name}</span></span>
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
            users.map((user,idx) => <UserCard key={user.id} reff={userRefs.current[idx]} data={user} />)
          )}
        </div>
      </div>
    </div>
  )
}

export default App

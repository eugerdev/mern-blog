import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useUserStore } from '../UserContext'

export default function Header() {
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/profile', {
          credentials: 'include',
        })
        const userData = await response.json()
        setUser(userData)
        console.log(userData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const logoutHandler = async () => {
    await fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    })
    setUser(null)
  }

  const LogOut = () => (
    <div className='dropdown dropdown-end'>
      <label tabIndex={0}>
        <div className='h-5 w-5 bg-primary rounded-full flex items-center justify-center p-4'>
          <p className='font-semibold text-white'>D</p>
        </div>
      </label>
      <ul
        tabIndex={0}
        className='dropdown-content menu p-2 shadow-2xl bg-primary/75 text-white rounded-box w-52'
      >
        <li>
          <a>{user.username}</a>
        </li>
        <li>
          <a onClick={logoutHandler}>Log Out</a>
        </li>
      </ul>
    </div>
  )

  return (
    <header className='flex justify-between mb-20'>
      <Link to='/' className='font-black text-lg'>
        <span className='text-primary'>dev.</span>log
      </Link>
      <nav className='flex gap-4'>
        {user ? (
          <div className='flex items-center gap-5'>
            <Link to='/login'>Create Post</Link>
            <LogOut />
          </div>
        ) : (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}

import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className='flex justify-between mb-20'>
      <Link to='/' className='font-black text-lg'>
        <span className='text-primary'>dev.</span>log
      </Link>
      <nav className='flex gap-4'>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
      </nav>
    </header>
  )
}

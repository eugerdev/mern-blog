import Header from './Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Layout({ children }) {
  return (
    <main className='p-3 max-w-lg mx-auto'>
      <Header />
      <ToastContainer position='top-center' />
      {children}
    </main>
  )
}

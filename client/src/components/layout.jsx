import Header from './Header'

export default function Layout({ children }) {
  return (
    <main className='p-3 max-w-lg mx-auto'>
      <Header />
      {children}
    </main>
  )
}

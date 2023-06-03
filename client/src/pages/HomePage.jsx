import Post from '../components/Post'

export default function HomePage() {
  return (
    <section className='flex flex-col gap-5'>
      <Post />
      <Post />
    </section>
  )
}

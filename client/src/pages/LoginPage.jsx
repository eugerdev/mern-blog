import { useForm } from 'react-hook-form'
import InputAlert from '../components/InputAlert'

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => console.log(data)

  console.log(watch('username'))

  return (
    <section className='flex flex-col gap-20'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
        <input
          className={`${errors.username && 'border-red-500'}`}
          placeholder='Username'
          {...register('username', { required: true })}
        />
        {errors.username && (
          <InputAlert
            color='red'
            text='This field is required'
            desc='Make sure you fill out all required fields.'
          />
        )}

        <input
          className={`${errors.password && 'border-red-500'}`}
          placeholder='Password'
          {...register('password', { required: true })}
        />
        {errors.password && (
          <InputAlert
            color='red'
            text='This field is required'
            desc='Make sure you fill out all required fields.'
          />
        )}

        <button className='bg-primary text-white' type='submit'>
          Login
        </button>
      </form>
    </section>
  )
}

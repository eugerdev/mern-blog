import { useForm } from 'react-hook-form'
import InputAlert from '../components/InputAlert'
import { useState } from 'react'
import eye from '../assets/eye.svg'
import eyeSlash from '../assets/eye-slash.svg'
import { toast } from 'react-toastify'
export default function LoginPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onSubmit = async (data) => {
    const res = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })

    // if (res.status === 200) {
    //   toast.success('Login successful!')
    // } else if (res.status === 400) {
    //   toast.error('Error occured!')
    // } else {
    //   toast.error('Login failed!')
    // }
    console.log(res)
  }

  const [showPassword, setShowPassword] = useState(false)

  return (
    <section className='flex flex-col gap-20'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
        <input
          className={`${errors.email && 'border-red-500'}`}
          placeholder='Email'
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please enter a valid email address',
            },
          })}
        />
        {errors.email && <InputAlert color='red' text={errors.email.message} />}

        <div className='relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            className={`${errors.password && 'border-red-500'} w-full`}
            placeholder='Password'
            {...register('password', {
              required: 'This field is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long',
              },
              maxLength: {
                value: 20,
                message: 'Password must not exceed 20 characters',
              },
            })}
          />
          {watch('password') && (
            <img
              onClick={() => setShowPassword((prev) => !prev)}
              className='absolute h-6 w-6 right-3 top-3'
              src={showPassword ? eyeSlash : eye}
              alt=''
            />
          )}
          {errors.password && (
            <InputAlert color='red' text={errors.password.message} />
          )}
        </div>

        <button className='bg-primary text-white mt-10' type='submit'>
          Login
        </button>
      </form>
    </section>
  )
}

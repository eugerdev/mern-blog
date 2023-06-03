import React from 'react'

export default function InputAlert({ color, text }) {
  const error = color === 'red' ? 'text-red-500 ' : 'text-yellow-500'
  return (
    <div className={error + 'px-2'} role='alert'>
      <div className='flex'>
        <div className='py-1'></div>
        <div>
          <p className='font-semibold'>{text}</p>
        </div>
      </div>
    </div>
  )
}

import React from 'react'

export default function InputAlert({ color, text, desc }) {
  const error = color === 'red' ? 'text-red-500 ' : 'text-yellow-500'
  return (
    <div className={error + 'px-2'} role='alert'>
      <div className='flex'>
        <div className='py-1'></div>
        <div>
          <p className='font-bold'>{text}</p>
          <p className='text-sm'>{desc}</p>
        </div>
      </div>
    </div>
  )
}

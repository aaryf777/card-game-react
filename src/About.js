import React from 'react'
const arrow = '/images/icons/backNav.svg'

export default function About () {
  return (
    <div className='w-full'>
      <div className='flex gap-2 p-2 items-center'>
        <img onClick={() => window.history.back()} className='w-4 h-4 rotate-180 cursor-pointer' src={arrow} />
        <p className='text-base font-semibold'>About Us</p>
      </div>
      <div className='w-full p-2'>
        <h1 className='text-xl'>Make Online Gaming an Occupation</h1>
        <p className='py-2 text-sm text-gray-2'>
          "We are continually serve our growing community of sports lovers with the latest innovative
          offering and contribute to the overall expansionof the Indian sports and ecosystem" - <span className='font-bold'>Aaryf Khan, CEO & Founder, Trumps Cards Game</span> 
        </p>
      </div>
    </div>
  )
}

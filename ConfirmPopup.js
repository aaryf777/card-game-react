import React from 'react'

export default function ConfirmPopup({setShow, bet, startGame}) {
  return (
    <div className='w-full h-full flex items-center justify-center' style={{ backdropFilter: 'blur(4px)' }}>
        <div className='bg-gray rounded-md  w-2/3 flex flex-col p-4 gap-8'>
            <h1>Add &#x20B9; {bet} to join the contest</h1>
            <div className='w-full text-white mt-2 flex justify-center gap-4'>
                <button className='w-24 p-2 text-sm font-semibold rounded-md bg-transparent border' onClick={() => setShow(false)}>Cancel</button>
                <button className='w-24 p-2 text-sm font-semibold rounded-md bg-green border border-green' onClick={startGame}>Cancel</button>
            </div>
        </div>
    </div>
  )
}

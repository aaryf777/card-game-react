import React from 'react'
const arrow = '/images/icons/backNav.svg'

export default function ResponsiblePlay() {
    return (
        <div className='w-full'>
            <div className='flex gap-2 p-2 items-center'>
                <img onClick={() => window.history.back()} className='w-4 h-4 rotate-180 cursor-pointer' src={arrow} />
                <p className='text-base font-semibold'>Responsible Play</p>
            </div>
            <div className='w-full p-3'>
                <h1 className='text-xl  font-semibold'>Play with responsiblity</h1>
            </div>
            <p className='w-full px-2 text-sm text-gray-2'>
                At <b>Trumps Card Game</b> we're always looking out for all our users.
                Our Responsible Play policy is at the heart of our efforts to maintain a
                healthy, rewarding and productive gaming experience for you.
            </p>
            <h1 className='p-2 mt-4 text-sm font-semibold'>Here's what our Responsible Play policy covers</h1>
            <div className='w-full flex flex-col gap-3 p-2'>
                <h1 className='text-base font-bold'>1. Ensuring safety and security</h1>
                <p className='text-xs text-gray-2'>
                    <b className='text-white'>Transaction limit: </b> We're commited to your financial security, that is why there's a maximum
                    cap of &#x20B9; 10000 that you can to you Trumps Card Game account in a single transaction
                </p>
            </div>
            <div className='w-full flex flex-col gap-3 p-2'>
                <h1 className='text-base font-bold'>2. Managing your time</h1>
                <p className='text-xs text-gray-2'>
                    <b className='text-white'>Timeouts: </b> Even champions need a break sometimes.
                    You can choose notifications for time to time alert so that you do not spend most of your time in playing.
                    Also you can turn it off in case you feel you don't need alerts anymore.
                </p>
            </div>
            <p className='py-4 text-gray-2 text-sm'>
                This game may be habit-forming or financially risky. Please pay responsibly
            </p>
        </div>
    )
}

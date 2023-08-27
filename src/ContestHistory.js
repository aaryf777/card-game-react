import { format } from 'date-fns'
import React, { useState } from 'react'
const trophy = '/images/icons/trophy2.svg';
const arrow = '/images/icons/backNav.svg'
const avtaar = '/images/icons/avtaar.svg'

export default function ContestHistory({ contests, setViewAll, ind, setInd }) {
  
  return (
    <div className='w-full overflow-y-auto'>
      <div className='flex gap-3 p-3 items-center'>
        <div className='bg-slate-800 p-2 rounded-md'>
          <img onClick={() => setViewAll(false)} className='w-4 h-4 rotate-180 cursor-pointer' src={arrow} />
        </div>

        <h1 className=' text-yellow text-base text-semibold'>
          Contest History
        </h1>
      </div>

      <div className='px-3 flex flex-col gap-2'>
        {
          contests?.map((contest, i) => (
            <>

              <div onClick={() => {ind === i ? setInd('') : setInd(i)} } className='bg-slate-800 rounded-md cursor-pointer' >
                <div className='border-b text-slate-400 text-xs font-semibold border-gray p-2  flex justify-between'>
                  <div className='w-full flex justify-between'>
                    <span className="text-yellow font-semibold text-xs">{'HEAD TO HEAD'}</span>
                    <span className='text-gray-2 text-xs'>{format(contest.created_at, 'dd MMM, yyyy')}</span>
                  </div>
                </div>
                <div className='flex justify-center text-sm font-semibold text-white mt-1 uppercase'>{contest.contestName}</div>
                <div className='flex justify-center items-center gap-2 p-2'>
                  <img src={trophy} className='w-5 h-5' />
                  <span className='text-yellow text-base font-bold '><span> &#x20B9;</span>{contest.winningamount}</span>
                </div>
                <div className=' text-gray-2 rounded-b-md bg-slate-700 px-2 py-2 flex justify-between'>
                  <div className='flex gap-1 items-center'>
                    {/* <img src={coin} className='w-4 h-4' /> */}
                    <span className='text-xs text-white'>Entry:</span>
                    <span className='text-white text-xs font-bold mr-2'> &#x20B9; {contest.betamount}</span>
                  </div>
                  <div className='flex gap-1 items-center cursor-pointer'>
                    {ind === i ? <img className='w-4 h-3 -rotate-90 cursor-pointer' src={arrow} /> : <img className='w-4 h-3 rotate-90 cursor-pointer' src={arrow} />}
                    <p className='text-white text-xs'>View Details</p>
                  </div>
                </div>
              </div>
              {
                ind === i && <div className='w-full flex flex-col gap-2 mt-1'>
                  <div className='w-full flex border-b pb-1'>
                    <div className='w-2/4'></div>
                    <div className='w-1/4 text-center text-xs text-gray-2'>Rank</div>
                    <div className='w-1/4 text-center  text-xs text-gray-2'>Status</div>
                  </div>
                  <div className='w-full flex items-center'>
                    <div className='w-2/4 flex gap-2 items-center'>
                      <img className='w-10 h-10 rounded-full' src={avtaar} />
                      <p className='text-sm '>aaryf_khan</p>
                    </div>
                    <div className='w-1/4 text-center text-xs text-gray-2'>1</div>
                    <div className='w-1/4 text-center  text-xs text-green '>WON</div>
                  </div>
                  <div className='w-full flex items-center'>
                    <div className='w-2/4 flex gap-2 items-center'>
                      <img className='w-10 h-10 rounded-full' src={avtaar} />
                      <p className='text-sm '>__aaryf__</p>
                    </div>
                    <div className='w-1/4 text-center text-xs text-gray-2'>2</div>
                    <div className='w-1/4 text-center text-xs text-red'>LOST</div>
                  </div>
                </div>
              }
            </>
          ))
        }
      </div>
    </div>
  )
}

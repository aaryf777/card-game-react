import React from 'react'
const arrow = '/images/icons/backNav.svg'

export default function Howtoplay() {
  return (
    <div className='w-full p-2'>
      <div className='flex gap-2  items-center'>
        <img onClick={() => window.history.back()} className='w-4 h-4 rotate-180 cursor-pointer' src={arrow} />
        <p className='text-base font-semibold'>How To Play</p>
      </div>
      {/* <h1 className='w-full mt-2 text-center text-base text-yellow'>
        Game Rules
      </h1> */}
      <ul className='w-full flex flex-col gap-2 p-1 mt-4'>
        <li className='flex items-center gap-4 border-b pb-4 border-slate-700'>
          <div className='min-w-[8px] h-2 min-min-w-[8px] rounded-full bg-yellow'></div>
          <p className='text-sm pr-2'>
            Two player will join a contest with 20 cards each.
          </p>
        </li>
        <li className='flex items-center gap-4 border-b pb-4 border-slate-700'>
          <div className='min-w-[8px] h-2 min-min-w-[8px] rounded-full bg-yellow'></div>
          <p className='text-sm pr-2'>
            Both player will not be able to see each others cards.
          </p>
        </li>
        <li className='flex items-center gap-4 border-b pb-4 border-slate-700'>
          <div className=' h-2 min-w-[8px] rounded-full bg-yellow'></div>
          <p className='text-sm pr-2'>
            In every round, Player has to select a stat and opponent has to select the same stat.
          </p>
        </li>
        <li className='flex items-center gap-4 border-b pb-4 border-slate-700'>
          <div className='min-w-[8px] h-2 rounded-full bg-yellow'></div>
          <p className='text-sm pr-2'>
            When both players selected the stat, then the player with greater stat value will won the card and opponent will lost the card.
          </p>
        </li>
        <li className='flex items-center gap-4 border-b pb-4 border-slate-700'>
          <div className='min-w-[8px] h-2 rounded-full bg-yellow'></div>
          <p className='text-sm pr-2'>
            Winner of the round will play first and select the stat in next round.
          </p>
        </li>
        <li className='flex items-center gap-4 border-b pb-4 border-slate-700'>
          <div className='min-w-[8px] h-2 rounded-full bg-yellow'></div>
          <p className='text-sm pr-2'>
            Looser of the round will play second and play the selected stat in next round.
          </p>
        </li>
        <li className='flex items-center gap-4 border-b pb-4 border-slate-700'>
          <div className='min-w-[8px] h-2 rounded-full bg-yellow'></div>
          <p className='text-sm pr-2'>
            Player who won all the cards will be the winner.
          </p>
        </li>
        <li className='flex items-center gap-4 border-b pb-4 border-slate-700'>
          <div className='min-w-[8px] h-2 rounded-full bg-yellow'></div>
          <p className='text-sm pr-2'>
            Player who lost all the cards will be the looser.
          </p>
        </li>
        <li className='flex items-center gap-4 border-b pb-4 border-slate-700'>
          <div className='min-w-[8px] h-2 rounded-full bg-yellow'></div>
          <p className='text-sm pr-2'>
            You will be given 5 lifeline.
          </p>
        </li>
        <li className='flex items-center gap-4 border-b pb-4 border-slate-700'>
          <div className='min-w-[8px] h-2 rounded-full bg-yellow'></div>
          <p className='text-sm pr-2'>
            For every chance there will be a timer of 20 second.
          </p>
        </li>
        <li className='flex items-center gap-4 border-b pb-4 border-slate-700'>
          <div className='min-w-[8px] h-2 rounded-full bg-yellow'></div>
          <p className='text-sm pr-2'>
            If a player is unable to play his chance within the time then a random stat will be selected and one lifeline will get consumed.
          </p>
        </li>
        <li className='flex items-center gap-4 border-b pb-4 border-slate-700'>
          <div className='min-w-[8px] h-2 rounded-full bg-yellow'></div>
          <p className='text-sm pr-2'>
            If a player uses all his 5 lifelines he will get eliminated and the opponent will win the contest.
          </p>
        </li>
      </ul>
    </div>
  )
}

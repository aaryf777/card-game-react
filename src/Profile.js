import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from './services/httpService';
import { format } from "date-fns"
import Spinner from './common/Spinner';
import ContestHistory from './ContestHistory';
import Wallet from './Wallet';
const avtaar = '/images/icons/avtaar.svg'
const arrow = '/images/icons/backNav.svg'
const share = '/images/icons/shareWhite.svg'
const clock = '/images/icons/clock.png'
const trophy = '/images/icons/trophy2.svg';

export default function Profile() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [viewAll, setViewAll] = useState(false)
  const [openWallet, setOpenWallet] = useState(false);
  const [ind, setInd] = useState('')
  useEffect(() => {
    setLoading(true)
    axios.get('/profile', { userID: localStorage.getItem('userID') }).then(res => {
      console.log('profile res - ', res)
      setUser(res.data.data)
      setLoading(false)
    }).catch(err => setError(true))
  }, [])
  const router = useNavigate();
  if (loading || error) return <div className='w-full h-[90vh]'><Spinner/></div>
  if(viewAll) return <ContestHistory contests={user?.contestHistory} setViewAll={setViewAll} ind={ind} setInd={setInd}/>
  return (
    <div className='w-full'>
      <div className='w-full h-40 bg-black shadow-xl flex flex-col justify-between'>
        <div className='flex justify-between p-3'>
          <img onClick={() => router('/')} className='w-5 h-5 rotate-180 cursor-pointer' src={arrow} />
          <img className='w-5 h-5 cursor-pointer' src={share} />
        </div>
        <div className='w-full pb-3 flex gap-3 items-center justify-center'>
          <img className='w-12 h-12 rounded-full border border-white' src={avtaar} />
          <div className='flex flex-col gap-1'>
            <h1 className='text-base text-white font-bold'>{user?.userName}</h1>
            <p className='text-sm text-gray-2 font-semibold'>{user?.email}</p>
          </div>
        </div>
        <div className='p-1 w-full justify-end items-center flex gap-1 '>
          <img className='w-5 h-5 cursor-pointer' src={clock} />
          <p className=' text-xs text-gray-2'>Joined since {format(user?.created_at, "MMM, yyyy")}</p>
        </div>
      </div>
      <div className='p-3 w-full flex justify-between'>
        <h1 className=' text-base font-semibold text-yellow'>
          My Account
        </h1>
        <p className='text-xs border border-yellow p-1 rounded-md text-yellow cursor-pointer hoaver:opacity-50'>VIEW ACCOUNT</p>
      </div>
      <div className='w-full flex flex-col gap-2 items-center justify-center'>
        <div className='flex flex-col items-center gap-1'>
          <p className='text-sm text-gray-2'>Total Balance</p>
          <p className='text-base font-bold text-white'>&#x20B9; {user?.coins}</p>
        </div>
        <button onClick={() => setOpenWallet(true)} className='rounded-md font-semibold text-white bg-green p-2 text-sm cursor-pointer hover:opacity-50 '>ADD CASH</button>
        {openWallet && <Wallet setOpenWallet={setOpenWallet}/>}
      </div>
      <h1 className=' text-base p-3 font-semibold text-yellow'>
        My Stats
      </h1>
      <div className='rounded-xl mx-3 bg-gray shadow-xl p-2'>
        <div className='w-full  flex'>
          <div className='w-1/4 flex flex-col justify-center items-center py-2 gap-2'>
            <p className='text-sm text-gray-2'>Played</p>
            <p className='text-base font-bold text-white'>{user?.contests.played}</p>
          </div>
          <div className='w-1/4 flex flex-col justify-center items-center py-2 border-x gap-2'>
            <p className='text-sm text-gray-2'>Won</p>
            <p className='text-base font-bold text-green'>{user?.contests.won}</p>
          </div>
          <div className='w-1/4 flex flex-col justify-center border-r items-center py-2 gap-2'>
            <p className='text-sm text-gray-2'>Lost</p>
            <p className='text-base font-bold text-red'>{user?.contests.lost}</p>
          </div>
          <div className='w-1/4 flex flex-col justify-center items-center py-2 gap-2'>
            <p className='text-sm text-gray-2'>Win Rate</p>
            <p className='text-base font-bold text-white'>{parseFloat((user?.contests.won/user?.contests.played*100)).toFixed(2)} %</p>
          </div>
        </div>
      </div>
      <h1 className=' text-base p-3 mt-2 font-semibold text-yellow'>
        Recent Performances
      </h1>
      <div className='rounded-xl mx-3 flex justify-evenly bg-gray shadow-xl p-3'>
        {
          user?.contestHistory?.slice(0, 5).map(contest => (
            <div className={`w-8 h-8 rounded-full p-1 text-sm font-bold bg-slate-800 ${contest.users.find(u => u.rank === 1)?.email === user?.email ? 'text-green' : 'text-red'}  flex border justify-center items-center`}>
              <span>{contest.users[0]?.email === user?.email ? 'W' : 'L'}</span>
            </div>
          ))
        }

      </div>
      <div className='p-3 mt-2 w-full flex justify-between'>
        <h1 className=' text-base font-semibold text-yellow'>
          Contest History
        </h1>
        <button onClick={() => setViewAll(true)} className='text-xs border border-yellow p-1 rounded-md text-yellow cursor-pointer hoaver:opacity-50'>VIEW ALL</button>
      </div>
      <div className='w-full flex p-3 overflow-scroll'>
        {
          user?.contestHistory?.slice(0, 5).map((contest,i) => (
            <div onClick={() => {setInd(i);setViewAll(true)}} className='min-w-[300px] bg-slate-800 rounded-md m-1 cursor-pointer' >
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
              <div className=' text-gray-2 rounded-b-md bg-slate-700 px-2 py-2 flex justify-end'>
                <div className='flex gap-1 items-center'>
                  {/* <img src={coin} className='w-4 h-4' /> */}
                  <span className='text-xs text-white'>Entry:</span>
                  <span className='text-white text-xs font-bold mr-2'> &#x20B9; {contest.betamount}</span>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Wallet from './Wallet'
const Profile = '/images/icons/avtaar.svg'
const wallet = '/images/icons/wallet.png'
const rightIcon = '/images/icons/backNav.svg'
const closered = '/images/icons/closered.png'
const avtaar = '/images/icons/avtaar.svg'
export default function Header() {
  const [openMore, setOpenMore] = useState(false);
  const [openWallet, setOpenWallet] = useState(false)
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName')
  const more = [
    {
      title: 'View Profile',
      path: '/profile'
    },
    {
      title: 'Account',
      path: '/account'
    },
    {
      title: 'Setting',
      path: '/setting'
    },
    {
      title: 'How To Play',
      path: '/how-to-play'
    },
    {
      title: 'Responsible Play',
      path: '/responsible-play'
    },
    {
      title: 'About',
      path: '/about'
    },
    {
      title: 'Help & FAQ',
      path: '/help'
    },
    {
      title: 'Sign Out',
      path: '/login'
    },

  ]
  return (
    <>
      <div className='w-full h-12 flex items-center justify-between p-2 bg-yellow'>
        <img className='w-8 h-8' src={Profile} onClick={() => setOpenMore(true)} />
        <span className='text-base text-red font-bold'>Card Game</span>
        <img onClick={() => setOpenWallet(true)} className='w-6 h-6 ' src={wallet} />
      </div>
      {
        openWallet && <Wallet setOpenWallet={setOpenWallet} />
      }

      {openMore && <div style={{ backdropFilter: 'blur(4px)' }} className='absolute top-0 left-0 overflow-hidden w-full h-[100vh] bg-black/80 z-50'>
        <div className='w-full p-2 flex justify-between bg-black border-b mb-4'>
          <Link onClick={() => setOpenMore(false)} to={'/profile'} className='flex w-1/2 gap-3 items-center p-2'>
            <img className='w-12 h-12 rounded-full border border-white' src={avtaar} />
            {userName 
            ? <p className='text-base font-normal text-slate-200'>{userName}</p>
            : <p className='text-xs border border-yellow p-1 rounded-md text-yellow cursor-pointer hoaver:opacity-50'>Sign Up</p>
          }
          </Link>
          <img src={closered} className='w-8 h-8' onClick={() => setOpenMore(false)} />
        </div>

        {more.map(ele => (
          <div to={ele.path} className='w-full' onClick={() => { if (ele.title === 'Sign Out') { localStorage.clear() } setOpenMore(false); navigate(ele.path) }}>
            <div className='flex justify-between border-b-2 border-slate-700 text-sm font-semibold text-white items-center p-3 my-2'>
              <span>{ele.title}</span>
              <img src={rightIcon} className='w-3 h-3' />
            </div>
          </div>
        ))}
      </div>}
    </>
  )
}

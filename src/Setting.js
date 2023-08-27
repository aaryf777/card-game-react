import React, { useEffect, useRef, useState } from 'react'
import axios from './services/httpService';
import Spinner from './common/Spinner';
const arrow = '/images/icons/backNav.svg'
const edit = '/images/icons/draw.png'


export default function Setting() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState();
  const [contact, setContact] = useState()
  const [disable, setDisable] = useState(true)
  const [disableContact, setDisableContact] = useState(true)
  const [typeError, setTypeError] = useState(false)
  const emailref = useRef();
  const contactref = useRef();
  const userID = localStorage.getItem('userID')
  useEffect(() => {
    setLoading(true)
    axios.get('/profile', { userID }).then(res => {
      console.log('setting res - ',res);
      setUser(res.data.data)
      setEmail(res.data.data.email)
      setContact(res.data.data.contact)
      setTypeError(false)
      setLoading(false)
    }).catch(err => setError(true))
  }, [])
  useEffect(() => {
    if (!disable) emailref.current.focus()
    if (!disableContact) contactref.current.focus()
  }, [disable, disableContact])

  const handleEmailChange = e => {
    console.log('email to rtest - ', e.target.value);
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if (!regex.test(e.target.value)) {
      setTypeError(true)
    } else {
      setTypeError(false)
    }
    setEmail(e.target.value)
  }
  const updateUser = () => {
    if(typeError || (contact && contact.toString().length < 10)) return;
    axios.post('/update-profile',{userID,email,contact}).then(res => {
      console.log('updated Profile - ',res);
    })
  }
  if (loading || error) return <div className='w-full h-[90vh]'><Spinner/></div>
  return (
    <div className='w-full'>
      <div className='flex gap-2 p-2 items-center'>
        <img onClick={() => window.history.back()} className='w-4 h-4 rotate-180 cursor-pointer' src={arrow} />
        <p className='text-base font-semibold'>Setting</p>
      </div>
      <h1 className='text-center p-2 text-base text-yellow font-semibold'>My Info</h1>
      <div className='w-full flex flex-col gap-3 p-2 mt-4'>
        <div className='w-full border-b-2 border-slate-500 bg-gray-700 text-sm text-white flex flex-col rounded-t-lg p-2'>
          <p className='text-xs text-gray-2'>Name</p>
          <p className='text-sm'>{user.userName}</p>
        </div>
      </div>
      <div className='w-full p-2'>
        <div className='w-full border-b-2 border-slate-500 bg-gray-700 text-sm text-white flex flex-col rounded-t-lg p-2'>
          <div className='flex justify-between'>
            <div className='w-1/2'>
              <p className='text-xs text-gray-2'>Email</p>
              <input ref={emailref} type='text' placeholder="Enter email" className='w-full text-sm bg-gray-700 border-none outline-none' disabled={disable} value={email} onChange={handleEmailChange} />
            </div>
            <img onClick={() => { setDisable(false) }} className='w-4 h-4 ' src={edit} />
          </div>
        </div>
        {typeError && <p className='w-full text-right text-xs text-red'>Please enter valid email</p>}
      </div>
      <div className='w-full p-2'>
        <div className='w-full border-b-2 border-slate-500 bg-gray-700 text-sm text-white flex flex-col rounded-t-lg p-2'>
          <div className='flex justify-between'>
            <div className='w-1/2'>
              <p className='text-xs text-gray-2'>Contact</p>
              <input ref={contactref} type='number' placeholder="Enter Contact number" className='w-full text-sm bg-gray-700 border-none outline-none' disabled={disableContact} value={contact} onChange={e => {setContact(e.target.value)}} />
            </div>
            <img onClick={() => { setDisableContact(false) }} className='w-4 h-4 ' src={edit} />
          </div>
        </div>
      </div>
      <div className='w-full mt-4 text-center'>
        <button onClick={updateUser} disabled={typeError || (contact && contact.toString().length < 10)}  className={`w-28 rounded-md font-semibold text-white bg-green p-2 text-sm cursor-pointer hover:opacity-50 ${typeError || (contact && contact.toString().length < 10) ? 'opacity-50' : ''} `}>Update</button>
      </div>
    </div>
  )
}

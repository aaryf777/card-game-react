import React, {useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from '../services/httpService';
import AdminotpVerify from './AdminotpVerify';
const mail = '/images/icons/email.png';
const avtar = '/images/icons/avtaar.svg'
const chat = '/images/icons/chat.png'

export default function Adminsignup() {
    const emailRef = useRef();
    const nameRef = useRef();
    const authRef = useRef();
    const [submit, setSubmit] = useState(false)
    const [signupData, setSignupData] = useState({});
    const goNext = async e => {
        let payload = {
          userName: nameRef.current.value,
          email: emailRef.current.value,
          authorizeKey: authRef.current.value
        }
        setSignupData(payload);
        try {
          const response = await axios.post('/admin/signup', 
          payload
        )
        const data = await response.data;
        // localStorage.setItem('token',data.token);
        // localStorage.setItem('userName',data.userName);
        setSubmit(true);
        console.log('final datta - ',data.data)
        } catch (error) {
          console.log('errrrr - ', error);
        }
        
    }
    
  return (
    submit ? <AdminotpVerify loginData={signupData}/>
    : <div className='w-full h-[80vh] flex flex-row justify-center items-center'>
      <div className='h-80 w-full bg-gray rounded-md m-3 md:w-1/3 lg:w-1/3 flex flex-col items-center gap-8'>
        <div className='text-base font-semibold text-white text-center my-3'>Admin Signup Portal</div>
        <div className='flex flex-col items-center gap-2 w-full'>
          <div className='py-1 flex gap-1 items-center border-b-2 border-b-gray-2 w-10/12'>
            <img className='w-8 h-8' src={avtar} />
            <input ref={nameRef}  className='  bg-transparent  outline-none ' type='text' placeholder='Enter username'/>
          </div>
          <div className='py-1 flex gap-1 items-center border-b-2 border-b-gray-2 w-10/12'>
            <img className='w-8 h-8' src={mail} />
            <input ref={emailRef} className='  bg-transparent  outline-none ' type='text' placeholder='Enter your email'/>
          </div>
          <div className='py-1 flex gap-1 items-center border-b-2 border-b-gray-2 w-10/12'>
            <img className='w-8 h-8' src={chat} />
            <input ref={authRef} className='  bg-transparent  outline-none ' type='text' placeholder='Enter Authorize Key'/>
          </div>
          <button onClick={goNext} className={`p-2 w-36 rounded-md border-2 border-green bg-transparent text-green my-4 cursor-pointer`}>Signup</button>
        </div>
        <div className='flex flex-col gap-2 text-center'>
          <span className='text-gray-2 text-sm'>Or</span>
          <div className='flex text-gray-2 text-sm'>Have an Account ? <Link to='/admin/login' className='text-red font-semibold ml-2 cursor-pointer'> Login</Link></div>
        </div>
        
      </div>
    </div>
  )
}

import React,{useRef, useState} from 'react';
import axios from './services/httpService';
import { Link } from 'react-router-dom';
import Otp from './Otp';
const mail = '/images/icons/email.png';

export default function Login() {
  const [submit, setSubmit] = useState(false)
  const [loginData, setLoginData] = useState({});
  const [loginError, setLoginError] = useState(false)
  const emailRef = useRef();
    const goNext = async e => {
      let payload = {
        email: emailRef.current.value,
      }
      setLoginData(payload);

      try {
        const response = await axios.post('/login', 
        payload
      )
      const data = await response.data;
      setSubmit(true);
      console.log('final datta - ',data)
      } catch (error) {
        setLoginError(true)
        setTimeout(() => {
          setLoginError(false)
        }, 3000);
        console.log('errrrr - ', error);
      }
      
  }
  return (
    submit ? <Otp loginData={loginData}/>
    : <div className='w-full h-[80vh] flex flex-row justify-center items-center'>
      <div className='h-80 w-full bg-gray rounded-md m-3 md:w-1/3 lg:w-1/3 flex flex-col items-center gap-8'>
        <div className='text-base font-semibold text-white text-center my-3'>Login/Signup</div>
        <div className='flex flex-col items-center w-full'>
          <div className='py-1 flex gap-1 items-center border-b-2 border-b-gray-2 w-10/12'>
            <img className='w-8 h-8' src={mail} />
            <input ref={emailRef} className='  bg-transparent  outline-none ' type='text' placeholder='Enter your email'/>
          </div>
          {loginError && <p className='text-red text-sm font-semibold mt-1 mb-3'>Invalid user</p>}
          <button onClick={goNext} className={`p-2 w-36 rounded-md border-2 border-green bg-transparent text-green my-4 cursor-pointer`}>Get Otp</button>
        </div>
        <div className='flex flex-col gap-2 text-center'>
          <span className='text-gray-2 text-sm'>Or</span>
          <div className='flex text-gray-2 text-sm'>New User ? <Link to='/signup' className='text-red font-semibold ml-2 cursor-pointer'> Signup</Link></div>
        </div>
        
      </div>
    </div>
  )
}

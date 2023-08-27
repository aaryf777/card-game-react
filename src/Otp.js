import React, { useEffect, useRef, useState } from 'react';
import axios from './services/httpService';
import { Link, useNavigate } from 'react-router-dom';
const mail = '/images/icons/email.png';


export default function Otp({ loginData }) {
    const [otpError, setOtpError] = useState(false);
    const navigate = useNavigate();
    const first = useRef();
    const second = useRef();
    const third = useRef();
    const fourth = useRef();
    let refList = [first,second,third,fourth];
    useEffect(() => {
        first.current.focus();
    },[])
    const handleLogin = async () => {
        let payload = {
            email: loginData.email,
            emailOtp: parseInt(first.current.value + second.current.value + third.current.value + fourth.current.value)
        }
        try {
           const response = await axios.post('/verifyOtp', payload)
           const data = await response.data;
           console.log('data after - ',data);
           localStorage.setItem('token',data.accessToken);
           localStorage.setItem('userName',data.userName);
           localStorage.setItem('userID',data.userID);
           navigate('/profile') 
        } catch (error) {
            console.log(error);
            setOtpError(true);
            setTimeout(() => setOtpError(false),3000);
        }
    }
    const handleOtp = (e,ind) => {
        console.log('e - ',e);
        // setLoginData(p => ({ ...p, opt: p.opt + e.current.value }))
        console.log(e.target.value,' -- ',refList[ind]);
        if(!e.target.value) {
            return;
        }
        if(true) {
            if(ind < 4) {
                refList[ind].current.focus(); 

            } else {
                handleLogin();
                console.log('otp submitted');
            }
        }
    }
    return (
        <div className='w-full h-[80vh] flex flex-row justify-center items-center'>
            <div className='h-80 w-full bg-gray rounded-md m-3 md:w-1/3 lg:w-1/3 flex flex-col items-center gap-8'>
                <div className='text-base font-semibold text-white text-center my-3'>Enter Otp</div>
                <div className='flex items-center gap-2 w-full justify-center'>
                    <div className='p-2 w-12 h-12 bg-gray text-white flex justify-center items-center border-2 border-green'>
                        <input maxLength={1} ref={first}  onChange={e => handleOtp(e,1)} className=' w-full h-full bg-transparent text-center outline-none ' type='number' />
                    </div>
                    <div className='p-2 w-12 h-12 bg-gray text-white flex justify-center items-center border-2 border-green'>
                        <input maxLength={1} ref={second} onChange={e => handleOtp(e,2)} className=' w-full h-full bg-transparent text-center outline-none ' type='number' />
                    </div>
                    <div className='p-2 w-12 h-12 bg-gray text-white flex justify-center items-center border-2 border-green'>
                        <input maxLength={1} ref={third} onChange={e => handleOtp(e,3)} className=' w-full h-full bg-transparent text-center outline-none ' type='number' />
                    </div>
                    <div className='p-2 w-12 h-12 bg-gray text-white flex justify-center items-center border-2 border-green'>
                        <input maxLength={1} ref={fourth} onChange={e => handleOtp(e,4)} className=' w-full h-full bg-transparent text-center outline-none ' type='number' />
                    </div>
                </div>
                <div className='flex flex-col gap-2 mt-16 text-center'>
                    <div className='flex text-gray-2 text-sm'>Didn’t receive OTP ? Request for a new one ? </div>
                    <div className='text-red font-semibold ml-2 cursor-pointer'> Resend</div>
                </div>

            </div>
        </div>
    )
}

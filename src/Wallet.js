import React, { useEffect, useState } from 'react'
import axios from './services/httpService';
import Spinner from './common/Spinner';

export default function Wallet({ setOpenWallet }) {
    const [amount, setAmount] = useState(100)
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState();
    const [error, setError] = useState(false);
    const [errMsg, setErrorMsg] = useState(false)
    const userID = localStorage.getItem('userID');
    const fetchBalance = () => {
        setLoading(true)
        axios.get('/profile', {userID}).then(res => {
          console.log('profile res - ', res)
          setCoins(res.data.data.coins)
          setLoading(false)
        }).catch(err => setError(true))
    }
    useEffect(() => {
       fetchBalance()
      }, [])
    const handleInputAmount = e => {
        if (!e.target.value || parseInt(e.target.value) <= 5000) {
            console.log('valid amount');
            setAmount(e.target.value)
        } else {
            console.log('exedded amount - ', e.target.value);
        }
    }
    const handleCoinUpdate = () => {
        if(amount < 10)  {
            setErrorMsg(true);
            setTimeout(() => {
                setErrorMsg(false)
            },3000)
            return;
        }
        setLoading(true);
        axios.post('/addCoin', {userID,coin:amount}).then(res => {
            fetchBalance()
            setLoading(false)
          }).catch(err => setError(true))
    } 
    return (
        <div
            className="flex justify-center items-center h-full w-full fixed top-0 left-0 z-50 bg-black-70 border"
            style={{ backdropFilter: 'blur(4px)' }}>
            <div className="rounded-md shadow-xl  bg-slate-800 relative w-9/12 h-[300px]">
                {
                    (loading || error) ? <Spinner />
                    : <>
                              <div className='w-full flex justify-end px-2'>
                    <p onClick={() => setOpenWallet(false)} className='text-white text-semibold text-base'>x</p>
                </div>
                <div className='flex my-2 p-1 justify-between bg-yellow-600'>
                    <p className='text-sm '>Current Balance</p>
                    <p className='text-sm font-bold'>&#x20B9; {coins}</p>
                </div>
                <div className='w-full h-full flex flex-col text-center'>
                    <div className='w-full flex flex-col items-center mt-4 gap-4 p-2'>
                        <div className='w-full flex flex-col gap-2'>
                            <div className='max-w-max mx-auto relative'>
                                <input type='number' className='w-32 text-gray-2 rounded-full px-3 py-2 bg-slate-100 outline-none border-none' value={amount} onChange={(e) => handleInputAmount(e)} />
                                <p onClick={() => setAmount('')} className='absolute right-2 top-2 text-white bg-black w-6 h-6 text-base flex justify-center items-center pb-1 rounded-full'>x</p>
                            </div>
                            <div className='w-full p-2 flex gap-2 mt-2'>
                                <p onClick={() => setAmount(100)} className={`w-24 p-2 border  text-black rounded-md ${amount === 100 ? 'bg-slate-300' : 'bg-white'}`}>100</p>
                                <p onClick={() => setAmount(200)} className={`w-24 p-2 border  text-black rounded-md ${amount === 200 ? 'bg-gray-2' : 'bg-white'}`}>200</p>
                                <p onClick={() => setAmount(500)} className={`w-24 p-2 border  text-black rounded-md ${amount === 500 ? 'bg-gray-2' : 'bg-white'}`}>500</p>
                                <p onClick={() => setAmount(1000)} className={`w-24 p-2 border  text-black rounded-md ${amount === 1000 ? 'bg-gray-2' : 'bg-white'}`}>1000</p>
                            </div>
                        </div>
                        {errMsg && <span className='text-red text-xs font-semibold'>Amount should be greater than 10</span>}
                        <button onClick={handleCoinUpdate} className='rounded-md font-semibold text-white bg-green p-2 text-sm cursor-pointer hover:opacity-50 '>ADD {amount}</button>
                    </div>
                </div>
                    </>
                }
          
            </div>
        </div>
    )
}

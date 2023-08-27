import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import axios from './services/httpService'
import Counter from './Counter';
import EndGameModal from './EndGameModal';
import Spinner from './common/Spinner';
const trophy = '/images/icons/trophy2.svg';
const coin = '/images/icons/coinIcon.png';

export default function Home() {
    const navigate = useNavigate();
    const [contestTypes, setContestTypes] = useState({});
    const [loading, setLoading] = useState(false);
    // return <EndGameModal summary={{winner: 'Aaryf',looser: 'aaryf__khan',winningStatus:false,contestDetails:{betamount:1000,winningamount:1800}}}/>
   
    useEffect(() => {
        setLoading(true);
        axios.get('/contest/getcontests').then(res => {console.log('res --- ',res.data.data);setContestTypes(res.data.data);setLoading(false)});
    },[])
    const handleStartGame = key => {
        navigate(`/start?type=${key}`)
      }
    return (
        <div className='w-full ' >
            {/* <Header/> */}
            <div className='w-full p-2' >
            <div className='text-sm   mb-3 px-1 uppercase'>Live Contests</div>
                { loading ? <div className='w-full h-[90vh]'><Spinner/></div>
                    : Object.entries(contestTypes)?.map(([key,value]) => <div className='w-full my-2'>
                        
                        <div className='bg-slate-800 rounded-md m-1 cursor-pointer' >
                            <div className='border-b text-slate-400 text-xs font-semibold border-gray p-2  flex justify-between'>
                                <div className='flex flex-col'>
                                    <div>Total Spots : <span className=' font-semibold'>2</span></div>
                                    <span className="text-yellow font-semibold text-xs">HEAD TO HEAD</span>
                                </div>
                                <button onClick={() => handleStartGame(key)} className='rounded-md text-white bg-green p-1 w-24 cursor-pointer hover:opacity-50 '>JOIN</button>
                            </div>
                            <div className='flex justify-center text-sm font-semibold text-white mt-1 uppercase'>{value.constestName}</div>
                            <div className='flex justify-center items-center gap-2 p-2'>
                                <img src={trophy} className='w-5 h-5' />
                                <span className='text-yellow text-base font-bold '><span> &#x20B9;</span>{value.winningamount}</span>
                            </div>
                            <div className=' text-gray-2 rounded-b-md bg-slate-700 px-2 py-2 flex justify-end'>
                                <div className='flex gap-1 items-center'>
                                    {/* <img src={coin} className='w-4 h-4' /> */}
                                    <span className='text-xs text-white'>Entry:</span>
                                    <span className='text-white text-xs font-bold mr-2'> &#x20B9; {value.betamount}</span>
                                </div>
                            </div>
                        </div>
                    </div>)
                }

             </div>
             {/* <Link to='/start' className='p-3 border-2 bg-blue-3 text-white'>
            <span className=''>Start Game</span>
         </Link> */}
         </div>
     )
}

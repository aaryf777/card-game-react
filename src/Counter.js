import React, { useEffect, useState } from 'react'
let interval;
export default function Counter() {
    const [intCount, setIntCount] = useState(15);
    const [myLife, setMyLife] = useState(5);
    const [oppLife, setOppLife] = useState(5);
    const [turn, setTurn] = useState(true)
    const [show, setShow] = useState(false)
    // const [stop, setStop] = useState(true);
    // useEffect(() => {
    //     // if (stop) return;
    //     interval = setInterval(() => {
    //         console.log('running interval - ',intCount);
    //         setIntCount(p => p - 1)
    //     }, 1000)
    //     return () => {
    //         clearInterval(interval)
    //     }
    // }, [turn])
    // useEffect(() => {
    //     console.log('intCount useEffect running - ',intCount);
    //     if (intCount === 0) {
    //         if (turn) {
    //             setMyLife(p => p - 1);
    //         } else {
    //             setOppLife(p => p - 1);
    //         }
    //         clearInterval(interval)
    //         setIntCount(15);
    //         // setStop(true)
    //     } 

    // }, [intCount])
    return (
        <>
            {/* <div>Current Turn - {turn ? 'Aaryf' : 'Other'}</div>
            <div>counter:  {intCount}</div>
            <div className='flex gap-4'>
                <button className='p-1 border' onClick={() => { setTurn(true) }}>Myturn</button>
                <h1>My life left - {myLife} </h1>
            </div>
            <div className='flex gap-4'>
                <button className='p-1 border' onClick={() => { setTurn(false) }}>Oppturn</button>
                <h1>Opp life left - {oppLife} </h1>
            </div> */}
            
            {show && <div className=' duration-1000 transition-all teans h-60 w-48 bg-red'></div>}
          
            
            {/* {turn && <div className={`w-full flex flex-row-reverse h-2 border`}>
              <div style={{width: `${intCount*5}%`}} className={` h-full bg-green`}></div>
              <div style={{width: `${100 - intCount*5}%`}} className={` h-full bg-red`}></div>
            </div>} */}
            <button className='p-1 border' onClick={() => setShow(p => !p)}>Pause/play</button>
           
        </>
    )
}

import React, { useEffect, useState } from 'react'
import EndGameModal from './EndGameModal';
const trophy = '/images/icons/trophygreen.svg';
const vsLogo = '/images/icons/newvslogo.png'
const avtaar = '/images/icons/avtaar.svg'
let interval;
export default function StartGame({ socket, opponent, myCards, setMyCards, contest, myTurn, setMyTurn, oppCards, setOppCards }) {
  const userID = localStorage.getItem('userID')
  const myName = localStorage.getItem('userName')
  const [btns, setBtns] = useState([
    {
      name: 'Match',
      value: 'match',
      key: 1
    },
    {
      name: 'Runs',
      value: 'runs',
      key: 2
    },
    {
      name: 'HS',
      value: 'hs',
      key: 3
    },
    {
      name: '100s',
      value: 'hundred',
      key: 4
    },
    {
      name: '50s',
      value: 'fifty',
      key: 5
    },
    {
      name: 'Sixes',
      value: 'sixes',
      key: 6
    },
    {
      name: 'Fours',
      value: 'fours',
      key: 7
    },
    {
      name: 'Balls',
      value: 'balls',
      key: 8
    },
    {
      name: 'Wicket',
      value: 'wicket',
      key: 9
    }
  ])
  const [myStat, setMyStat] = useState('')
  const [oppStat, setOppStat] = useState('');
  const [oppCard, setOppCard] = useState('')
  const [status, setStatus] = useState('')
  const [myLife, setMyLife] = useState(5);
  const [oppLife, setOppLife] = useState(5);
  const [change, setChange] = useState({});
  const [intCount, setIntCount] = useState(20);
  const [summary, setSummary] = useState('');
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    interval = setInterval(() => {
      setIntCount(p => p - 1)
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [change])
  useEffect(() => {
    if (intCount === 0) {
      if (myTurn) {
        defaultPlay()
      }
      clearInterval(interval)
      setIntCount(20);
    }
  }, [intCount])

  useEffect(() => {
    checkForEnd()
  },[myCards,oppCards])
  useEffect(() => {
    if(!myLife) {
      setMyCards([])
    } else if(!oppLife) {
      setOppCards([])
    }
  },[myLife,oppLife])

  function checkForEnd() {
    if(myCards?.length === 0) {
      endGame({winnerID:opponent.userID, looserID:userID})
    } else if (oppCards?.length === 0){
      endGame({winnerID:userID, looserID:opponent.userID})
    }
  }

  useEffect(() => {
    socket.on("ROUND_START_BY_ME", (res) => {
      console.log('my round start data - ', res);
      clearInterval(interval)
      setMyLife(res.myLife)
      setOppLife(res.oppLife)
      setIntCount(20)
      setChange({})
      setMyTurn(res.myTurn)
    })
    socket.on("ROUND_START_BY_OPP", (res) => {
      console.log('opponent round start data - ', res);
      setOppCard(res.card);
      setOppCards(res.myCards)
      setOppStat(res.oppStat)
      clearInterval(interval)
      setMyLife(res.myLife)
      setOppLife(res.oppLife)
      setIntCount(20)
      setChange({})
      setMyTurn(res.myTurn)
    })
    socket.on("ROUND_END_BY_OPP", (res) => {
      console.log('opponent round ennd data - ', res);
      setOppCard(res.card);
      setOppStat(res.oppStat);
      setMyLife(res.myLife)
      setOppLife(res.oppLife)
      setStatus(res.tie ? 'TIE' : res.winner ? 'WON' : 'LOST')
      clearInterval(interval)
      setTimeout(() => {
        setOppStat('')
        setMyStat('')
        setOppCard('')
        setOppCards(res.oppCards)
        setMyCards(res.myCards)
        setStatus('')
        setIntCount(20)
        setChange({})
        setMyTurn(res.myTurn);
      }, 5000)
    })
    socket.on("ROUND_END_BY_ME", (res) => {
      console.log('me round ennd data - ', res);
      setStatus(res.tie ? 'TIE' : res.winner ? 'WON' : 'LOST')
      clearInterval(interval)
      setMyLife(res.myLife)
      setOppLife(res.oppLife)
      setOppCard(res.card);
      setTimeout(() => {
        setOppStat('')
        setMyStat('')
        setOppCard('')
        setOppCards(res.oppCards)
        setMyCards(res.myCards)
        setStatus('')
        setIntCount(20)
        setChange({})
        setMyTurn(res.myTurn);
      }, 5000)
    })
    socket.on('END_GAME', res => {
      console.log('endame res data - ',res);
      clearInterval(interval)
      setSummary({
        winner: res.won ? myName : opponent.userName,
        looser: res.won ? opponent.userName : myName,
        contestDetails: res.contest,
        winningStatus: res.won
      })
      setOpenModal(true);
    })
  }, [socket])
  function defaultPlay() {
    if(!oppStat?.name) {
      let rand = Math.floor(Math.random() * 9)
      const stat = btns.find(btn => btn.key === rand) || btns[0];
      console.log('randomly selected stat - ', stat);
      handleStat(stat,true)
    } else {
      handleStat(btns.find(btn => btn.name === oppStat.name),true)
    }
  }
  function handleStat(e,byDefault) {
    console.log('is my turn - ', myTurn, ' and e = ',e, ' and opppstat - ',oppStat);
    if (!myTurn) return;
    if(oppStat && oppStat?.name !== e.name) return;
    setMyStat({ name: e.name, value: myCards[0][e.value] })
    console.log('emitting PLAY');
    socket.emit('PLAY', { myStat: { name: e.name, value: myCards[0][e.value] }, myCard: myCards[0], oppStat, oppCard, isStarting: !oppStat?.name, contestID: contest.contestID, myCards, oppCards, myLife: byDefault ? myLife-1 : myLife, oppLife })
  }
  const endGame = ({winnerID,looserID}) => {
    // if (document.exitFullscreen) {
    //   document.exitFullscreen();
    // } else if (document.mozExitFullScreen) {
    //   document.mozExitFullScreen();     // Firefox
    // } else if (document.webkitExitFullscreen) {
    //   document.webkitExitFullscreen();  // Safari
    // } else if (document.msExitFullscreen) {
    //   document.msExitFullscreen();      // IE/Edge
    // }
    console.log('coming to endgame');
    socket.emit('END',{winnerID, looserID ,contestID:contest.contestID,won: !!myCards.length})
  }
  if(openModal) {
    return <EndGameModal summary={summary} setOpenModal={setOpenModal}/>
  }
  return (
    <div className='w-full h-full absolute z-50 top-0 bg-slate-800'>
      <div className='w-full flex '>
        <div className='w-1/3 h-full p-2'>
          <div className='w-full h-48 bg-gradient-to-r from-blue-600 to-blue-300 shadow-xl flex'>
            <div className='w-1/2 p-1'>
              <img className='h-32' src={myCards[0]?.profile} />
              <h1 className='text-sm mt-1 font-semibold w-full text-center text-slate-100  p-1'>{myCards[0]?.name}</h1>
            </div>
            <div className='w-1/2 py-1 pr-1'>
              {/* <h1 className='text-sm font-semibold w-full'>Player Stats</h1> */}
              <div className='bg-slate-800 text-slate-200 h-full flex flex-wrap  border font-semibold justify-center p-1'>
                <div className='flex flex-col  pl-1  items-center'>
                  <p className='text-xs'>Match</p>
                  <p className='text-xs font-semibold'>{myCards[0]?.match}</p>
                </div>
                <div className='flex flex-col  pl-1  items-center'>
                  <p className='text-xs'>Runs</p>
                  <p className='text-xs font-semibold'>{myCards[0]?.runs}</p>
                </div>
                <div className='flex flex-col  pl-1  items-center'>
                  <p className='text-xs'>HS</p>
                  <p className='text-xs font-semibold'>{myCards[0]?.hs}</p>
                </div>
                <div className='flex flex-col  pl-1  items-center'>
                  <p className='text-xs'>100s</p>
                  <p className='text-xs font-semibold'>{myCards[0]?.hundred}</p>
                </div>
                <div className='flex flex-col  pl-1  items-center'>
                  <p className='text-xs'>50s</p>
                  <p className='text-xs font-semibold'>{myCards[0]?.fifty}</p>
                </div>
                <div className='flex flex-col  pl-1  items-center'>
                  <p className='text-xs'>Sixes</p>
                  <p className='text-xs font-semibold'>{myCards[0]?.sixes}</p>
                </div>
                <div className='flex flex-col  pl-1  items-center'>
                  <p className='text-xs'>Fours</p>
                  <p className='text-xs font-semibold'>{myCards[0]?.fours}</p>
                </div>
                {/* <div className='flex flex-col  pl-1  items-center'>
                  <p className='text-xs'>Not out</p>
                  <p className='text-xs font-semibold'>{myCards[0]?.no}</p>
                </div> */}
                <div className='flex flex-col  pl-1  items-center'>
                  <p className='text-xs'>Balls</p>
                  <p className='text-xs font-semibold'>{myCards[0]?.balls}</p>
                </div>
                <div className='flex flex-col  pl-1  items-center'>
                  <p className='text-xs'>Wicket</p>
                  <p className='text-xs font-semibold'>{myCards[0]?.wicket}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='w-1/3 absolute bottom-0 mb-2 pt-3 pr-4'>
            <div className='w-full flex items-end gap-2 '>
              <div className={`${status === 'WON' ? 'bg-green' : 'bg-gradient-to-r from-blue-600 to-blue-300'}  w-12 h-12 p-1 shadow-xl`}><img className='w-full h-full' src={avtaar} /></div>
              <h1 className='text-blue-600 text-base font-semibold flex items-end p-2'>{myName}</h1>
              {myTurn && <div className='bg-green w-2 h-2 mb-4 rounded-full'></div>}
            </div>
            <div className=' flex justify-between bg-gradient-to-r to-slate-700 from-slate-600 w-full gap-3'>
              <div className='flex'>
                <div className=' flex flex-col justify-center items-center tex-black p-1 '>
                  <p className='text-xs font-bold'>Bet</p>
                  <p className='text-xs font-bold'>{contest.betamount}</p>
                </div>
                <div className='flex bg-slate-800 font-semibold text-xs m-1 py-1 px-2 gap-2 shadow-xl rounded-md justify-center items-center'>
                  <span>CARD LEFT : </span>
                  <span className='font-bold text-base text-green-600'>{myCards.length}</span>
                </div>
              </div>
              <div className='flex p-1 flex-col justify-around '>
                {
                  [1, 2, 3, 4, 5].map(p => (
                    <div className={`h-1 w-1 rounded-full ${p <= myLife ? 'bg-green' : 'bg-red'}`}></div>
                  ))
                }
              </div>
            </div>{ }
            {myTurn && <div className={`w-full flex flex-row-reverse h-1`}>
              <div style={{ width: `${intCount * 5}%` }} className={` h-full bg-green`}></div>
              <div style={{ width: `${100 - intCount * 5}%` }} className={` h-full bg-red`}></div>
            </div>}
          </div>
        </div>
        <div className='w-1/3 h-48 mt-1 text-black flex flex-col justify-between pb-1 items-center'>
          <div className='flex flex-col gap-1'>

            <div className='flex flex-col text-center w-full items-center'>
              <p className=' font-semibold text-slate-200 text-center text-base uppercase'>{contest.constestName}</p>
              <div className='flex gap-1 justify-center items-center'>
                <img src={trophy} className='w-5 h-5' />
                <span className='text-green-600 text-xl font-bold '><span> &#x20B9;</span>{contest.winningamount}</span>
              </div>
            </div>
            
            <div className='flex w-full justify-center text-slate-100  '>
              <img className='w-20 h-10 ' src={vsLogo} />
            </div>

          </div>
          
          {status ? <h1 className={`text-2xl transition-all font-bold text-center ${status === 'TIE' ? 'text-white' : status === 'WON' ? 'text-green' : 'text-red'} `}>{status || 'WON'}</h1>
            :
          <div className={`w-2/3 transition-all  flex flex-col justify-center items-center bg-gradient-to-r from-blue-600 to-red-600 shadow-sm}   p-1`}>
            <h1 className='text-sm text-white font-semibold mb-1'>{myStat?.name || oppStat?.name || 'Choose Stat'}</h1>
             <div className='w-full text-xl font-bold flex h-10'>
              <div className='w-1/2 h-full border-r bg-white text-blue-600 border-blue-600 flex justify-center items-center'>{myStat?.value}</div>
              <div className='w-1/2 h-full border-l bg-white text-red-600 border-red-600 flex justify-center items-center'>{oppStat?.value}</div>
            </div> 
          </div>}
          <div className='w-1/3 absolute bottom-0 mb-1 flex flex-wrap justify-center '>
            {
              btns.map(e => <div className='p-[2px] w-1/3  '> <button disabled={!myTurn} onClick={() => handleStat(e)} className={`bg-gradient-to-r to-slate-700 from-slate-600 cursor-pointer rounded shadow-xl text-white text-sm font-semibold p-1 w-full  flex justify-center items-center ${!myTurn || e.value !== oppStat.name ? 'opacity-70' : ''}`}>{e.name}</button></div>)
            }
          </div>
        </div>
        <div className='w-1/3 h-full p-2'>
          {oppCard ? <div className='w-full h-48 bg-gradient-to-r to-red-600 from-red-300 shadow-xl flex flex-row-reverse'>
            <div className='w-1/2 p-1'>
              <img className='h-32' src={oppCard?.profile} />
              <h1 className='text-sm mt-1 font-semibold w-full text-center text-slate-100  p-1'>{oppCard?.name}</h1>
            </div>
            <div className='w-1/2 py-1 pl-1'>
              <div className='bg-slate-800 text-slate-200 h-full flex flex-wrap gap-2 border justify-center p-1 font-semibold'>
                <div className='flex flex-col   items-center'>
                  <p className='text-xs'>Match</p>
                  <p className='text-xs font-semibold'>{oppCard?.match}</p>
                </div>
                <div className='flex flex-col  items-center'>
                  <p className='text-xs'>Runs</p>
                  <p className='text-xs font-semibold'>{oppCard?.runs}</p>
                </div>
                <div className='flex flex-col  items-center'>
                  <p className='text-xs'>HS</p>
                  <p className='text-xs font-semibold'>{oppCard?.hs}</p>
                </div>
                <div className='flex flex-col  items-center'>
                  <p className='text-xs'>100s</p>
                  <p className='text-xs font-semibold'>{oppCard?.hundred}</p>
                </div>
                <div className='flex flex-col  items-center'>
                  <p className='text-xs'>50s</p>
                  <p className='text-xs font-semibold'>{oppCard?.fifty}</p>
                </div>
                <div className='flex flex-col  items-center'>
                  <p className='text-xs'>Sixes</p>
                  <p className='text-xs font-semibold'>{oppCard?.sixes}</p>
                </div>
                <div className='flex flex-col  items-center'>
                  <p className='text-xs'>Fours</p>
                  <p className='text-xs font-semibold'>{oppCard?.fours}</p>
                </div>
                {/* <div className='flex flex-col  items-center'>
                  <p className='text-xs'>Not out</p>
                  <p className='text-xs font-semibold'>{oppCard?.no}</p>
                </div> */}
                <div className='flex flex-col  items-center'>
                  <p className='text-xs'>Balls</p>
                  <p className='text-xs font-semibold'>{oppCard?.balls}</p>
                </div>
                <div className='flex flex-col  items-center'>
                  <p className='text-xs'>Wicket</p>
                  <p className='text-xs font-semibold'>{oppCard?.wicket}</p>
                </div>
              </div>
            </div>
          </div> : <div className='w-full h-48 bg-gradient-to-r to-red-600 from-red-300 shadow-xl '></div>}
          <div className='w-1/3 right-0 mx-2 absolute bottom-0 mb-2 pt-3 pl-4'>
            <div className='w-full flex items-end flex-row-reverse gap-2 '>
              <div className={`${status === 'LOST' ? 'bg-green' : 'bg-gradient-to-r to-red-600 from-red-300'} w-12 h-12 p-1 shadow-xl`}><img className='w-full h-full' src={avtaar} /></div>
              <h1 className='text-red-600 text-base font-semibold flex items-end p-2 '>{opponent.userName}</h1>
              {!myTurn && <div className='bg-green w-2 h-2 mb-4 rounded-full'></div>}
            </div>
            <div className=' flex flex-row-reverse justify-between bg-gradient-to-r to-slate-700 from-slate-600 w-full gap-3'>
              <div className='flex flex-row-reverse'>
                <div className=' flex flex-col justify-center items-center tex-black p-1 '>
                  <p className='text-xs font-bold'>Bet</p>
                  <p className='text-xs font-bold'>{contest.betamount}</p>
                </div>
                <div className='flex bg-slate-800 font-semibold text-xs m-1 px-2 py-1 gap-2 shadow-xl rounded-md justify-center items-center'>
                  <span>CARD LEFT : </span>
                  <span className='font-bold text-base text-green-600'>{oppCards.length}</span>
                </div>
              </div>
              <div className='flex p-1 flex-col justify-around '>
                {
                  [1, 2, 3, 4, 5].map(p => (
                    <div className={`h-1 w-1 rounded-full ${p <= oppLife ? 'bg-green' : 'bg-red'}`}></div>
                  ))
                }
              </div>
            </div>
            {!myTurn && <div className={`w-full flex flex-row-reverse  h-1 -mt-1 `}>
              <div style={{ width: `${intCount * 5}%` }} className={` h-full bg-green`}></div>
              <div style={{ width: `${100 - intCount * 5}%` }} className={` h-full bg-red`}></div>
            </div>}
          </div>
        </div>
      </div>
    </div>
  )
}

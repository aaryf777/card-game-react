import React, { useEffect, useState, useRef } from 'react';
import socket from './services/socket';
import { useSearchParams } from 'react-router-dom';
import Spinner from './common/Spinner';
import StartGame from './StartGame';
let c = 0;
export default function Gamepage() {
  const elem = useRef();
  let userID = localStorage.getItem('userID')
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [opponent, setOpponent] = useState({});
  const [myCards, setMyCards] = useState([])
  const [oppCards, setOppCards] = useState([])
  const [contest, setContest] = useState({});
  const [myTurn, setMyTurn] = useState('');
  useEffect(() => {
    setIsLoading(true);
    let contestType = searchParams.get('type');
    if (c++ < 1) {
      socket.emit('join', { userID, contestType })
    }

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    return () => {
      socket.off('disconnect', () => {
        console.log('user disconnected');
      });
    };
  }, []);

  useEffect(() => {
    let element = elem.current;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();     // Firefox
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();  // Safari
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();      // IE/Edge
    }
    socket.on('error', (res) => {
      console.log('socket error - ', res);
    })
    socket.on('join', (res) => {
      console.log('join event triggered - ', res);
      res.response.cards && setMyCards(res.response.cards);
      setMyTurn(res.response.myTurn);
      setContest(res.response.contest);
      if(res.response.opponent) {
        setOpponent(res.response.opponent);
        setOppCards(res.response.oppCards);
      }
      if (res.response.status === 'full') {
        setIsLoading(false);
      }
    });
    socket.on('OPP_JOIN', (res) => {
      console.log('opp_join event triggered - ', res);
      res.response.cards && setMyCards(res.response.cards);
      if(res.response.opponent) {
        setOpponent(res.response.opponent);
        setOppCards(res.response.oppCards);
      }
      if (res.response.status === 'full') {
        setIsLoading(false);
      }
    })
  }, [socket])


  return (
    <div className='w-full'>
      {isLoading ?
      <div className='w-full h-[90vh]'>
         <Spinner isMsg />
      </div>
        : <div ref={elem} className='w-full'>
          <StartGame
            socket={socket}
            opponent={opponent}
            myCards={myCards}
            setMyCards={setMyCards}
            oppCards={oppCards}
            setOppCards={setOppCards}
            contest={contest}
            myTurn={myTurn}
            setMyTurn={setMyTurn}
          />
        </div>
      }
    </div>
  )
}

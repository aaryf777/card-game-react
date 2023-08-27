import { Link } from "react-router-dom"

const winnerLogo = '/images/icons/winner-logo-slate-800.svg'
const looserLogo = '/images/icons/looser-logo.svg'
export default function EndGameModal({ summary, setOpenModal }) {
console.log('summay in endgame - ',summary);
    return (
        <div
            className="flex justify-center items-center h-full w-full fixed top-0 left-0 z-50 bg-black-70 border font-surfer"
            style={{ backdropFilter: 'blur(4px)' }}>
            <div className=" rounded-md shadow-xl  p-3 bg-slate-800 relative w-9/12 min-h-[260px] max-h-[260px] flex flex-col justify-center items-center">
                <div className="w-2/3 pt-4 h-72 relative flex justify-center ">
                    {
                    summary?.winningStatus 
                    ? <img className="w-full h-full" src={winnerLogo}></img>
                    : <img className="w-full h-full" src={looserLogo}></img>
                    }
                    {/* <h1 className="text-xl font-bold">{summary?.winningStatus ? 'WINNER' : 'LOOSER'}</h1> */}
                    <div className="absolute  pt-2 left-0 top-0  w-full h-full flex flex-col gap-1 justify-center items-center">
                        <h1 className={`text-xl ${summary?.winningStatus ? 'text-green' : 'text-red'} `}>{summary?.winningStatus ? 'YOU WON' : 'YOU LOST'}</h1>
                        <div className="w-full flex flex-col items-center gap-[2px]">
                            <div className="w-48 flex justify-between bg-gradient-to-b from-yellow-500 to-yellow-400 px-1">
                                <p className="text-sm text-white">You</p>
                                <p className="text-xs text-white">{summary?.winningStatus ? <span>&#x20B9; {summary?.contestDetails.winningamount}</span> : 'LOST'} </p>
                            </div>
                            <div className="w-48 flex justify-between bg-gradient-to-b from-slate-600 to-slate-500 px-1">
                                <p className="text-sm text-white">{summary?.winningStatus ? summary?.looser : summary?.winner}</p>
                                <p className="text-xs text-white">{!summary?.winningStatus ? <span>&#x20B9; {summary?.contestDetails.winningamount}</span> : 'LOST'}</p>
                            </div>

                        </div>
                        <div className="w-48 text-yellow text-sm mt-1 ">Bet Amount <span className="bg-yellow text-white p-1 text-sm">{summary?.contestDetails.betamount}</span> </div>
                    </div>
                    <Link href='/' className="absolute flex justify-center -left-11 bottom-12 rounded-xl text-white bg-gradient-to-b from-red-600 to-red-400 p-3 w-24 cursor-pointer hover:opacity-50" onClick={() => setOpenModal(false)}>Cancel</Link>
                    <button className="absolute flex justify-center -right-10 bottom-12 rounded-xl text-white bg-gradient-to-b from-green-600 to-green-400 p-3 w-24 cursor-pointer hover:opacity-50" onClick={() => setOpenModal(false)}>Share</button>
                </div>
                
            </div>
        </div>
    )
}

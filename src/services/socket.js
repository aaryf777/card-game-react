import {io} from 'socket.io-client';
const socket = io(process.env.REACT_APP_IO_ENDPIONT,{
    cors: {
        origin: "http://localhost:8000"
      },
      query: {
        token: localStorage.getItem('token')
      }
});

export default socket

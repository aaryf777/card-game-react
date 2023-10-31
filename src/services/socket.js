import {io} from 'socket.io-client';
const socket = io(process.env.REACT_APP_IO_ENDPIONT,{
      query: {
        token: localStorage.getItem('token')
      }
});

export default socket

import axios from 'axios';
export default axios.create({
    baseURL: 'http://localhost:5000/v1/',
    headers: {
        Authorization : `Bearer ${localStorage.getItem("token")}`,
        'Content-Type' : 'application/json'
    }
});


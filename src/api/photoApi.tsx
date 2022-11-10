import axios from "axios"

const photoAPI = axios.create({
    baseURL:'https://jsonplaceholder.typicode.com',
    headers: {
        'Content-Type': 'application/json'
    },
    params: {
        _limit: 30
    }
    
})

export default photoAPI
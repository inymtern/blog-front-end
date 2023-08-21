import axios from "../Request";



export function login(data) {
    return axios.post('/api/v1/auth/login', data)
}

export function getUserInfo() {
    return axios.get('/api/v1/user')
}
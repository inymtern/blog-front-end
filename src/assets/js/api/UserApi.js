import axios from "../Request";



export function login(data) {
    return axios.post('/blog/api/v1/auth/login', data)
}

export function getUserInfo() {
    return axios.get('/blog/api/v1/user')
}
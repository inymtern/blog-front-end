import axios from "../Request";



export function login(data) {
    return axios.post('/blog/api/v1/auth/login', data)
}

export function getUserInfo() {
    return axios.get('/blog/api/v1/user')
}

export function oauth2Authorize(params) {
    return axios.get('/blog/oauth2/authorize', { params: params })
}
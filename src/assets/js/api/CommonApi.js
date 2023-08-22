
import axios from "../Request";


export function uploadImg(file) {
    return axios.post('/obs/images/upload', file, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}


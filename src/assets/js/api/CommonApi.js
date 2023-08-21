
import axios from "../Request";


export function uploadImg(file) {
    return axios.post('/api/v1/common/uploadImg', file, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}


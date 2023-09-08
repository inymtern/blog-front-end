
import axios from "../Request";
import { userStore } from "../Store";

const store = userStore()
export function uploadImg(file) {
    if(!store.isLogin) {
        window.toastr.error('请登录后重试')
        return 
    }
    return axios.post('/obs/images/upload', file, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}


import { defineStore } from 'pinia'
import { getUserInfo } from './api/UserApi'
import { get, set, remove } from './LocalStore'

export const userStore = defineStore('user', {
    state: () => {
        return {
            isLogin: false,
            username: 'Guest',
            email: 'click to login.. ',
            headImg: 'https://st0.dancf.com/iliad-editor/ebaec665-a2b2-4b02-b05d-e842860b28f8.png',
            token: ''
        }
    },

    getters: {
        getUserInfo() {
            return {
                username: this.username,
                email: this.email,
                headImg: this.headImg
            }
        },
        getIsLogin() {
            return this.isLogin
        }
    },

    actions: {
        login(username, email, headImg, token) {
            this.username = username
            this.email = email
            this.token = token
            this.headImg = headImg
            this.isLogin = true
            set('Authorization', token)
            console.log("登录成功");
        },
        loadUserInfo() {
            // TODO 
            this.token = get('Authorization')
            if (this.token) {
                getUserInfo().then(res => {
                    this.username = res.data.username
                    this.email = res.data.email
                    this.headImg = res.data.headImg
                    this.isLogin = true
                    console.log("登录成功");
                })
            }
        },
        logout() {
            remove('Authorization')
            this.isLogin = false
            this.username = 'Guest'
            this.email = 'click to login.. '
            this.headImg =  'https://st0.dancf.com/iliad-editor/ebaec665-a2b2-4b02-b05d-e842860b28f8.png'
        }
    }
})


export const configStore = defineStore('config', {
    state: () => {
        return {
            editorMode: 'preview',
            showLogin: false,
            showSearchView: false,
            showSetting: false,
            loading: false,
            loadingText: '加载中',
            loadTimer: ''
        }
    },

    getters: {
        getEditorMode() {
            return this.editorMode
        }
    },

    actions: {
        setEditorMode(mode) {
            this.editorMode = mode
        },
        openLoginView() {
            this.showLogin = true
        },
        closeLoginView() {
            this.showLogin = false
        },
        openSearchView() {
            this.showSearchView = true
        },
        closeSearchView() {
            this.showSearchView = false
        },
        openSettingView() {
            this.showSetting = true
        },
        closeSettingView() {
            this.showSetting = false
        },
        setLoading(b) {
            this.loading = b
            if(this.loading) {
                this.loadTimer = setInterval(() => {
                    if( (this.loadingText.match(/\./g) || []).length >= 3) {
                        this.loadingText = "加载中"
                    } else {
                        this.loadingText += "."
                    }
                }, 500);
            }else {
                clearInterval(this.loadTimer)
                this.loadingText = "加载中"
            }
        }
    }



})
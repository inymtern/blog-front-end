<template>
    <div class="header">
        A F T E R L I F E



        <right-button :right="60" ico="icon-add-btn" v-if="showOptBtn" title="新增模式"
            @click="togEditMode('editable', 1)"></right-button>

        <right-button :right="120" ico="icon-view" v-if="showOptBtn" title="预览模式"
            @click="togEditMode('preview')"></right-button>

        <right-button :right="180" ico="icon-edit" v-if="showOptBtn" title="编辑模式"
            @click="togEditMode('editable')"></right-button>

        <right-button :right="240" ico="icon-home" @click="goHome" v-if="showOptBtn" title="首页"></right-button>
    </div>
    <div class="main">
        <transition name="fade" appear>
            <Modal v-if="cfgStore.loading" :loading-use="true">
                {{ cfgStore.loadingText }}
            </Modal>
        </transition>
        <router-view></router-view>
       
        
        
    </div>
    <div class="header">
        Email: inymtern_cl@126.com
        <div class="userinfotool" @click="openLoginModal">
            <img :src="store.headImg" style="border-radius: 5px;" width="45" height="45">
            <div style="display: flex;flex-direction: column;line-height: 1;margin: 0 10px;">
                <div style="align-self: flex-start;font-size: 16px;margin-bottom: 8px;">{{ store.username }}</div>
                <div style="font-size: 14px;color: #495057">{{ store.email }}</div>
            </div>
            <span class="iconfont icon-settings setting" @click="openSetting"></span>
        </div>
    </div>

    <!-- <left-button :height="150" ico="icon-return" title="返回"></left-button> -->










    <transition name="fade" appear>
        <Modal v-if="cfgStore.showLogin" @close-modal="closeModal">
            <template #default>
                <input class="inputt" type="text" v-model="loginForm.username" placeholder="请输入用户名或邮箱">
                <input class="inputt" type="password" v-model="loginForm.password" placeholder="请输入密码">
                <button class="buttonn" @click="userLogin">登录</button>
            </template>
        </Modal>
    </transition>

    <transition name="fade" appear>
        <Modal v-if="cfgStore.showSetting" @close-modal="cfgStore.closeSettingView()">
            <button class="buttonn" @click="quit">退出登录</button>
        </Modal>
    </transition>


    <search-view v-if="cfgStore.showSearchView"></search-view>
</template>

<style scoped>
.header {
    height: 60px;
    background: #fff;
    text-align: center;
    line-height: 60px;
    min-width: 1200px;
    position: relative;
}

.userinfotool {
    position: absolute;
    bottom: 5px;
    right: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.userinfotool .setting {
    transition: all .3s;
}

.setting:hover {
    transform: scale(1.1);
    cursor: pointer;
}

.main {
    min-width: 1200px;
    padding: 0 60px;
    background: #fff;
    position: relative;
}
</style>
<script setup>
import { getCurrentInstance, ref, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import RightButton from './components/RightButton.vue'
import LeftButton from './components/LeftButton.vue'
import SearchView from './components/SearchView.vue'
import Modal from './components/Modal.vue'
import { userStore, configStore } from './assets/js/Store.js'
import { login } from '@/assets/js/api/UserApi'
const router = useRouter()
const route = useRoute()
const store = userStore()
const cfgStore = configStore()


const loginForm = ref({
    username: '',
    password: ''
})

const userLogin = () => {
    if (!loginForm.value.username) {
        return
    }
    if (!loginForm.value.password) {
        return
    }
    login(loginForm.value).then(res => {
        const userinfo = res.data.userinfo
        store.login(userinfo.username, userinfo.email, userinfo.headImg, res.data.token)
        cfgStore.closeLoginView()
        window.toastr.success("登录成功！")
    })
}
store.loadUserInfo()

const closeModal = () => {
    cfgStore.closeLoginView()
}

const openLoginModal = () => {
    if (!store.getIsLogin) {
        cfgStore.openLoginView()
    }else {
        // cfgStore.setLoading(true)

        // setTimeout(() => {
        //     cfgStore.setLoading(false)
        // }, 5000);
    }
}

const togEditMode = (mode, ins) => {
    cfgStore.setEditorMode(mode)
    if (ins && ins == 1) {
        router.push({
            path: '/content',
            query: { id: 0 }
        })

    }

}


const showOptBtn = computed(() => {
    return route.name == 'content'
})

const goHome = () => {
    router.push("/")
}

const openSetting = () => {
    if (store.getIsLogin) {
        cfgStore.openSettingView()
    } else {
        cfgStore.openLoginView()
    }
}

const quit = () => {
    store.logout()
    cfgStore.closeSettingView()
   
}


</script>

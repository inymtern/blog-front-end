<template>
    <div class="auth">
        <div class="imgauth">
            <img class="imitem" :src="authBody.img" width="200">
            <span class="iconfont icon-a-sorting2 imitem"></span>
            <img class="imitem" src="https://st0.dancf.com/static/02/202306170607-8419.png" width="200">
        </div>

        <div style="margin-top: 50px ;">
            <div><span style="color: blue;font-weight: 600;">ChatAI</span> 将获取以下权限:</div>
            <div>- 使用你的头像，用户名，邮箱信息</div>
        </div>



        <div style="margin-top: 50px;" v-if="!store.getIsLogin">
            <input class="inputt" v-model="loginData.username" type="text" placeholder="请输入用户名/邮箱">
        </div>
        <div v-if="!store.getIsLogin">
            <input class="inputt" v-model="loginData.password" type="text" @keydown.enter="thirdLogin" placeholder="请输入密码">
        </div>
        <div v-if="!store.getIsLogin">
            <button class="buttonn" @click="thirdLogin">登录</button>
        </div>

        <div style="margin: 20px 0;display: flex;align-items: center;" v-if="store.getIsLogin">
            <span>当前用户:</span>
            <img class="userimg" :src="userinfo.headImg" width="40" height="40">
            <span class="username">{{ userinfo.username }}</span>
        </div>
        <div class="clickAuth" v-if="store.getIsLogin" @click="authLogin">
            <span class="iconfont icon-atm"></span> <span>授权登录</span>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { userStore } from '../../assets/js/Store';
const route = useRoute()
const router = useRouter()
const store = userStore()

// 进入时--
const rdUrl = route.query.redirectUrl
const appid = route.query.appid

if(!rdUrl || !appid) {
    router.push("/")
}

// 校验appid redirectUrl 获取authBody

// ----


const authBody = ref({
    subject: 'ChatAI',
    img: 'https://st0.dancf.com/static/02/202306170607-8419.png'
})

const userinfo = store.getUserInfo


const loginData = {
    username: '',
    password: ''
}

const thirdLogin = () => {
    console.log(loginData.value);
}
const authLogin = () => {
    console.log(userinfo);
}


</script>
<style scoped>
.auth {
    padding: 40px 0;
    /* background: #cbcbcb; */
    height: calc(100vh - 200px);
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.imgauth {
    margin-top: 150px;
    display: flex;
    align-items: center;
}

.imitem {
    margin: 0 10px;
}

.clickAuth {
    padding: 5px 35px;
    background: #000;
    color: #f1f1f1;
    border-radius: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;

}


.clickAuth span {
    margin: 0 2px;
    font-size: 16px;
}

.username {
    font-size: 20px;
}

.userimg {
    border-radius: 50%;
    border: 1px solid #f1f1f1;
    margin: 0 5px;
}</style>
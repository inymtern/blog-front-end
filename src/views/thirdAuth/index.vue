<template>
    <div class="auth">
        <div class="imgauth">
            <img class="imitem" :src="authBody.img" width="200">
            <span class="iconfont icon-a-sorting2 imitem"></span>
            <img class="imitem" :src="blogico" width="200">
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
            <img class="userimg" :src="store.headImg" width="40" height="40">
            <span class="username">{{ store.username }}</span>
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
import { login, oauth2Authorize } from '../../assets/js/api/UserApi';
import blogico from '../../assets/img/blogico.png'
import icopng from '../../assets/img/icopng.png'
const route = useRoute()
const router = useRouter()
const store = userStore()

// 进入时--
const redirect_uri = route.query.redirect_uri
const client_id = route.query.client_id

if( !client_id) {
    console.log("非法参数");
    router.push("/")
}

// 校验appid redirectUrl 获取authBody

// ----


const authBody = ref({
    subject: 'ChatAI',
    img: icopng
})



const loginData = ref({
    username: '',
    password: ''
})

const thirdLogin = () => {
    if(!loginData.value.username) {
        window.toastr.error('please input your username or email')
        return 
    }
    if(!loginData.value.password) {
        window.toastr.error('please input your password')
        return 
    }
    login(loginData.value).then(res => {
        console.log(res.data);
        // username, email, headImg, token
        const userinfo = res.data.userinfo
        store.login(userinfo.username, userinfo.email, userinfo.headImg, res.data.token)
    })
    console.log(loginData.value);
}
const authLogin = () => {
    oauth2Authorize({
        response_type: route.query.response_type,
        scope: route.query.scope,
        client_id: route.query.client_id,
        redirect_uri: route.query.redirect_uri,
        state: route.query.state
    }).then(res => {
        console.log(res.data);
        window.toastr.success('授权成功!')
        window.location.href = route.query.redirect_uri + "?state" + route.query.state + "&code=" + res.data.tokenValue
    })
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
<template>
    <div class="search">
        <div class="mainsearchbox">
            <div class="searchinput">
                <span class="iconfont icon-search"></span><input class="inputsearch" type="text"
                    placeholder="press enter to search">
            </div>
            <div class="searchList">
                <div class="item" v-for="item in searchList"> 
                    <div class="item-title"> <span>{{ item.title }}</span>   <span style="font-size: 12px;">{{ item.createTime }}</span></div>
                    <div class="item-intro">{{ item.intro }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'

const searchList = ref([
    {id: 1, title: '这就是java', intro: '如额哈扣税的教案课件看到金卡金卡打卡机a,asdjk,asdasjkdjiqeiasa,asdoioaiosdo', createTime: '2023-09-10 09:10' },
    {id: 1, title: '这就是java', intro: '如额哈扣税asdasdasdasd的教a件看到金卡金卡打asdasdasdasd卡机a,asdjk,asdasjkdjiqeiasa,asdoioaiosdo', createTime: '2023-09-10 09:10' }
])
</script>
<style scoped>
.search {
    /* background: #000; */
    position: absolute;
    left: 50%;
    top: 15%;
    transform: translate(-50%, 0);
    z-index: 998;
    max-width: 600px;
}

.mainsearchbox {
    padding: 25px 30px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 1px 5px 50px #555;
}

.searchinput {
    display: flex;
    align-items: center;
    border: 1px solid #888;
    padding: 0 10px;
    border-radius: 5px;

}

.inputsearch {
    height: 35px;
    text-indent: 0.5em;
    outline: none;
    border: none;
}

.searchList {
    min-height: 200px;
    max-height: 700px;
    margin-top: 20px;
}

.item {
    width: 100%;
    margin-top: 10px;
    word-break: break-all;
}
.item:hover {
    cursor: pointer;
}
.item-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
}
.item-title:hover {
    color: blue;
}
.item-intro {
    font-size: 14px;
    color: #888;
}
</style>
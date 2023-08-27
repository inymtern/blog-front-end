<template>
    <div class="home" ref="mainbox" id="mainbox">
        <time-line-item :data="it" v-for="it in data"></time-line-item>
        <transition name="fade" appear>
            <span v-if="cfgStore.pageLoading">{{ loadingText }}</span>
        </transition>
    </div>
    <back-top @click="top"></back-top>
</template>

<style scoped>
.home {
    padding: 40px 0;
    /* background: #cbcbcb; */
    height: calc(100vh - 200px);
    overflow-y: scroll;
}
</style>

<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue';
import TimeLineItem from '../../components/TimeLineItem.vue';
import BackTop from '../../components/BackTop.vue'
import { backtop } from '../../assets/js/BackTop';
const { proxy } = getCurrentInstance()
import { getIndex } from '@/assets/js/api/BlogApi'
import { configStore } from '../../assets/js/Store';
const cfgStore = configStore()
const top = () => {
    backtop(proxy.$refs.mainbox)
}
const data = ref([])
const page = ref(1)
const finished = ref(false)
const loadingText = ref('Loading...')
const handleScroll = (box) => {
    return () => {
        const scrollTop = box.scrollTop; // 滚动条距离顶部的距离
        const scrollHeight = box.scrollHeight; // 元素内容的总高度
        const clientHeight = box.clientHeight; // 元素在视口中的高度

        if (scrollHeight - scrollTop - clientHeight <= 200 && !cfgStore.pageLoading && !finished.value) {
            // 滚动到距离底部100像素时触发加载
            loadData()

            // 移除滚动事件监听器，确保只触发一次
            // box.removeEventListener('scroll', handleScroll);
        }
    }
}


onMounted(() => {
    const box = document.getElementById('mainbox')
    cfgStore.setLoading(true)
    getIndex(page.value).then(res => {
        data.value = res.data
        cfgStore.setLoading(false)
        if (res.data.length < 5) {
            finished.value = true
        }
        box.addEventListener('scroll', handleScroll(box))
    })
})

const loadData = () => {
    page.value = page.value + 1
    cfgStore.setPageLoading(true)
    getIndex(page.value).then(res => {
        res.data.forEach(e => {
            data.value.push(e)
        })
        cfgStore.setPageLoading(false)
        if (res.data.length < 5) {
            finished.value = true
        }
    })
}

</script>

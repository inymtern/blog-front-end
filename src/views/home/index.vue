<template>
    <div class="home" ref="mainbox">
        <time-line-item :data="it" v-for="it in data"></time-line-item>
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
onMounted(() => {
    cfgStore.setLoading(true)
    getIndex().then(res => {
        data.value = res.data
        cfgStore.setLoading(false)
    })
})

</script>

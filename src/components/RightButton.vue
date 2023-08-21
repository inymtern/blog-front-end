<template>
    <div class="icobtn" :title="title" :style="{  'right': right + 'px', 'top': 0 + 'px' }">
        <span :class="['iconfont', ico] "></span>
    </div>
</template>
<script setup>
import { defineProps, ref } from 'vue'
const props = defineProps({
    title: {
        default: '登录'
    },
    right: {
        default: 60
    },
    ico: {
        default: 'icon-customer-management'
    }
})
</script>
<style scoped>
.icobtn {
    position: absolute;
    transition: all .3s;
}
.icobtn:hover {
    cursor: pointer;
    transform: scale(1.5);
}
</style>
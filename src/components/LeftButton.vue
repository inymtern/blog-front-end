<template>
    <div class="icobtn" :title="title" :style="{  'left': '12%', 'top': height + 'px' }">
        <span :class="['iconfont', ico] "></span> <slot></slot>
    </div>
</template>
<script setup>
import { defineProps, ref } from 'vue'
const props = defineProps({
    title: {
        default: '登录'
    },
    height: {
        default: 450
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
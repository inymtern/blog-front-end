<template>
    <div class="container">
        <div class="c_c c_left">
            <div class="hor_line_l">
                <div class="date_l">{{ data.tag_l }}</div>
            </div>
            <div class="content_l">
                <div v-if="data.img_l">
                    <img v-lazy="data.img_l" @click="showImg(data.img_l)" class="imgg"
                        style="max-width: 400px;max-height: 400px;">
                </div>
                <div class="text_title" @click="goContent(data.id_l)"> {{ data.title_l }}</div>
                <div class="text_intro">{{ data.intro_l }}</div>
            </div>
        </div>
        <div class="c_c c_right" :style="{ 'margin-top': data.gap + 'px', '--height': data.gap + 'px' }">

            <div v-if="data.id_r" class="hor_line_r" :style="{ 'top': (data.gap + 10) + 'px' }">
                <div class="date_r">{{ calDate(data.tag_r) }}</div>
            </div>
            <div class="content_r" :style="{ 'margin-top': data.gap + 'px' }">
                <div v-if="data.img_r">
                    <img v-lazy="data.img_r" @click="showImg(data.img_r)" class="imgg"
                        style="max-width: 400px;max-height: 400px;">
                </div>
                <div class="text_title" @click="goContent(data.id_r)">{{ data.title_r }}</div>
                <div class="text_intro">{{ data.intro_r }}</div>
            </div>

        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    background-color: #fff;
}

.c_c {
    padding: 40px 60px;

}

.imgg {
    border-radius: 3px;
    z-index: 9;
}

.text_title {
    font-size: 22px;
    margin: 5px 0;
    transition: all .3s;

}

.text_title:hover {
    cursor: pointer;
    transform: translateY(-3px);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
}

.text_intro {
    overflow-wrap: break-word;
    color: #666;
    font-size: 15px;
    padding: 10px 5px;
    cursor: pointer;
}

.c_left {
    border-right: 2px solid #343a40;
    position: relative;
}

.c_left::before {
    content: "";
    position: absolute;
    right: -12px;
    top: 0;
    width: 10px;
    height: 10px;
    background: #343a40;
    border-radius: 50%;
    border: 6px solid #fff;
    z-index: 9;
}

.hor_line_l {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 60px;
    height: 2px;
    background: #343a40;
    border-radius: 10px;
}

.date_l {
    position: absolute;
    top: -6px;
    right: 80px;
    font-size: 13px;
    color: #333;
    font-weight: bold;
    width: 200px;
    text-align: right;
    /* background: #000; */
}

.date_r {
    position: absolute;
    top: -6px;
    left: 80px;
    font-size: 13px;
    color: #333;
    font-weight: bold;
    text-align: left;
    width: 200px;
    /* background: #000; */
}

.content_l {
    width: 450px;
    padding: 10px;
    text-align: right;
}

img {
    transition: all .3s;

}

img:hover {
    cursor: pointer;
    transform: scale(1.2);
    box-shadow: 1px 1px 4px 1px #e5e5e5;

}

/* ---------------- */
.content_r {
    width: 450px;
    /* margin-top: 50px; */
    padding: 10px;
    text-align: left;
}

.hor_line_r {
    position: absolute;
    left: 10px;
    /* top: 60px;   */
    width: 60px;
    height: 2px;
    background: #343a40;
    border-radius: 10px;
}

.c_right {
    border-left: 1px solid;
    margin-left: -1px;
    /* margin-top: 50px; */
    position: relative;
}

.c_right::before {
    content: "";
    position: absolute;
    left: -12px;
    top: var(--height);
    width: 10px;
    height: 10px;
    background: #343a40;
    border-radius: 50%;
    border: 6px solid #fff;
    z-index: 9;
}
</style>

<script setup>
import { ref, defineProps, onMounted, computed } from 'vue';
import nophoto from '../assets/img/nophoto.png'
import { useRouter } from 'vue-router'
import { configStore } from '../assets/js/Store';
const cfgStore = configStore()
const router = useRouter()
const props = defineProps({
    data: {
        type: Object,
        default: { tag_l: 'OFG | 09-10', title_l: 'THIS IS A TITLE', img_l: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', 'intro_l': 'Please don`t give me a super big trouble, please yes no please no, you will gen.', tag_r: 'OFG | 09-10', title_r: '刷卡时', img_r: '', intro_r: '啊是大家是多久啊圣诞节啊大苏打阿松大', gap: 20, }
    }
})



const showImg = (url) => {
    cfgStore.setImgUrl(url)
}


const goContent = (id) => {
    router.push({
        path: '/content',
        query: { id: id }
    })
}

const setDefaultImage = (i) => {
    if (i == 0) {
        props.data.img_l = nophoto
    } else {
        props.data.img_r = nophoto
    }
}


</script>

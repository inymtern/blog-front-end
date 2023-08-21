<template>
    <div :class="['contentbox', {'maxw': store.editorMode == 'preview'}]" ref="contentbox">
        <!-- <v-md-preview :text="content"></v-md-preview> -->
        <v-md-editor v-model="content" :mode="store.getEditorMode" left-toolbar="save undo redo | tip image emoji todo-list"
            :disabled-menus="[]" @copy-code-success="handleCopyCodeSuccess" @upload-image="handleUploadImage"
            @save="saveOrUpdate" />


    </div>
    <back-top @click="top"></back-top>
</template>
<script setup>
import { ref, getCurrentInstance, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BackTop from '../../components/BackTop.vue'
import { backtop } from '../../assets/js/BackTop';
import { configStore } from '../../assets/js/Store';
import { uploadImg } from '../../assets/js/api/CommonApi'
import { insertOrUpdate, getById } from '../../assets/js/api/BlogApi'
const { proxy } = getCurrentInstance()
const store = configStore()
const router = useRouter()
const route = useRoute()
const currentId = route.query.id

if (!currentId) {
    router.push("/")
}

const content = ref(``)

watch(() => {
    return route.query.id
}, (no, oo) => {
    if (no == 0) {
        content.value = ""
    }else {

    }
})

const loadContent = (id) => {
    store.setLoading(true)
    getById(id).then(res => {
        content.value = res.data.text
        store.setLoading(false)

    })
}


if (currentId == 0) {
    content.value = ''
    store.setEditorMode('editable')
}else {
    loadContent(currentId)
}

// 复制代码
const handleCopyCodeSuccess = () => {
    console.log("copied");
}

const firstImg = ref('')

// 上传图片
const handleUploadImage = (event, insertImage, files) => {
    // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
    const formData = new FormData();
    formData.append('file', files[0]);
    uploadImg(formData).then(res => {
        firstImg.value = res.data
        insertImage({
            url: res.data,
            desc: '',
            width: 'auto',
            height: 'auto',
        });
    })

}
// 回到顶部
const top = () => {
    backtop(proxy.$refs.contentbox)
}


const saveOrUpdate = (text, html) => {
    // console.log(text);
    // console.log(html);
    store.setLoading(true)
    const intro = document.querySelector('p.intro')
    const title = document.querySelector('h1.title')
    const data = {
        id: route.query.id,
        cover: firstImg.value,
        intro: intro ? intro.textContent : '',
        text: text,
        title: title ? title.textContent : ''
    }

    insertOrUpdate(data).then(res => {
        window.toastr.success('成功')
        store.setLoading(false)
        if(route.query.id == 0) {
            router.push("/content?id" + res.data)
        }
    })
}


</script>
<style scoped>
.contentbox {
    height: calc(100vh - 200px);
    background-color: #fff;
    overflow-y: scroll;
    padding: 40px 0;
    margin: 0 auto;
}
.maxw {
    max-width: 1200px;
}
</style>
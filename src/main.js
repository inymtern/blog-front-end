import './assets/css/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import axios from '@/assets/js/request'
import nopic from '@/assets/img/nophoto.png'
import VueLazyLoad from 'vue3-lazyload'

import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// 复制代码插件
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
// emoji插件
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css';
// TODO 插件
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css';

import Prism from 'prismjs';

import markdownItAttrs from 'markdown-it-attrs'

// const titlePlugin = function (md) {
//     md.inline.ruler.before('emphasis', 'title', function (state, silent) {
//         const src = state.src;
//         if (src && src.startsWith('@@', state.pos)) {
//             const match = src.slice(state.pos).match(/^@@([^@]+?)@@/);
//             if (match) {
//                 if (!silent) {
//                     const titleText = match[1].trim();
//                     const headingToken = new state.Token('heading_open', 'h1', 1);
//                     headingToken.attrs = [['class', 'title']];
//                     state.push(headingToken);

//                     const textToken = new state.Token('text', '', 0);
//                     textToken.content = titleText;
//                     state.push(textToken);

//                     state.push('heading_close', 'h1', -1);
//                 }
//                 state.pos += match[0].length;
//                 return true;
//             }
//         }
//         return false;
//     });
// };



VueMarkdownEditor
    .use(vuepressTheme, {
        Prism,
        extend(md) {
            md.set({
                // optional, these are default options
                leftDelimiter: '{',
                rightDelimiter: '}',
                allowedAttributes: []  // empty array = all attributes are allowed
            }).use(markdownItAttrs)
        }
    })
    .use(createCopyCodePlugin())
    .use(createEmojiPlugin())
    .use(createTodoListPlugin())








const app = createApp(App)

const pinia = createPinia()
app.config.globalProperties.$axios = axios
app.use(router)
    .use(VueMarkdownEditor)
    .use(pinia)
    .use(VueLazyLoad, {
        loading: nopic,
        error: nopic,
        lifecycle: {
            loading: (el) => {
                console.log('loading', el)
            },
            error: (el) => {
                console.log('error', el)
            },
            loaded: (el) => {
                console.log('loaded', el)
            }
        }
    })


app.mount('#app')

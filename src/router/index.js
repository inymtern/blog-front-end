import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home/index.vue')
    },
    {
      path: '/content',
      name: 'content',
      component: () => import('../views/content/index.vue')
    },
    {
      path: '/oauth2-Login',
      name: 'oauth2-Login',
      component: () => import('../views/thirdAuth/index.vue')
    },
  ]
})

export default router

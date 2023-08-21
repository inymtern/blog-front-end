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
      path: '/third-auth',
      name: 'third-auth',
      component: () => import('../views/thirdAuth/index.vue')
    },
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'home',
      component: () => import('../views/home/index.vue')
    },
    {
      path: '/upload',
      component: () => import('../views/upload/index.vue')
    },
    {
      path: '/uploadimg',
      component: () => import('../views/uploadimg/index.vue')
    },
    {
      path: '/uploadvdo',
      component: () => import('../views/uploadvdo/index.vue')
    },
    {
      path: '/imgs',
      component: () => import('@/views/imgresult/index.vue'),
      props: true
    },
    {
      path: '/vdo',
      component: () => import('@/views/vdoresult/index.vue'),
      props: true
    },
  ]
})

export default router

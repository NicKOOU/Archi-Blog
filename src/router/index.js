// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/ArticleList.vue'),
      },
    ],
  },
  {
    path: '/articles/:id',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'ArticleDetails',
        component: () => import('@/views/ArticleDetails.vue'),
      },
    ],
  },
  {
    path: '/create',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'ArticleForm',
        component: () => import('@/views/ArticleForm.vue'),
      },
    ],
  },
  {
    path: '/edit/:id',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'ArticleForm',
        component: () => import('@/views/ArticleForm.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

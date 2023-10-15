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
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: '/create',
        name: 'Create',
        component: () => import('@/views/ArticleCreate.vue'),
      },
      {
        path: '/articles/:id',
        name: 'ArticleDetails',
        component: () => import('@/views/ArticleDetails.vue'),
      },
      {
        path: '/contact',
        name: 'Contact',
        component: () => import('@/views/ArticleContact.vue'),
      }

    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

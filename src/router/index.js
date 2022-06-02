import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/start',
            name: 'start',
            component: () => import('../views/StartView.vue')
        }, {
            path: '/api',
            name: 'api',
            component: () => import('../views/ApiView.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue')
        },
        {
            path: '/article/:id?',
            props: true,
            name: 'article',
            component: () => import('../views/ArticleView.vue')
        },
        {
            path: '/user/:loginname?',
            props: true,
            name: 'user',
            component: () => import('../views/UserView.vue')
        },

    ]
})

export default router

import Main from '@/pages/Main'
import Street from '@/pages/Street'
import House from '@/pages/House'
import Route from '@/pages/Route'
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/streets',
        component: Street
    },
    {
        path: '/houses',
        component: House
    },
    {
        path: '/routes',
        component: Route
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;
import {createRouter, createWebHistory} from '@ionic/vue-router';
import Auth from './modules/auth'
import TabsPage from '../views/passenger/index'

const routes = [
    ...Auth,
    {
        path: '/',
        component: () => import ('@/views/landing-page/index'),
    },
    {
        path: '/home/',
        component: TabsPage,
        children: [
            {
                path: '',
                redirect: '/home/dash_board'
            },
            {
                path: 'dash_board',
                component: () => import('@/views/passenger/booking')
            },
            {
                path: 'qr',
                component: () => import('@/views/passenger/components/generate_qr')
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router

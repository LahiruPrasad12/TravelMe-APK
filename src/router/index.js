import {createRouter, createWebHistory} from '@ionic/vue-router';
import Auth from './modules/auth'
import SupplierTab from '../views/supplier/index'
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
                component: () => import('@/views/passenger/dashboard/index')
            },
            {
                path: 'qr',
                component: () => import('@/views/passenger/dashboard/generate_qr')
            },
            {
                path: 'staff',
                component: () => import('@/views/admin-dashboard/staff/index')
            },
        ]
    },
    {
        path: '/supplier/',
        component: SupplierTab,
        children: [
            {
                path: 'home',
                component: () => import('@/views/supplier/items/index')
            },
            {
                path: 'request',
                component: () => import('@/views/supplier/request/index')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router

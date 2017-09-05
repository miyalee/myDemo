import Vue from 'vue'
import Router from 'vue-router'
import Header from '@/components/Header'
import Login from '@/components/Login'
import Map from '@/components/Map'
import Management from '@/components/Management'
import Add from '@/components/Add'
import AddShop from '@/components/AddShop'
import SelectShop from '@/components/SelectShop'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/dist',
        component: Header,
        children: [{
            path: '/',
            component: Map
        },
        {
            path: 'add',
            component: Add,
            children: [{
                path: '/',
                component: AddShop
            },
            {
                path: 'select',
                component: SelectShop
            }]
        },
        {
            path: 'man',
            component: Management
        }]
    }]
})



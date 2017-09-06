import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Record from '@/components/Record'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/home',
            name: 'Home',
            component: Home
        },
        {
            path: '/record',
            name: 'Record',
            component: Record
        },
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        }
    ]
})

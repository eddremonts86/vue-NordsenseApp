import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [

        {
            path: '/',
            name: 'login',
            component: () => import('./components/login/login.vue')
        },
        {
            path: '/logout',
            name: 'logout',
            component: () => import('./components/login/logOut.vue')
        },
        {
            path: '/auth/callback',
            name: 'about',
            component: () => import('./components/task/tasksList.vue')
        },
        {
            path: '/tasks_list',
            name: 'Task List',
            component: () => import('./components/task/tasksList.vue')
        },
    ]
})

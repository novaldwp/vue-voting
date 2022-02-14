import { createRouter, createWebHistory } from "vue-router";

import Login from '../views/auth/Login.vue'
import Dashboard from '../views/dashboard/Dashboard.vue'
import Main from '../components/Layouts/Main.vue'
import store from '../store/index'

import CandidateIndex from '../views/candidate/CandidateIndex.vue'
import CandidateCreate from '../views/candidate/CandidateCreate.vue'
import CandidateEdit from '../views/candidate/CandidateEdit.vue'
import CandidateDetail from '../views/candidate/CandidateDetail.vue'

import ElectionIndex from '../views/election/ElectionIndex.vue'
import ElectionCreate from '../views/election/ElectionCreate.vue'
import ElectionEdit from '../views/election/ElectionEdit.vue'
import ElectionDetail from '../views/election/ElectionDetail.vue'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {        
        path: '/',
        name: 'main',
        component: Main,
        children: [
            {
                path: '',
                name: 'dashboard',
                component: Dashboard,
                meta: { requiresAuth: true },
            },
            {
                path: '/candidates',
                name: 'candidates.index',
                component: CandidateIndex,
                meta: { requiresAuth: true },
            },
            {
                path: '/candidates/create',
                name: 'candidates.create',
                component: CandidateCreate,
                meta: { requiresAuth: true },
            },
            {
                path: '/candidates/edit/:id',
                name: 'candidates.edit',
                component: CandidateEdit,
                meta: { requiresAuth: true },
            },
            {
                path: '/candidates/detail/:id',
                name: 'candidates.detail',
                component: CandidateDetail,
                meta: { requiresAuth: true },
            },
            {
                path: '/elections',
                name: 'elections.index',
                component: ElectionIndex,
                meta: { requiresAuth: true },
            },
            {
                path: '/elections/create',
                name: 'elections.create',
                component: ElectionCreate,
                meta: { requiresAuth: true },
            },
            {
                path: '/elections/edit/:id',
                name: 'elections.edit',
                component: ElectionEdit,
                meta: { requiresAuth: true },
            },
            {
                path: '/elections/detail/:id',
                name: 'elections.detail',
                component: ElectionDetail,
                meta: { requiresAuth: true },
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters['auth/isLoggedIn']) {
            next()
        }
        else {
            next({
                name: 'login'
            })
        }
    }
    else {
        next()
    }
})

export default router
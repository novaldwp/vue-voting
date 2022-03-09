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

import RecapitulationIndex from '../views/recapitulation/RecapitulationIndex.vue'
import RecapitulationDetail from '../views/recapitulation/RecapitulationDetail.vue'

import VotingIndex from '../views/voting/VotingIndex.vue'

import ParticipantIndex from '../views/participant/ParticipantIndex.vue'
import ParticipantCreate from '../views/participant/ParticipantCreate.vue'
import ParticipantEdit from '../views/participant/ParticipantEdit.vue'

import UserIndex from '../views/user/UserIndex.vue'
import UserCreate from '../views/user/UserCreate.vue'
import UserEdit from '../views/user/UserEdit.vue'

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
            {
                path: '/recapitulations',
                name: 'recapitulations.index',
                component: RecapitulationIndex,
                meta: { requiresAuth: true },
            },
            {
                path: '/recapitulations/elections/:id',
                name: 'recapitulations.detail',
                component: RecapitulationDetail,
                meta: { requiresAuth: true },
            },
            {
                path: '/votings',
                name: 'votings.index',
                component: VotingIndex,
                meta: { requiresAuth: true },
            },
            {
                path: '/participants',
                name: 'participants.index',
                component: ParticipantIndex,
                meta: { requiresAuth: true },
            },
            {
                path: '/participants/create',
                name: 'participants.create',
                component: ParticipantCreate,
                meta: { requiresAuth: true },
            },
            {
                path: '/participants/edit/:id',
                name: 'participants.edit',
                component: ParticipantEdit,
                meta: { requiresAuth: true },
            },
            {
                path: '/users',
                name: 'users.index',
                component: UserIndex,
                meta: { requiresAuth: true },
            },
            {
                path: '/users/create',
                name: 'users.create',
                component: UserCreate,
                meta: { requiresAuth: true },
            },
            {
                path: '/users/edit/:id',
                name: 'users.edit',
                component: UserEdit,
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
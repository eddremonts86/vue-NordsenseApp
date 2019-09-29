import Vue from 'vue'
import Vuex from 'vuex'
import VueAxios from 'vue-axios'
import { VueAuthenticate } from 'vue-authenticate'
import Axios from "axios";

Vue.use(Vuex)
Vue.use(VueAxios, Axios)
const vueAuth = new VueAuthenticate(Vue.prototype.$http, {
    baseUrl: 'http://localhost:3000',
    tokenName: 'c2feacd02b8611fc89fc3ad3e8cd1e2d6986e2de',
    storageType: 'localStorage',
    providers: {
        github: {
            name: 'github',
            url: '/auth/github',
            authorizationEndpoint: 'https://github.com/login/oauth/authorize',
            redirectUri: 'http://localhost:8080/' ,
            optionalUrlParams: ['scope'],
            scope: ['user:email'],
            scopeDelimiter: ' ',
            oauthType: '2.0',
            popupOptions: { width: 1020, height: 618 }
        },
    }
})

export default new Vuex.Store({
    state: {
        tasks: [],
        users: [],
        githubToken: '',
        baseUrl: 'http://localhost:3000/',
        isAuthenticated: false

    },
    mutations: {
        setTask(state, data) {
            state.tasks = data;
        },
        setUsers(state, data) {
            state.users = data;
        },
        setGithubToken(state, data) {
            state.githubToken = data;
        },
        isAuthenticated(state, payload) {
            state.isAuthenticated = payload.isAuthenticated
        }
    },
    actions: {
        fetchTasks({state, commit}) {
            const urlBase = state.baseUrl + "tasks";
            let data = Axios.get(urlBase).then((response) => {
                commit('setTask', response.data);
            });
            return data
        },
        fetchTasksByID({state}, id) {
            const urlBase = state.baseUrl + "tasks/" + id;
            let data = Axios.get(urlBase);
            return data
        },
        postTasks({state}, dataObj) {
            const urlBase = state.baseUrl + "tasks";
            let data = Axios.post(urlBase, dataObj);
            return data
        },

        putTasks({state}, parameters) {
            const urlBase = state.baseUrl + "tasks/" + parameters.id;
            let data = Axios.put(urlBase, parameters);
            return data
        },
        deleteTasks({state}, id) {
            const urlBase = state.baseUrl + "tasks/" + id;
            let data = Axios.delete(urlBase, id);
            return data
        },
        login(context, payload) {
            vueAuth.login(payload.user, payload.requestOptions).then((response) => {
                context.commit('isAuthenticated', {
                    isAuthenticated: vueAuth.isAuthenticated()
                })
            })


        }
    },
    getters:{
            getTask(state){
                return state.tasks;
            },
            isAuthenticated(){
                return vueAuth.isAuthenticated()
            }
    }
})

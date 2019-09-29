import Vue from 'vue'
import Vuex from 'vuex'
import Axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        tasks: [],
        task: [],
        users: [],
        githubToken: '',
        externalBaseURL: 'https://api.github.com',
        user: "eddremonts86",
        repos: [],
        headers: {
            Authorization: "token c9b827ab6e72e426a95ce6997ca47b51c451cedb",
            "content-type": "application/json",
            'User-Agent': 'eddremonts86',
            Accept: "application/json, " +
                    "text/plain," +
                    "application/vnd.github.symmetra-preview+json"
        }
    },
    mutations: {
        setTasks(state, data) {
            state.tasks = data;
        },
        setTask(state, data) {
            state.task = data;
        },
        setUsers(state, data) {
            state.users = data;
        },
        setGithubToken(state, data) {
            state.githubToken = data;
        },
        setRepos(state, data) {
            state.repos = data;
        },

    },
    actions: {
        fetchTasks({state, commit}, repo) {
            const urlBase = state.externalBaseURL + '/repos/' + state.user + '/' + repo + '/issues?state=all';
            Axios.get(urlBase).then((response) => {
                commit('setTasks', response.data, state.headers);
            });
        },
        async fetchTasksByID({commit, state}, parameters) {
            const urlBase = state.externalBaseURL + '/repos/' + state.user + '/' + parameters.repo + '/issues/' + parameters.id;
            let data = await Axios.get(urlBase, state.headers);
            commit('setTask', data.data);
            return data.data
        },
        postTasks({state}, parameters) {
             const urlBase = state.externalBaseURL + '/repos/' + state.user + '/' + parameters.repo + '/issues';
            return Axios.post(urlBase, parameters.obj, state.headers)

        },
        putTasks({state, commit}, parameters) {
            const urlBase = state.externalBaseURL + '/repos/' + state.user + '/' + parameters.repo + '/issues/' + parameters.id;
            Axios.patch(urlBase).then(() => {
                commit('setTask', parameters.obj, state.headers);
            });
        },
        fetchRepos({state, commit}) {
            const urlBase = state.externalBaseURL + '/users/' + state.user + '/repos';
            Axios.get(urlBase).then((response) => {
                commit('setRepos', response.data, state.headers);
            });
        },
    },
    getters: {
        getTasks(state) {
            return state.tasks;
        },
        getTask(state) {
            return state.task;
        },
        getRepos(state) {
            return state.repos;
        },

    }
})

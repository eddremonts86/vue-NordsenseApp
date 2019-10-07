import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
Vue.use(Vuex);
export const state = {
    tasks: [],
    task: [],
    users: [],
    repos: [],
    externalBaseURL: process.env.VUE_APP_EXTERNAL_BASE_URL,
    user: process.env.VUE_APP_USER,
   headers: {
        Authorization: process.env.VUE_APP_AUTHORIZATION,
        Accept:process.env.VUE_APP_ACCEPT,
        "Content-type": process.env.VUE_APP_CONTENT_TYPE,
    },
    auth: process.env.VUE_APP_AUTH
};
export const getters = {
    getTasks(state) {
        return state.tasks;
    },
    getTask(state) {
        return state.task;
    },
    getRepos(state) {
        return state.repos;
    },
    hasRepos(state) {
        return state.repos.length > 0
    },
    numberOfRepos(state) {
        return state.repos.length
    },
};
export const mutations = {
    setTasks(state, data) {
        state.tasks = data;
    },
    setTask(state, data) {
        state.task = data;
    },
    setRepos(state, data) {
        state.repos = data;
    }
};
export const actions = {
    fetchTasks({state, commit}, parameters) {
        const urlBase =
            state.externalBaseURL +
            "/repos/" +
            state.user +
            "/" +
            parameters.repo +
            "/issues?state=" + parameters.state;
        Axios.get(urlBase).then(response => {
            commit("setTasks", response.data, state.headers);
        });
    },
    async fetchTasksByID({commit, state}, parameters) {
        const urlBase =
            state.externalBaseURL +
            "/repos/" +
            state.user +
            "/" +
            parameters.repo +
            "/issues/" +
            parameters.id;
        let data = await Axios.get(urlBase, state.headers);
        commit("setTask", data.data);
        return data.data;
    },
    postTasks({state}, parameters) {
        const urlBase =
            state.externalBaseURL +
            "/repos/" +
            state.user +
            "/" +
            parameters.repo +
            "/issues?"+state.auth;
        return Axios.post(urlBase, parameters.obj, state.headers);
    },
    patchTasks({state}, parameters) {
        const urlBase =
            state.externalBaseURL +
            "/repos/" +
            state.user +
            "/" +
            parameters.repo +
            "/issues/" +
            parameters.id+'?'+state.auth;
        return Axios.patch(urlBase, parameters.obj, state.headers);
    },
    fetchRepos({state, commit}) {
        let test = process.env
        console.log(test.VUE_APP_EXTERNAL_BASE_URL)

        const urlBase = state.externalBaseURL + "/users/" + state.user + "/repos";
        Axios.get(urlBase).then(response => {
            commit("setRepos", response.data, state.headers);
        });
    }
};
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});

import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
Vue.use(Vuex);
export const state = {
    tasks: [],
    task: [],
    users: [],
    githubToken: "",
    externalBaseURL: "https://api.github.com",
    user: "eddremonts86",
    repos: [],
    headers: {
        Authorization: "token 58a52c8fba9bbaebb5a8dd13a03d58e6200bebc0",
        "Content-type": "application/json",
        "User-Agent": "eddremonts86",
        Accept:
            "application/json, " + "application/vnd.github.symmetra-preview+json"
    },
    auth: "access_token=dcf918dd77a0d68459426901a64241e50815ebfd"
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
    setUsers(state, data) {
        state.users = data;
    },
    setGithubToken(state, data) {
        state.githubToken = data;
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

import Vue from 'vue'
import Vuex from 'vuex'
import Axios from "axios";

Vue.use(Vuex, Axios);

export default new Vuex.Store({
    state: {
        tasks: [],
        users: [],
        githubToken: '',
        baseUrl: 'http://localhost:3000/'
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
    },
    actions: {
        fetchTasks({state,commit}) {
            const urlBase = state.baseUrl + "tasks";
            let data = Axios.get(urlBase).then((response)=>{
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
    },
    getters:{
      getTask(state) {
        return state.tasks;
      },
    }
})

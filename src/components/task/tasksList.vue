<template>
    <v-layout>
        <v-flex>
            <v-card>
                <v-card-title class="primary">
                    <v-spacer></v-spacer>
                    <taskCreator  :parameters="repo"/>
                </v-card-title>
                <v-card-text class="pa-5">
                    <v-layout>
                        <v-flex xs12 md6 class="mx-2">
                            <v-select
                                    :items="getRepos"
                                    @change="reposChanges"
                                    item-text="name"
                                    item-value="name"
                                    label="Repos"
                                    outlined
                                    append-icon="search"
                                    v-model="repo"
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 md6 class="mx-2">
                            <v-text-field
                                    append-icon="search"
                                    hide-details
                                    label="Search"
                                    single-line
                                    v-model="search"
                                    outlined
                            />
                        </v-flex>
                    </v-layout>
                    <v-data-table
                            :headers="headers"
                            :items="getTasks"
                            :search="search"
                            class="elevation-1"
                            item-key="id"
                    >
                        <template v-slot:body="{items}">

                            <tbody :key="item.id" v-for="item in items">
                            <tr :class="item.state">
                                <td class="py-3">
                                    <div class="body-1">{{item.title}}</div>
                                    <div class="caption pl-1">{{item.body}}</div>
                                </td>
                                <td>
                                    <span v-if="item.startTask !== ''">{{dateFormat(item.updated_at)}}</span>
                                    <span v-else><v-btn @click="start(item.id, null, 'general')" icon slot="activator"
                                                        text><v-icon>play_circle_filled</v-icon></v-btn></span>
                                </td>
                                <td>{{item.state}}</td>
                                <td>
                                    <v-btn
                                            @click="edit(item.number)"
                                            icon
                                            slot="activator" text
                                    >
                                        <v-icon>
                                            edit
                                        </v-icon>
                                    </v-btn>
                                    <v-btn

                                            icon
                                            slot="activator" text
                                    >
                                        <v-icon>
                                            delete
                                        </v-icon>
                                    </v-btn>


                                </td>
                            </tr>
                            </tbody>

                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-flex>
        <taskEditor :key="editWindow" :parameters="editParameters"/>
    </v-layout>
</template>

<script>
    import {mapGetters} from 'vuex'
    import taskCreator from "./taskCreator";
    import taskEditor from "./taskEditor";

    export default {
        name: "taskManager",
        components: {taskCreator, taskEditor},
        data() {
            return {
                headers: [
                    {
                        text: 'Issues',
                        align: 'left',
                        sortable: false,
                        value: 'name',
                    },
                    {
                        text: 'Reported ',
                        align: 'left',
                        sortable: false,
                        value: 'startTask',
                    },
                    {
                        text: 'Status',
                        align: 'left',
                        sortable: false,
                        value: 'endTask',
                    },
                    {
                        text: 'Actions',
                        align: 'left',
                        sortable: false,
                    },
                ],
                search: '',
                editParameters: {
                    dialog: false,
                    generalID: '',
                    subTaskID: '',
                    type: '',
                },
                editWindow: 0,
                repo: ''
            }
        },
        created() {
            this.init();
        },
        methods: {
            init: function () {
                this.$store.dispatch("fetchRepos");
            },
            reposChanges() {
                this.$store.dispatch("fetchTasks", this.repo);
            },
            stop(generalTaskID, subTaskID, type) {
                let vue = this;
                if (type == 'general') {
                    this.$store.dispatch("fetchTasksByID", generalTaskID).then((response) => {
                        response.data.endTask = new Date();
                        vue.$store.dispatch("putTasks", response.data)
                            .catch((error) => {
                            })
                            .finally(() => {
                                vue.$store.dispatch("fetchTasks");
                            })
                    })
                } else {

                    this.$store.dispatch("fetchTasksByID", generalTaskID).then((response) => {
                        let task = response.data;
                        for (let i in task.subTasks) {
                            let subTask = task.subTasks[i];
                            if (subTaskID === subTask.id) {
                                subTask.endTask = new Date();
                                break;
                            }
                        }
                        vue.$store.dispatch("putTasks", task).catch((error) => {
                        }).finally(() => {
                            vue.$store.dispatch("fetchTasks");
                        })
                    });
                }
                return true;
            },
            start(generalTaskID, subTaskID, type) {
                let vue = this;
                if (type == 'general') {
                    this.$store.dispatch("fetchTasksByID", generalTaskID).then((response) => {
                        response.data.startTask = new Date();
                        vue.$store.dispatch("putTasks", response.data)
                            .catch((error) => {
                            })
                            .finally(() => {
                                vue.$store.dispatch("fetchTasks");
                            })
                    })
                } else {

                    this.$store.dispatch("fetchTasksByID", generalTaskID).then((response) => {
                        let task = response.data;
                        for (let i in task.subTasks) {
                            let subTask = task.subTasks[i];
                            if (subTaskID === subTask.id) {
                                subTask.startTask = new Date();
                                break;
                            }
                        }
                        vue.$store.dispatch("putTasks", task).catch((error) => {
                        }).finally(() => {
                            vue.$store.dispatch("fetchTasks");
                        })
                    });
                }
                return true;
            },
            delete(generalTaskID, subTaskID, type) {
                let vue = this;
                if (type == 'general') {
                    this.$store.dispatch("fetchTasksByID", generalTaskID).then((response) => {
                        response.data.startTask = new Date();
                        vue.$store.dispatch("putTasks", response.data)
                            .catch((error) => {
                            })
                            .finally(() => {
                                vue.$store.dispatch("fetchTasks");
                            })
                    })
                } else {

                    this.$store.dispatch("fetchTasksByID", generalTaskID).then((response) => {
                        let task = response.data;
                        for (let i in task.subTasks) {
                            let subTask = task.subTasks[i];
                            if (subTaskID === subTask.id) {
                                subTask.startTask = new Date();
                                break;
                            }
                        }
                        vue.$store.dispatch("putTasks", task).catch((error) => {
                        }).finally(() => {
                            vue.$store.dispatch("fetchTasks");
                        })
                    });
                }
                return true;
            },
            edit(generalTaskID) {
                this.editParameters['dialog'] = true;
                this.editParameters['id'] = generalTaskID;
                this.editParameters['repo'] = this.repo;
                 this.editWindow++;
                return true;

            },
            dateFormat(eventDate) {
                let current_datetime = new Date(eventDate);
                let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
                return formatted_date
            },
        },
        computed: {
            ...
                mapGetters([
                    'getTasks', 'getRepos'
                ])
        },
    }
</script>

<style scoped>

</style>
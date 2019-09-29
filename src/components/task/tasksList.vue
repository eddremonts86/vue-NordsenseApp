<template>
    <v-layout>
        <v-flex>
            <v-card>
                <v-card-title class="primary">
                    <v-spacer></v-spacer>
                    <taskCreator/>
                </v-card-title>
                <v-card-text class="pa-5">
                    <v-text-field
                            append-icon="search"
                            hide-details
                            label="Search"
                            single-line
                            v-model="search"
                    />
                    <v-data-table
                            :headers="headers"
                            :items="getTask"
                            :search="search"
                            class="elevation-1"
                            item-key="id"
                            show-select

                    >
                        <template v-slot:body="{items}">

                            <tbody :key="item.id" v-for="item in items">
                            <tr :class="item.status">
                                <td>
                                    <v-checkbox></v-checkbox>
                                </td>
                                <td class="py-3">
                                    <div class="body-1">{{item.name}}</div>
                                    <div class="caption pl-1">{{item.desc}}</div>
                                </td>
                                <td>
                                    <span v-if="item.startTask !== ''">{{dateFormat(item.startTask)}}</span>
                                    <span v-else><v-btn @click="start(item.id, null, 'general')" icon slot="activator"
                                                        text><v-icon>play_circle_filled</v-icon></v-btn></span>
                                </td>
                                <td>
                                    <div v-if="item.startTask !== ''">
                                        <span v-if="item.endTask !== ''">{{dateFormat(item.endTask)}}</span>
                                        <span v-else><v-btn @click="stop(item.id, null, 'general')" icon
                                                            slot="activator"
                                                            text><v-icon>stop</v-icon></v-btn></span>
                                    </div>
                                </td>
                                <td>{{item.fullTime}}</td>
                                <td>
                                    <v-btn
                                            @click="edit(item.id, null, 'general')"
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
                            <tr :class="sub.status" :key="key" v-for="(sub, key) in item.subTasks"
                                v-if="(item.subTasks).length > 0">
                                <td></td>
                                <td class="pl-7 py-3">
                                    <div class="body-1">
                                        <v-icon>subdirectory_arrow_right</v-icon>
                                        {{sub.name}}
                                    </div>
                                    <div class="caption pl-7">{{sub.desc}}</div>
                                </td>
                                <td>
                                    <span v-if="sub.startTask !== ''">{{dateFormat(sub.startTask)}}</span>
                                    <span v-else><v-btn @click="start(item.id, sub.id, 'subTask')" icon slot="activator"
                                                        text><v-icon>play_circle_filled</v-icon></v-btn></span>
                                </td>
                                <td>
                                    <div v-if="sub.startTask !== ''">
                                        <span v-if="sub.endTask !== ''">{{dateFormat(sub.endTask)}}</span>
                                        <span v-else><v-btn @click="stop(item.id, sub.id, 'subTask')" icon
                                                            slot="activator"
                                                            text><v-icon>stop</v-icon></v-btn></span>
                                    </div>
                                </td>
                                <td>{{sub.fullTime}}</td>
                                <td class="text-xl-right">
                                    <v-btn
                                            @click="edit(item.id, sub.id, 'subTask')"
                                            icon
                                            slot="activator" text
                                    >
                                        <v-icon flat>
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
                        text: 'Tasks',
                        align: 'left',
                        sortable: false,
                        value: 'name',
                    },
                    {
                        text: 'Start Task',
                        align: 'left',
                        sortable: false,
                        value: 'startTask',
                    },
                    {
                        text: 'End Task',
                        align: 'left',
                        sortable: false,
                        value: 'endTask',
                    },
                    {
                        text: 'Full Time',
                        align: 'left',
                        sortable: false,
                        value: 'fullTime',
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
                editWindow: 0
            }
        },
        created() {
            this.init();
        },
        methods: {
            init: function () {
                this.$store.dispatch("fetchTasks");
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
            edit(generalTaskID, subtaskID, type) {
                this.editParameters['dialog'] = true;
                this.editParameters['generalID'] = generalTaskID;
                this.editParameters['subTaskID'] = subtaskID;
                this.editParameters['type'] = type;
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
                    'getTask'
                ])
        }
        ,
    }
</script>

<style scoped>

</style>
<template>
    <v-layout>
        <v-flex>
            <v-card>
                <v-card-title class="primary">
                    <v-spacer></v-spacer>
                    <taskCreator/>
                </v-card-title>

                <v-card-text class="pa-5">
                    <v-data-table
                            :headers="headers"
                            :items="tasksArary"
                            class="elevation-1"
                            item-key="id"
                            show-select
                            v-model="selected"
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
                                    <span v-if="item.startTask !== ''">{{item.startTask}}</span>
                                    <span v-else><v-btn icon slot="activator"
                                                        text><v-icon>play_circle_filled</v-icon></v-btn></span>
                                </td>
                                <td>
                                    <div v-if="item.startTask !== ''">
                                        <span v-if="item.endTask !== ''">{{item.endTask}}</span>
                                        <span v-else><v-btn icon slot="activator"
                                                            text><v-icon>stop</v-icon></v-btn></span>
                                    </div>
                                </td>
                                <td>{{item.fullTime}}</td>
                                <td>
                                    <v-btn
                                            icon
                                            slot="activator" text
                                    >
                                        <v-icon>
                                            add
                                        </v-icon>
                                    </v-btn>
                                    <v-btn

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
                                    <span v-if="sub.startTask !== ''">{{sub.startTask}}</span>
                                    <span v-else><v-btn icon slot="activator"
                                                        text><v-icon>play_circle_filled</v-icon></v-btn></span>
                                </td>
                                <td>
                                    <div v-if="sub.startTask !== ''">
                                        <span v-if="sub.endTask !== ''">{{sub.endTask}}</span>
                                        <span v-else><v-btn icon slot="activator"
                                                            text><v-icon>stop</v-icon></v-btn></span>
                                    </div>
                                </td>
                                <td>{{sub.fullTime}}</td>
                                <td class="text-xl-right">
                                    <v-btn
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
    </v-layout>
</template>

<script>
    import taskCreator from "./taskCreator";

    export default {
        name: "taskManager",
        components: {taskCreator},
        data() {
            return {
                selected: [],
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
                tasksArary: [
                    {
                        name: 'Primera Task',
                        desc: 'The URL in your application where users will be sent after authorization. See details below about redirect urls.',
                        startTask: '10-01-2017',
                        endTask: '',
                        fullTime: '25 days',
                        status: 'done',
                        place:'',
                        guests:[],
                        parent:'',
                        subTasks: [
                            {
                                name: 'Sub - Segunda Task',
                                desc: 'The URL in your application where users will be sent after authorization. See details below about redirect urls.',
                                id: '1',
                                startTask: '1-01-2017',
                                endTask: '',
                                fullTime: '2 days',
                                status: 'done',
                                place:'',
                                guests:[],
                                parent:'',
                            }, {
                                name: 'Sub - Tercera Task',
                                desc: 'The URL in your application where users will be sent after authorization. See details below about redirect urls.',
                                id: '2',
                                startTask: '',
                                endTask: '',
                                fullTime: '15 days',
                                status: 'done',
                                place:'',
                                guests:[],
                                parent:'',
                            }
                        ],
                        id: '0',
                    },
                    {
                        name: 'Primera Task',
                        desc: 'The URL in your application where users will be sent after authorization. See details below about redirect urls.',
                        startTask: '10-01-2017',
                        endTask: '05-02-2017',
                        fullTime: '25 days',
                        status: 'open',
                        place:'',
                        guests:[],
                        parent:'',
                        subTasks: [
                            {
                                name: 'Sub - Segunda Task',
                                desc: 'The URL in your application where users will be sent after authorization. See details below about redirect urls.',
                                id: '1',
                                startTask: '1-01-2017',
                                endTask: '05-05-2017',
                                fullTime: '2 days',
                                status: 'done',
                                place:'',
                                guests:[],
                                parent:'',
                            }, {
                                name: 'Sub - Tercera Task',
                                desc: 'The URL in your application where users will be sent after authorization. See details below about redirect urls.',
                                id: '2',
                                startTask: '15-01-2017',
                                endTask: '25-02-2017',
                                fullTime: '15 days',
                                status: 'open',
                                place:'',
                                guests:[],
                                parent:'',
                            }
                        ],
                        id: '1',
                    },
                    {
                        name: 'Primera Task',
                        desc: 'The URL in your application where users will be sent after authorization. See details below about redirect urls.',
                        startTask: '10-01-2017',
                        endTask: '05-02-2017',
                        fullTime: '25 days',
                        status: 'canceled',
                        place:'',
                        guests:[],
                        parent:'',
                        subTasks: [
                            {
                                name: 'Sub - Segunda Task',
                                desc: 'The URL in your application where users will be sent after authorization. See details below about redirect urls.',
                                id: '1',
                                startTask: '1-01-2017',
                                endTask: '05-05-2017',
                                fullTime: '2 days',
                                status: 'canceled',
                                place:'',
                                guests:[],
                                parent:'',
                            }, {
                                name: 'Sub - Tercera Task',
                                desc: 'The URL in your application where users will be sent after authorization. See details below about redirect urls.',
                                id: '2',
                                startTask: '15-01-2017',
                                endTask: '25-02-2017',
                                fullTime: '15 days',
                                status: 'canceled',
                                place:'',
                                guests:[],
                                parent:'',
                            }
                        ],
                        id: '2',
                    },
                    {
                        name: 'Primera Task',
                        desc: 'The URL in your application where users will be sent after authorization. See details below about redirect urls.',
                        startTask: '10-01-2017',
                        endTask: '05-02-2017',
                        fullTime: '25 days',
                        status: 'canceled',
                        subTasks: [
                            {
                                name: 'Sub - Segunda Task',
                                desc: 'The URL in your application where users will be sent after authorization. See details below about redirect urls.',
                                id: '1',
                                startTask: '1-01-2017',
                                endTask: '05-05-2017',
                                fullTime: '2 days',
                                status: 'canceled',
                                place:'',
                                guests:[],
                                parent:'',
                            }, {
                                name: 'Sub - Tercera Task',
                                desc: 'The URL in your application where users will be sent after authorization. See details below about redirect urls.',
                                id: '2',
                                startTask: '15-01-2017',
                                endTask: '25-02-2017',
                                fullTime: '15 days',
                                status: 'canceled',
                                place:'',
                                guests:[],
                                parent:'',
                            }
                        ],
                        id: '2',
                        place:'',
                        guests:[],
                        parent:'',
                    },
                    {
                        name: 'Primera Task',
                        desc: 'The URL in your application where users will be sent after authorization. See details below about redirect urls.',
                        startTask: '',
                        endTask: '',
                        fullTime: '',
                        status: '',
                        subTasks: [
                            {
                                name: 'Sub - Segunda Task',
                                desc: 'The URL in your application where users will be sent after authorization. See details below about redirect urls.',
                                id: '1',
                                startTask: '',
                                endTask: '',
                                fullTime: '',
                                status: '',
                                place:'',
                                guests:[],
                                parent:'',
                            }, {
                                name: 'Sub - Tercera Task',
                                desc: 'The URL in your application where users will be sent after authorization. See details below about redirect urls.',
                                id: '2',
                                startTask: '',
                                endTask: '',
                                fullTime: '',
                                place:'',
                                guests:[],
                                parent:'',
                                status: ' ',
                            }
                        ],
                        id: '2',
                    }
                ],
                taskItems: [],
                dialog: false,
                editedIndex: -1,

            }
        },
        methods: {
            close() {
                this.dialog = false;
                setTimeout(() => {
                    this.taskItems = Object.assign({}, {});
                    this.editedIndex = -1;
                }, 500)
            },

            save() {
                this.taskItems['id'] = this.tasksArary.length;
                if (this.editedIndex > -1) {
                    Object.assign(this.tasksArary[this.taskItems], this.taskItems)
                } else {
                    this.tasksArary.push(this.taskItems)
                }
                this.close()
            },
        }
    }
</script>

<style scoped>

</style>
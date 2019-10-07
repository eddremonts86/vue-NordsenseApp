<template>
    <v-layout>
        <v-flex>
            <v-card>
                <v-card-title class="_panel_border_bottom">
                    <v-spacer>Issues List</v-spacer>
                    <taskCreator :parameters="repo"/>
                </v-card-title>
                <v-card-text class="pa-5">
                    <v-layout wrap>
                        <v-flex class="px-2 my-3" md6 xs12>
                            <v-select
                                    :items="getRepos"
                                    @change="reposChanges"
                                    append-icon="search"
                                    item-text="name"
                                    item-value="name"
                                    label="Repository List"
                                    outlined
                                    v-model="repo"
                            ></v-select>
                        </v-flex>
                        <v-flex class="px-2 my-3" md6 v-show="repo" xs12>
                            <v-text-field
                                    append-icon="search"
                                    hide-details
                                    label="Search by issues"
                                    outlined
                                    single-line
                                    v-model="search"
                            />
                        </v-flex>

                    </v-layout>

                    <v-card class="grey darken-4 radio5" v-show="repo">
                        <v-card-actions>
                            <v-flex class="px-2" md6 xs12>
                                <v-layout>
                                    <v-flex md4 xs12>
                                        <v-switch
                                                @click="getIssuse('all')"
                                                color="blue darken-4"
                                                label="All Issues "
                                                v-model="all"
                                                value="All Issues "
                                        >
                                        </v-switch>
                                    </v-flex>
                                    <v-flex md4 xs12>
                                        <v-switch
                                                @click="getIssuse('open')"
                                                color="blue darken-4"
                                                label="Opened Issues "
                                                v-model="opened"
                                                value="Opened Issues "
                                        >
                                        </v-switch>
                                    </v-flex>
                                    <v-flex md4 xs12>
                                        <v-switch
                                                @click="getIssuse('closed')"
                                                color="blue darken-4"
                                                label="Closed Issues "
                                                v-model="closed"
                                                value="Closed Issues "
                                        >
                                        </v-switch>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-card-actions>
                        <v-card-text>
                            <v-data-table
                                    :headers="headers"
                                    :items="getTasks"
                                    :search="search"
                                    class="elevation-1 radio5"
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
                                            <span v-else><v-btn @click="start(item.id, null, 'general')" icon
                                                                slot="activator"
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
                                        </td>
                                    </tr>
                                    </tbody>
                                </template>
                            </v-data-table>
                        </v-card-text>
                    </v-card>
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
                        value: 'title',
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
                        value: 'state',
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
                repo: '',
                all: false,
                opened: false,
                closed: false,
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
                let vue = this;
                let parameters = {
                    repo: this.repo,
                    state: 'open'
                };
                this.$store.dispatch("fetchTasks", parameters).catch((error) => {
                    vue.$swal({
                        title: 'Problem with fetching issues',
                        text: error,
                        type: 'error',
                    });
                });
            },
            stop(generalTaskID, subTaskID, type) {
                let vue = this;
                if (type == 'general') {
                    this.$store.dispatch("fetchTasksByID", generalTaskID).then((response) => {
                        response.data.endTask = new Date();
                        vue.$store.dispatch("putTasks", response.data)
                            .catch((error) => {
                                vue.$swal({
                                    title: 'Problem with creating the account',
                                    text: error,
                                    type: 'error',
                                });
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
                            vue.$swal({
                                title: 'Problem with creating the account',
                                text: error,
                                type: 'error',
                            });
                        }).finally(() => {
                            vue.$store.dispatch("fetchTasks");
                        })
                    });
                }
                return true;
            },

            edit(number) {
                this.editParameters['dialog'] = true;
                this.editParameters['id'] = number;
                this.editParameters['repo'] = this.repo;
                this.editWindow++;
                return true;
            },
            dateFormat(eventDate) {
                let current_datetime = new Date(eventDate);
                let formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
                return formatted_date
            },
            getIssuse(state) {
                let vue = this;
                if (!this.opened && !this.closed && !this.all) {
                    this.reposChanges()
                } else {
                    let parameters = {
                        repo: this.repo,
                        state: state
                    };
                    this.$store.dispatch("fetchTasks", parameters).catch((error) => {
                        vue.$swal({
                            title: 'Problem with fetching issues',
                            text: error,
                            type: 'error',
                        });
                    });
                    this.shiwtcherCase(state)
                }
                return true
            },
            shiwtcherCase(state) {
                switch (state) {
                    case 'all' :
                        this.opened = false;
                        this.closed = false;
                        break;
                    case 'closed' :
                        this.all = false;
                        this.opened = false;
                        break;
                    case 'open' :
                        this.all = false;
                        this.closed = false;
                        break;
                }
                return true
            }
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
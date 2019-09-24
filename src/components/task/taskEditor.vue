<template>
    <v-dialog max-width="60%" v-model="parameters['dialog']">
        <v-card>
            <v-card-title class="primary">
                <span class="headline">Create a new Task</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex class="xs12 md6">
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field label="Name" outlined v-model="taskItems['name']"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Place" outlined v-model="taskItems['place']"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-select :items="getTask" item-text="name" item-value="id" label="Parents"
                                              outlined
                                              v-model="taskItems['parents']">Parent Tasks
                                    </v-select>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex class="xs12 md6">
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-textarea label="Task Description" outlined
                                                v-model="taskItems['desc']"></v-textarea>
                                </v-flex>
                                <v-flex class="grey darken-2 pa-4 radio5 mt-1 mx-1" xs12>
                                    <v-layout wrap>
                                        <v-flex class="xs9">
                                            <v-text-field :rules="emailRules" label="Email task guests" outlined

                                                          v-model="taskItems['guest']"></v-text-field>
                                        </v-flex>
                                        <v-flex class="xs2">
                                            <v-btn @click="guests.push(taskItems['guest'])">
                                                <v-icon>add</v-icon>
                                            </v-btn>
                                        </v-flex>
                                        <v-flex class="xs12 px-4" v-show="guests && guests.length > 0">
                                            <div :key="key" class="guest" v-for="(guest , key) in guests">
                                                {{guest}}
                                            </div>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions class="grey darken-4">
                <v-btn @click="save(false)" class="primary" text>Create and closeWindow</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="close" class="error" text>Cancel</v-btn>
                <v-btn @click="save(true)" class="primary" text>Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "taskEditor",
        data() {
            return {
                taskItems: [],
                guests: [],
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid',
                ],
                taskObject: {}
            }
        },
        props: ['parameters'],
        methods: {
            init() {
                let vue = this;
                if (vue.parameters['dialog']) {
                    vue.$store.dispatch("fetchTasksByID", vue.parameters['generalID']).then((response) => {
                        this.taskObject = response.data;
                        if (vue.parameters['type'] == 'general') {
                            vue.taskItems.name = response.data.name;
                            vue.taskItems.desc = response.data.desc;
                            vue.taskItems.place = response.data.place;
                            vue.taskItems.parents = response.data.parent;
                            vue.taskItems.enabled = response.data.enabled;
                            vue.taskItems.startTask = response.data.startTask;
                            vue.taskItems.endTask = response.data.endTask;
                            vue.taskItems.status = response.data.status;
                            vue.guests = response.data.guests
                        } else {
                            let subTask = (response.data.subTasks).filter(id => id === vue.parameters['subTaskID']);
                            console.log(subTask)
                            vue.taskItems.name = subTask.name;
                            vue.taskItems.desc = subTask.desc;
                            vue.taskItems.place = subTask.place;
                            vue.taskItems.parents = subTask.parent;
                            vue.taskItems.enabled = subTask.enabled;
                            vue.taskItems.startTask = subTask.startTask;
                            vue.taskItems.endTask = subTask.endTask;
                            vue.guests = subTask.guests
                        }
                    })
                }
            },
            close(closeWindow) {
                setTimeout(() => {
                    this.taskItems = Object.assign({}, {});
                    this.guests = [];
                    if (closeWindow)
                        this.parameters['dialog'] = false;
                }, 300)
            },
            save(closeWindow) {
                let vue = this;
                let newTask = {
                    "name": this.taskItems.name,
                    "desc": this.taskItems.desc,
                    "id": Math.random(),
                    "startTask": "",
                    "endTask": "",
                    "fullTime": "",
                    "status": "",
                    "place": this.taskItems.place,
                    "guests": this.guests,
                    "parent": this.taskItems.parents,
                    "enabled": true
                };

                this.$store.dispatch("fetchTasksByID", this.parameters['generalID']).then((response) => {
                    let task = response.data;
                    task.subTasks.push(newTask);
                    vue.$store.dispatch("putTasks", task).catch((error) => {
                    }).finally(() => {
                        vue.$store.dispatch("fetchTasks");
                        vue.close(closeWindow)
                    })
                });


                return true;
            },
        },
        computed: {
            ...mapGetters([
                'getTask'
            ])
        },
        created() {
            this.init()
        }
    }
</script>

<style scoped>

</style>
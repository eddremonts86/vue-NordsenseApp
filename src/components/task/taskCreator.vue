<template>
    <v-dialog max-width="60%" v-model="dialog">
        <template v-slot:activator="{ on }">
            <v-btn class="mb-2" color="primary" dark fab slot="activator" v-on="on">
                <v-icon dark> add</v-icon>
            </v-btn>

        </template>
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
                                        <v-flex class="xs12 px-4" v-show="guests.length > 0">
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
        name: "taskCreator",
        data() {
            return {
                dialog: false,
                taskItems: [],
                guests: [],
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid',
                ],
            }
        },
        methods: {
            close(closeWindow) {
                setTimeout(() => {
                    this.taskItems = Object.assign({}, {});
                    this.guests = []
                    if (closeWindow)
                        this.dialog = false;
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
                    "enabled": true,
                 };
                if (this.taskItems.parents) {
                    this.$store.dispatch("fetchTasksByID", this.taskItems.parents).then((response) => {
                        let task = response.data;
                        if(!task["subTasks"]){task["subTasks"] = []}
                        task.subTasks.push(newTask);
                        vue.$store.dispatch("putTasks", task).catch((error) => {
                        }).finally(() => {
                            vue.$store.dispatch("fetchTasks");
                            vue.close(closeWindow)
                        })
                    })

                } else {
                    this.$store.dispatch("postTasks", newTask).catch((error) => {
                    }).finally(() => {
                        vue.$store.dispatch("fetchTasks");
                        vue.close(closeWindow)
                    })
                }
                return true;
            },
        },
        computed: {
            ...mapGetters([
                'getTask'
            ])
        },
    }
</script>

<style scoped>

</style>
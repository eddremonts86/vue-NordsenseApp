<template>
    <v-dialog :key="reloadDom" max-width="60%" v-model="parameters['dialog']">
        <v-card>
            <v-card-title class="primary">
                <span class="headline">Create a new Task</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex class="xs12 md6 pt-4">
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field label="Name" outlined v-model="taskItems['name']"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-textarea label="Task Description" outlined
                                                v-model="taskItems['desc']"></v-textarea>
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
        name: "taskEditor",
        data() {
            return {
                taskItems: [],
                taskObject: {},
                reloadDom: 0
            }
        },
        props: ['parameters'],
        methods: {
            init() {
                let vue = this;
                if (vue.parameters['dialog']) {
                    vue.$store.dispatch("fetchTasksByID", vue.parameters).then((response) => {
                        this.taskItems['name'] = response.title;
                        this.taskItems['desc'] = response.body;
                        this.reload()
                    }, this)
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
            save() {
                let newTask =
                    {
                        'repo': this.parameters.repo,
                        'id': this.parameters.id,
                        'obj': {
                            "title": this.taskItems.name,
                            "body": this.taskItems.desc,
                            "state": "open",
                            "labels": ["bug"]
                        }
                    };
                this.$store.dispatch("putTasks", newTask).then(this.close(true))
            },
            reload() {
                this.reloadDom++
            }
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
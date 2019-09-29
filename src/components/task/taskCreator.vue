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
                            </v-layout>
                        </v-flex>
                        <v-flex class="xs12 md6">
                            <v-layout wrap>
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
        name: "taskCreator",
        props: ['parameters'],
        data() {
            return {
                dialog: false,
                taskItems: [],
            }
        },
        methods: {
            close(closeWindow) {
                setTimeout(() => {
                    this.taskItems = Object.assign({}, {});
                    this.guests = [];
                    if (closeWindow)
                        this.dialog = false;
                }, 300)
            },
            save() {
                let newTask =
                    {
                        'repo': this.parameters,
                        'obj': {
                            "title": this.taskItems.name,
                            "body": this.taskItems.desc,
                            "assignees": [
                                this.$store.state.user
                            ],
                            "milestone": 1,
                            "labels": [
                                "bug"
                            ]
                        }
                    };
                this.$store.dispatch("postTasks", newTask).then(this.close(true));
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
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
                                    <v-select outlined v-model="taskItems['parents']" label="Parents">Parent Tasks</v-select>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex class="xs12 md6">
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-textarea label="Task Description" outlined
                                                v-model="taskItems['desc']"></v-textarea>
                                </v-flex>
                                <v-flex xs12 class="grey darken-2 pa-4 radio5 mt-1 mx-1">
                                    <v-layout wrap>
                                        <v-flex class="xs9">
                                            <v-text-field label="Email task guests" outlined  :rules="emailRules"

                                                          v-model="taskItems['guest']"></v-text-field>
                                        </v-flex>
                                        <v-flex class="xs2">
                                            <v-btn @click="guests.push(taskItems['guest'])">
                                                <v-icon>add</v-icon>
                                            </v-btn>
                                        </v-flex>
                                        <v-flex class="xs12 px-4" v-show="guests.length > 0">
                                            <div v-for="(guest , key) in guests"  :key="key" class="guest">
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
                <v-btn @click="close" class="primary" text>Create and continue</v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="close" class="error" text>Cancel</v-btn>
                <v-btn @click="save" class="primary" text>Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "taskCreator",
        data() {
            return {
                dialog: false,
                editedIndex: -1,
                taskItems: [],
                guests:[],
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid',
                ],
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
<template>
    <v-layout>
        <v-flex>
            <v-card>
                <v-card-title class="primary">Task Manager
                    <v-spacer></v-spacer>
                    <v-dialog max-width="500px" v-model="dialog">
                        <template v-slot:activator="{ on }">
                            <v-btn class="mb-2" color="primary" dark v-on="on">New Task</v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">Create a new Task</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                        <v-flex xs12>
                                            <v-text-field label="Task name" v-model="taskItems['name']"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-textarea label="Task Description"
                                                        v-model="taskItems['desc']"></v-textarea>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn @click="close" color="blue darken-1" text>Cancel</v-btn>
                                <v-btn @click="save" color="blue darken-1" text>Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>


                </v-card-title>

                <v-card-text class="pa-5">
                    <v-data-table
                            :headers="headers"
                            :items="desserts"
                            class="elevation-1"
                            item-key="id"
                            show-select
                            v-model="selected"
                    >
                        <template v-slot:top>
                        </template>
                    </v-data-table>


                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "taskManager",
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
                ],
                desserts: [
                    {
                        name: 'Primera Task',
                        desc: 'Primera Task',
                        id: '0',
                    }, {
                        name: 'Segunda Task',
                        desc: 'Segunda Task',
                        id: '1',
                    }, {
                        name: 'Tercera Task',
                        desc: 'Tercera Task',
                        id: '2',
                    }, {
                        name: 'Cuarta Task',
                        desc: 'Cuarta Task',
                        id: '3',
                    }, {
                        name: 'Quinta Task',
                        desc: 'Quinta Task',
                        id: '4',
                    }, {
                        name: 'Sexta Task',
                        desc: 'Sexta Task',
                        id: '5',
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
                    console.log(this.desserts)
                }, 500)
            },

            save() {
                this.taskItems['id'] = this.desserts.length;
                if (this.editedIndex > -1) {
                    Object.assign(this.desserts[this.taskItems], this.taskItems)
                } else {
                    this.desserts.push(this.taskItems)
                }
                this.close()
            },
        }
    }
</script>

<style scoped>

</style>
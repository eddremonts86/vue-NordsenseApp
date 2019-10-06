<template>
    <v-dialog max-width="50%" v-model="dialog">
        <template v-slot:activator="{ on }">
            <v-btn class="mb-2 btn_primary" dark fab slot="activator" v-on="on">
                <v-icon dark> add</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title class="_panel_border_bottom">
                <span class="headline">Create a new Task</span>
            </v-card-title>
            <v-card-text class="pt-5">
                <v-flex xs12>
                    <v-text-field label="Name" outlined v-model="taskItems['name']"></v-text-field>
                    <v-textarea label="Task Description" outlined v-model="taskItems['desc']"></v-textarea>
                    <v-select
                            :items="getRepos"
                            @change="reposChanges"
                            append-icon="search"
                            item-text="name"
                            item-value="name"
                            label="Repository List"
                            outlined
                            v-model="taskItems['repo']"
                    ></v-select>
                    <v-text-field label="Label" outlined v-model="taskItems['label']"></v-text-field>
                </v-flex>
            </v-card-text>
            <v-card-actions class="grey darken-4">
                <v-spacer></v-spacer>
                <v-btn @click="save(true)" class="btn_primary" text>Save</v-btn>
                <v-btn @click="close" class="error" text>Cancel</v-btn>
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
                repo: ''
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
            reposChanges() {
                let vue = this
                this.$store.dispatch("fetchTasks", this.repo).catch((error)=>{
                    vue.$swal({
                        title: 'Some problem fetching the data',
                        text: error,
                        type: 'error',
                    });
                })
            },
            save() {
                let vue = this
                let newTask =
                    {
                        'repo': this.taskItems.repo ? this.taskItems.repo : this.parameters,
                        'obj': {
                            "title": this.taskItems.name,
                            "body": this.taskItems.desc,
                            "assignees": [
                                this.$store.state.user
                            ],
                            "labels": [
                                this.taskItems.label
                            ]
                        }
                    };
                this.$store.dispatch("postTasks", newTask)
                    .then(() =>{
                        this.close(true);
                        vue.$swal({
                            title: 'Success!',
                            type: 'success',
                        });
                    })
                    .catch((error) => {
                    vue.$swal({
                        title: 'Problem with creating the task issues',
                        text: error,
                        type: 'error',
                    });
                });
                return true;
            },
        },
        computed: {
            ...mapGetters([
                'getTask', 'getRepos'
            ])
        },
    }
</script>

<style scoped>

</style>
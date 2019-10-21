<template>
  <v-dialog :key="reloadDom" max-width="60%" v-model="parameters['dialog']">
    <v-card>
      <v-card-title class="_panel_border_bottom">
        <span class="headline">Edit Task</span>
      </v-card-title>
      <v-card-text>
        <v-layout wrap>
          <v-flex class="xs12 pt-4">
            <v-text-field
              label="Name"
              outlined
              v-model="taskItems['name']"
            ></v-text-field>
            <v-textarea
              label="Task Description"
              outlined
              v-model="taskItems['desc']"
            ></v-textarea>
            <v-select
              :items="state"
              label="Task State"
              outlined
              v-model="taskItems['state']"
            ></v-select>
          </v-flex>
        </v-layout>
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
import { mapGetters } from 'vuex'

export default {
  name: 'taskEditor',
  data() {
    return {
      taskItems: [],
      taskObject: {},
      reloadDom: 0,
      state: ['open', 'closed'],
    }
  },
  props: ['parameters'],
  methods: {
    init() {
      let vue = this
      if (vue.parameters['dialog']) {
        vue.$store
          .dispatch('fetchTasksByID', vue.parameters)
          .then(response => {
            this.taskItems['name'] = response.title
            this.taskItems['desc'] = response.body
            this.reload()
          }, this)
          .catch(error => {
            vue.$swal({
              title: 'Problem with fetching the issues',
              text: error,
              type: 'error',
            })
          })
      }
    },
    close(closeWindow) {
      setTimeout(() => {
        this.taskItems = Object.assign({}, {})
        this.guests = []
        if (closeWindow) this.parameters['dialog'] = false
      }, 300)
    },
    save() {
      let newTask = {
        repo: this.parameters.repo,
        id: this.parameters.id,
        obj: {
          title: this.taskItems.name,
          body: this.taskItems.desc,
          state: this.taskItems.state,
        },
      }
      let vue = this
      this.$store
        .dispatch('patchTasks', newTask)
        .then(() => {
          this.close(true)
          vue.$swal({
            title: 'Success!',
            type: 'success',
          })
        })
        .catch(error => {
          vue.$swal({
            title: 'Problem with creating issues',
            text: error,
            type: 'error',
          })
        })
    },
    reload() {
      this.reloadDom++
    },
  },
  computed: {
    ...mapGetters(['getTask']),
  },
  created() {
    this.init()
  },
}
</script>

<style scoped></style>

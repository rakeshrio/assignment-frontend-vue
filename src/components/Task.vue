<template>
  <div>
    <h1 style="align-items: center">Task</h1>
    <div style="display: flex; justify-content: space-between; margin: 10px">
      <h2><button>ADD+</button></h2>
      <h2>
        <input v-model="search" type="search" placeholder="Search anything.." />
      </h2>
    </div>
    <div>
      <input type="text" placeholder="name" v-model="name" />
      <input type="text" placeholder="description" v-model="description" />
      <button @click="addTask">Submit</button>
    </div>
    <div style="display: flex">
      <div class="column" v-for="(data, index) in task" :key="index">
        <div class="card">
          <h2>{{ data.name }}</h2>
          <p>{{ data.description }}</p>
          <div style="display: flex; justify-content: space-between">
            <button @click="editToggler(true, data)">edit</button>
            <button @click="deletetodo(data._id)">delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      limit: 10,
      name: '',
      description: "",
      label: [],
      projectId: ''
    };
  },
  computed: {
    task() {
      return this.$store.state.task;
    },
  },
  watch :{
      search() {
          this.loadData()
      },
      limit () {
          this.loadData()
      },
      payload () {
          this.loadData()
      }
  },
  methods: {
    addTask(){
    var obj =
    {
      name:this.name,
      description:this.description,
      project: this.projectId
    }
      this.$store.dispatch('add_task', obj)
    },
    deletetask(id){
       this.$store.dispatch('delete_task', {id:id})
    },
    loadData() {
        this.$store.dispatch("get_task", { id: this.projectId, limit: this.limit, offset: 0, search: this.search });
    }
  },
  created() {
    this.projectId = this.$route.params.id
    this.loadData()
  },
};
</script>

<style scoped>
</style>
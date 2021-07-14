<template>
  <div class="col-11 m-auto" style="height:1000px">

    <div class="d-flex col-12 justify-content-between">
      <h1 style="align-items: center">Task List</h1>
      <h2><button class="add-btn" @click="openModal(true)">ADD+</button></h2>
    </div>


    <div class="col-2  hand card" style="margin:auto; margin-bottom:25px" v-if="open">
      <div style="display:flex;justify-content:space-between">
        <p>Add Task:</p>
        <p @click="openModal(false)" ><i class="fa fa-times" aria-hidden="true"></i></p>
      </div>
      <div class="mb-3">
        <input type="text" v-model="name" placeholder="Task Name" />
      </div>
      <div class="mb-3">
        <input type="text" v-model="description" placeholder="description" />
      </div>
      <button @click="addTask">Submit</button>
    </div>


    <div class="d-flex m-auto justify-content-between col-8">
      <div>
        <input v-model="search" type="search" placeholder="Search anything.." />
      </div>
      <div>
        <select v-model="sort" name="" id="">
          <option
            v-for="(data, index) in options"
            :key="index"
            :value="data.value"
          >
            {{ data.name }}
          </option>
        </select>
      </div>
      <div>
        <select v-model="limit" name="" id="">
          <option
            v-for="(data, index) in optionsLimit"
            :key="index"
            :value="data.value"
          >
            {{ data.name }}
          </option>
        </select>
      </div>
    </div>



    <div v-if="!loading && task.length == 0">
        <p>No Task Found</p>
    </div>

    <div class="grid-container"  >
        <div class=" col-10" v-for="(data, index) in task" :key="index">
          <p style="background:">{{ data.name }}</p>
          <p>{{ data.description }}</p>
            <button @click="editToggler(true, data)">edit</button>
            <button @click="deletetodo(data._id)">delete</button>
        </div>
    </div>





  </div>
</template>

<script>
export default {
  data() {
    return {
      open:false,
      sort: { name: 1 },
      options: [
        {
          name: "Name Ascending",
          value: {
            name: 1,
          },
        },
        {
          name: "Name Descending",
          value: {
            name: -1,
          },
        },
      ],
      optionsLimit: [
        {
          name: "10",
          value: 10,
        },
        {
          name: "20",
          value: 20,
        },
      ],
      search: "",
      limit: 10,
      name: "",
      description: "",
      label: [],
      projectId: "",
    };
  },
  computed: {
    task() {
      return this.$store.state.task || []
    },
    loading() {
      return this.$store.state.makingAPIcalls;
    }
  },
  watch: {
    search() {
      this.loadData();
    },
    limit() {
      this.loadData();
    },
    payload() {
      this.loadData();
    },
    sort() {
      this.loadData();
    },
  },
  methods: {
    openModal(state) {
      this.open = state;
    },
    addTask() {
      var obj = {
        name: this.name,
        description: this.description,
        project: this.projectId,
      };
      this.$store.dispatch("add_task", obj);
    },
    deletetask(id) {
      this.$store.dispatch("delete_task", { id: id });
    },
    loadData() {
      this.$store.dispatch("get_task", {
        id: this.projectId,
        sort: this.sort,
        limit: this.limit,
        offset: 0,
        search: this.search,
      });
    },
  },
  created() {
    this.projectId = this.$route.params.id;
    this.loadData();
  },
};
</script>



<style scoped>
/* Float four columns side by side */
.col-1 {width: 8.33%;}
.col-2 {width: 16.66%;}
.col-3 {width: 25%;}
.col-4 {width: 33.33%;}
.col-5 {width: 41.66%;}
.col-6 {width: 50%;}
.col-7 {width: 58.33%;}
.col-8 {width: 66.66%;}
.col-9 {width: 75%;}
.col-10 {width: 83.33%;}
.col-11 {width: 91.66%;}
.col-12 {width: 100%;}

.column {
  width: 25%;
  padding: 0 10px;
}
.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 10px;
  /* background-color: #2196F3; */
  padding: 10px;

}
 .hand{
   cursor: pointer;
 }
 .d-flex{
   display: flex;
 }
.grid-container > div {
  /* background-color: rgba(255, 255, 255, 0.8); */
  border: 1px solid black;
  text-align: center;
  padding: 20px 0;

}


.mb-3{
  margin-bottom:15px
}
.m-auto{
  margin:auto
}
.m-0{
  margin:0
}
.p-0{
  padding: 0;
}
.cards {
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
}
.justify-content-between{
  justify-content: space-between;
}
/* Remove extra left and right margins, due to padding in columns */
.row {
  margin: 0 -5px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Style the counter cards */
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* this adds the "card" effect */
  padding: 16px;
  text-align: center;
  background-color: #f1f1f1;
}

/* Responsive columns - one column layout (vertical) on small screens */
@media screen and (max-width: 600px) {
  .column {
    width: 100%;
    display: block;
    margin-bottom: 20px;
  }
}
</style>
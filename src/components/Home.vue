<template>
  <div>
    <div style="margin-top: 25px">
      <input type="text" v-model="name" placeholder="Name" />
      <input type="text" v-model="summary" placeholder="Summary" />
      <button @click="addproject()">Submit</button>
    </div>
    <div style="display: flex; justify-content: space-between; margin: 10px">
      <h2>Project Tracker</h2>
      <h2><button>Add+</button></h2>
    </div>
    <div>
      <div>
        <input v-model="search" type="search" placeholder="Search anything.." />
      </div>
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
    <div style="display: flex">
      <div class="column" v-for="(data, index) in project" :key="index">
        <div class="card">
          <h2>{{ data.name }}</h2>
          <p>{{ data.summary }}</p>

          <div style="display: flex; justify-content: space-between">
            <button @click="editToggler(true, data)">edit</button>
            <button @click="deletetodo(data._id)">delete</button>
            <button @click="goToTask(data._id)">view</button>
          </div>
        </div>
      </div>
      <div v-if="!loading && project.length == 0">
        <p>No Project Found</p>
      </div>
      <div v-if="loading">
        <p>LOADINGGGGGGGGGGGG</p>
      </div>
    </div>
    <div class="card" v-if="open">
      <input type="text" v-model="ename" />
      <input type="text" v-model="esummary" />
      <button @click="edit()">save</button>
    </div>
    <div>
      <ul style="display:flex">
        <li style="margin:15px" v-for="(pageNumber, index) in totalPages" :key="index">
          <a href="#" @click="setOffset(pageNumber)">{{ pageNumber }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      summary: "",
      open: false,
      editid: "",
      ename: "",
      esummary: "",
      offset: 0
    };
  },
  computed: {
    project() {
      return this.$store.state.projects.response || []
    },
    totalProject() {
      return this.$store.state.projects.total || []
    },
    loading() {
      return this.$store.state.makingAPIcalls;
    },
    totalPages: function() {
      return Math.ceil(this.totalProject  / this.limit);
    }
  },
  created() {
    this.fetchData();
  },
  watch: {
    search() {
    this.fetchData();
  },
  limit() {
    this.fetchData();
  },
  payload() {
    this.fetchData();
  },
  sort() {
    this.fetchData();
  },
  offset() {
    this.fetchData();
  },
  },
  methods: {
    setOffset(number) {
      if (this.limit < this.totalProject){
        
      this.offset = number * this.limit
      }
    },
    fetchData() {
      this.$store.dispatch("get_project", {
        sort: this.sort,
        limit: this.limit,
        offset: this.offset,
        search: this.search,
      });
    },
    addproject() {
      this.$store.dispatch("add_project", {
        name: this.name,
        summary: this.summary,
        query: {
          sort: this.sort,
        limit: this.limit,
        offset: 0,
        search: this.search,
        }
      });
    },
    deletetodo(id) {
      if(confirm('Are you sure?')){
        this.$store.dispatch("delete_project", { id: id, 
        query: {
            sort: this.sort,
            limit: this.limit,
            offset: 0,
            search: this.search,
          } });
        }
    },
    edit() {
      this.$store.dispatch("edit_project", {
        id: this.editid,
        name: this.ename,
        summary: this.esummary,
        query: {
          sort: this.sort,
          limit: this.limit,
          offset: 0,
          search: this.search,
        }
      });
    },
    editToggler(state, data) {
      this.editid = data._id;
      this.ename = data.name;
      this.esummary = data.summary;
      this.open = state;
    },
    goToTask(id) {
      this.$router.push("/task/" + id);
    },
  },
};
</script>

<style scoped>
/* Float four columns side by side */
.column {
  width: 25%;
  padding: 0 10px;
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
<template>
  <div class="col-11 m-auto height" >
    <div  class="justify-content-between d-flex">
      <h2>Pattem Foundation</h2>
      <h2><button class="add-btn hand" @click="openModal(true)">Add+</button></h2>
    </div>

    <div class="col-2 hand card" style="margin:auto" v-if="openadd">
      <div style="display:flex;justify-content:space-between">
        <p>Add Project:</p>
        <p @click="openModal(false)" ><i class="fa fa-times" aria-hidden="true"></i></p>
      </div>
      <div class="mb-3">
        <input type="text" v-model="name" placeholder="Project Name" />
      </div>
      <div class="mb-3">
        <input type="text" v-model="summary" placeholder="Summary" />
      </div>
      <button @click="addproject()">Submit</button>
    </div>

    <div class="col-2 hand card" style="margin:auto" v-if="open">
      <div style="display:flex;justify-content:space-between">
        <p>Edit Project:</p>
        <p @click="closee(false)" ><i class="fa fa-times" aria-hidden="true"></i></p>
      </div>
      <div class="mb-3">
        <input type="text" v-model="ename" placeholder="Project Name" />
      </div>
      <div class="mb-3">
        <input type="text" v-model="esummary" placeholder="Summary" />
      </div>
      <button @click="edit()">Submit</button>
    </div>
    <div class="">
      <div v-if="!loading && project.length == 0">
        <p>No Project Found</p>
      </div>
      <div v-if="loading">
        <div class="loader col-2 m-auto">

        </div>
      </div>
    </div>
    <!-- <div class="card" v-if="open">
      <input type="text" v-model="ename" />
      <input type="text" v-model="esummary" />
      <button @click="edit()">save</button>
    </div> -->

    <h3 >Project Boards</h3>
    <div class="col-8  m-auto" style="display:flex;  justify-content:space-between; margin-bottom:20px">
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

      <div class="grid-container"  >
        <div class=" col-10" style="box-shadow: 0 2px 6px 0 rgb(0 0 0 / 21%); background:white;;" v-for="(data, index) in project" :key="index">
          <p ><span>Project: </span>{{ data.name }}</p>
          <p style="font-size:12px">{{ data.summary }}</p>
          <div >
            <button class="edit-btn hand" style="margin-right:15px" @click="editToggler(true, data)">edit</button>
            <button class="del-btn hand" style="margin-right:15px" @click="deletetodo(data._id)">delete</button>
            <button class="view-btn hand" @click="goToTask(data._id)">view</button>
          </div>
        </div>
      </div>

    <div>
      <ul class="col-1 m-auto d-flex">
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
      openadd:false,
      options: [
        {
          name: "Task Name Ascending",
          value: {
            name: 1,
          },
        },
        {
          name: "Task Name Descending",
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
    closee(state){
      this.open = state
    },
    openModal(state) {
      this.openadd = state;
    },
    goToTask(id) {
      this.$router.push("/task/" + id);
    },
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
  .add-btn{
    background-color: rgba(96,125,139,.8)!important;
    border-color: rgba(96,125,139,.8)!important;
    color: #fff!important;
    text-decoration: none!important;
    padding:10px 20px 10px 20px;
    letter-spacing: 2px;
    font-size:15px;
    border-radius: 5px;
  }
  .view-btn{
    background-color: rgba(96,125,139,.8)!important;
    border-color: rgba(96,125,139,.8)!important;
    color: #fff!important;
    text-decoration: none!important;
    border:none;
    border-radius: 2px
  }
  .del-btn{
   background-color: #dc3545;
    border-color: #dc3545;
    color: #fff!important;
    text-decoration: none!important;
    border:none;
    border-radius: 2px
  }
  .edit-btn{
    /* background-color: transparent; */
 color: #fff!important;
  background-color: rgba(96,125,139,.8)!important;
    border-color: rgba(96,125,139,.8)!important;
    text-decoration: none!important;
    border:none;
    border-radius: 2px
  }
 .hand{
   cursor: pointer;
 }
 .d-flex{
   display: flex;
 }
 .height{
  height:1000px
}
.grid-container > div {
  /* background-color: rgba(255, 255, 255, 0.8); */
  border-radius: 5px;
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
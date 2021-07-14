<template>
    <div>
        <h1 style="align-items:center">Task </h1>
        <div style="display:flex; justify-content:space-between;margin:10px">
            <h2> <button>ADD+</button></h2>
            <h2><input type="search" placeholder="Search anything.."></h2>
            <h2>sorting</h2>
        </div>
        <div>
            <input type="text" placeholder="name" v-model="tname">
            <input type="text" placeholder="label" v-model="tlabel">
            <input type="text" placeholder="Assignee" v-model="tassignee">
            <input type="text" placeholder="description" v-model="description ">
            <button>Submit</button>
        </div>
        <div style="display:flex"  >
            <div class="column" v-for="(data,index) in project" :key="index">
                <div class="card">
                    <h2>{{data.tname}}</h2>
                    <p>{{data.tlabel}}</p>
                    <p>{{data.tassignee}}</p>
                    <p>{{data.description}}</p>

                    <div style="display:flex;justify-content:space-between">
                        <button @click="editToggler(true, data)">edit</button>
                        <button @click="deletetodo(data._id)">delete</button>
                        <button @click="goToTask(data._id)">view</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
        data(){
            return{

            }
        },
        computed:{
            task(){
            return this.$store.state.task
        }
        },
        created(){
            this.$store.dispatch('get_task')
        }
}
</script>

<style scoped>

</style>
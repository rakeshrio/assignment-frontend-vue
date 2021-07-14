import Vue from 'vue'
import Vuex from 'vuex'
import {HTTP} from '../services/http'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      makingAPIcalls:true,
      task:[
        {

        }
      ],
      projects:[
        {
            name:'project1',
            summary:'lorem  lknclsdnc  clknsclndslc nclsincdsn csdcn'
        },
        {

            name:'project2',
            summary:'lorem  lknclsdnc  clknsclndslc nclsincdsn csdcn'
        },
        {

            name:'project3',
            summary:'lorem  lknclsdnc  clknsclndslc nclsincdsn csdcn'
        },
        {
            id:4,
            name:'project4',
            summary:'lorem  lknclsdnc  clknsclndslc nclsincdsn csdcn'
        },
    ],

  },
  getters:{

  },
  mutations: {
    GET_TASK(state, value){
      state.task = value
    },
    GET_PROJECT(state, value){
      state.projects = value
    },

    SET_LOADING: (state, value) => {
      state.makingAPIcalls = value
    },
    ADD_PROJECT(state, add){
      state.projects.push({
        name:add.name,
        summary:add.summary,
      })
    },
    DELETE_PROJECT(state, deleteproject){
      var index = state.projects.indexOf(deleteproject)
      state.projects.splice(index,1)
    }
  },
  actions: {
    get_task ({ commit }) {
      commit('SET_LOADING', true)
      HTTP.get('task')
        .then(response => {
          commit('GET_TASK', response.data)
          commit('SET_LOADING', false)
        })
        .catch(e => {
          commit('SET_LOADING', false)
          this.errors.push(e)
        })
    },
    get_project ({ commit }) {
      commit('SET_LOADING', true)
      HTTP.get('project')
        .then(response => {
          commit('GET_PROJECT', response.data)
          commit('SET_LOADING', false)
        })
        .catch(e => {
          commit('SET_LOADING', false)
          this.errors.push(e)
        })
    },

    add_project({commit,dispatch}, add){
      commit('SET_LOADING', true)
      HTTP.post('project', add)
        .then(response => {
          // commit('GET_PROJECT', response.data)
          console.log(response)
          dispatch('get_project')
          commit('SET_LOADING', false)
        })
        .catch(e => {
          commit('SET_LOADING', false)
          this.errors.push(e)
        })
    },

    delete_project({commit, dispatch},payload){
      commit('SET_LOADING', true)
      HTTP.delete( `project/${payload.id}` )
        .then(response => {
          // commit('GET_PROJECT', response.data)
          console.log(response)
          dispatch('get_project')
          commit('SET_LOADING', false)
        })
        .catch(e => {
          commit('SET_LOADING', false)
          this.errors.push(e)
        })
    },
    edit_project({commit, dispatch},payload){
      commit('SET_LOADING', true)
      var id = payload.id
      delete[payload.id]
      HTTP.put( `project/${id}`, payload )
        .then(response => {
          // commit('GET_PROJECT', response.data)
          console.log(response)
          dispatch('get_project')
          commit('SET_LOADING', false)
        })
        .catch(e => {
          commit('SET_LOADING', false)
          this.errors.push(e)
        })
    }



  },
  modules: {
  }
})

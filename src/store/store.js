import Vuex from 'vuex';
import Vue from 'vue';
import * as types from './types';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    token: null,
    title:''
  },
  mutations: {
    [types.LOGIN]: (state,token)=>{
      localStorage.token = token;
      state.token = token;
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('token');
      state.token = null;
    },
    [types.TITLE]: (state, data) => {
      state.title = data;
    }
  }
})

import Vuex from 'vuex';
import Vue from 'vue';
import * as types from './types';
import api from '../fetch/api';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {},
        token: null,
        title:'',
        systemList:[],
        systemListCount: 0
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
        },
        [types.SYSTEM_LIST]: (state,data) => {
            state.systemList = data.rows;
            state.systemListCount = data.total;
        },
    },
    getters: {

    },
    actions: {
        getSystemList({commit},params){
            api.SystemList(params).then(res =>{
                if(res.rows){
                    commit(types.SYSTEM_LIST, res);
                }else{
                    // this.$Message.error(res.message);
                }
            });
        }
    }

});
